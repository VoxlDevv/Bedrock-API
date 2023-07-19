import {
  world,
  Player,
  EntityInventoryComponent,
  ItemStack,
} from "@minecraft/server";
import { EntityClass } from "./Entity.Class";
import { ErrorClass } from "../message/Error.Class";
import * as Validation from "../../utils/Validation.Function";
import * as World from "../world/World.Function";

class PlayerClass extends EntityClass {
  private playerObject: Player;
  private inventory;
  private errors: ErrorClass;

  /**
   * Player class
   * @param playerObject - Player object
   */
  constructor(playerObject: Player) {
    super(playerObject);
    this.playerObject = playerObject;
    this.inventory = this.playerObject.getComponent(
      "inventory"
    ) as EntityInventoryComponent;
    this.errors = new ErrorClass();

    if (!playerObject)
      this.errors.CustomError(
        "PlayerClass",
        "constructor",
        "PlayerObject cannot be empty"
      );
  }

  /**
   * Get player scoreboard score
   * @param objective - Scoreboard objective name
   * @example
   * getScore("money");
   */
  getScore(objective: string): number {
    try {
      const sb = world.scoreboard.getObjective(objective);
      if (!sb) world.scoreboard.addObjective(objective, objective);
      return sb.getScore(this.playerObject.scoreboardIdentity);
    } catch {
      return 0;
    }
  }

  /**
   * Set player scoreboard value
   * @param {String} objective - Scoreboard objective name
   * @param {Number} value - Value
   * @param {Boolean} isAdd - If true, it will add score not set score
   */
  setScore(
    objective: string,
    value: number,
    isAdd: boolean = false
  ): unknown | undefined {
    try {
      const sb = world.scoreboard.getObjective(objective);
      if (!sb) world.scoreboard.addObjective(objective, objective);
      return isAdd
        ? this.setScore(objective, this.getScore(objective) + value)
        : sb.setScore(this.playerObject.scoreboardIdentity, value);
    } catch {
      return undefined;
    }
  }

  /**
   * Get player xp level
   * @example getXpLevel();
   */
  getXpLevel(): number {
    return this.playerObject.level ?? 0;
  }

  /**
   * Check player if online
   * @param target - Player name
   * @example isOnline("JustSky001");
   */
  isOnline(target: string): boolean {
    return (
      World.getOnlinePlayers().find(
        (player: Player) => player.name === target
      ) !== undefined
    );
  }

  /**
   * Get player inventory empty slots
   */
  getEmptySlots() {
    return this.inventory.container.emptySlotsCount;
  }

  /**
   * Get player item in right hands slot
   */
  getRightItem(): ItemStack | undefined {
    return this.inventory.container.getItem(this.playerObject.selectedSlot);
  }

  /**
   * Get all items in inventory
   */
  getItems(): { [key: number]: ItemStack } {
    let inventory = {};
    for (let i = 0; i < this.inventory.container.size; i++) {
      Object.assign(inventory, {
        [i]: this.inventory.container.getItem(i),
      });
    }
    return inventory;
  }

  /**
   * Set item lore (player selected slot)
   * @param lore - Lore list
   */
  setItemLore(lore: string[]): undefined {
    if (!Validation.isArray(lore)) return;
    this.getRightItem()?.setLore(lore);
    this.inventory.container.setItem(
      this.playerObject.selectedSlot,
      this.getRightItem()
    );
  }

  /**
   * Get player object from name
   * @param target - Player name
   */
  getPlayerObjectFromName(target: string): Player | undefined {
    return World.getOnlinePlayers().find((player) => player.name === target);
  }

  /**
   * Get needed xp to next level
   */
  needXpToLevelUp(): number {
    return this.playerObject.totalXpNeededForNextLevel;
  }

  /**
   * Get earned xp at current level
   */
  xpEarned(): number {
    return this.playerObject.xpEarnedAtCurrentLevel;
  }

  /**
   * Get inventory component
   */
  getInventoryComponent(): EntityInventoryComponent {
    return this.inventory;
  }

  /**
   * Get raw component
   */
  getRawPlayerComponent(): Player {
    return this.playerObject;
  }

  Query(query: QueryName): boolean {
    return this.playerObject[query];
  }
}

export { PlayerClass };
