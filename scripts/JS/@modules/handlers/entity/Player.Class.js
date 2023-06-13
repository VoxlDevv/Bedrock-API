import {
  world,
  Player,
  Container,
  ItemStack,
  Enchantment,
  EnchantmentType,
} from "@minecraft/server";
import { EntityClass } from "./Entity.Class.js";
import { ErrorClass } from "../message/Error.Class.js";
import * as World from "../world/World.Function.js";

class PlayerClass extends EntityClass {
  /**
   * Player class
   * @param {Player} playerObject - Player object
   */
  constructor(playerObject) {
    super(playerObject);
    /**@private */
    this.playerObject = playerObject;
    /**
     * @private
     * @type {Container}
     */
    this.container = this.playerObject.getComponent("inventory").container;
    /**@private */
    this.error = new ErrorClass();

    if (!playerObject)
      this.error.CustomError(
        "PlayerClass",
        "constructor",
        "PlayerObject cannot be empty"
      );
  }

  /**
   * Get player scoreboard score
   * @param {String} objective - Scoreboard objective name
   * @returns {Number}
   * @example
   * getScore("money");
   */
  getScore(objective) {
    return (
      (
        world.scoreboard.getObjective(objective) ??
        world.scoreboard.addObjective(objective, objective)
      ).getScore(this.playerObject.scoreboardIdentity) ?? 0
    );
  }

  /**
   * Get player xp level
   * @returns {Number}
   * @example getXpLevel();
   */
  getXpLevel() {
    return this.playerObject.level ?? 0;
  }

  /**
   * Check player if online
   * @param {Player.nameTag} target - Player nametag
   * @returns {Boolean}
   * @example isOnline("JustSky001");
   */
  isOnline(target) {
    return (
      World.getOnlinePlayers().find((player) => player.nameTag === target) !==
      undefined
    );
  }

  /**
   * Get player inventory empty slots
   * @returns {Number}
   */
  getEmptySlots() {
    return this.container.emptySlotsCount;
  }

  /**
   * Get player item in right hands slot
   * @returns {ItemStack|undefined}
   */
  getRightItem() {
    return this.container.getItem(this.playerObject.selectedSlot) ?? undefined;
  }

  /**
   * Get all items in inventory
   * @returns {Object<ItemStack>}
   */
  getItems() {
    let inventory = {};
    for (let i = 0; i < this.container.size; i++) {
      Object.assign(inventory, {
        [i]: this.container.getItem(i),
      });
    }
    return inventory;
  }

  /**
   * Add enchantment to right hands item
   * @param {ItemStack} item - Item stack
   * @param {String|EnchantmentType} enchant - Enchant name
   * @param {Number|undefined} level - Enchant level
   */
  addRightEnchant(item, enchant, level = 1) {
    const enchant = new Enchantment(enchant, level);
    this.container.setItem(
      this.playerObject.selectedSlot,
      item.getComponent("enchantment").addEnchantment(enchant)
    );
  }
}

export { PlayerClass };
