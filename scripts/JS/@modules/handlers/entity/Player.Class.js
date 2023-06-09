import { world, Player } from "@minecraft/server";

class PlayerClass {
  /**
   * Player class
   * @param {Player} playerObject - Player object
   */
  constructor(playerObject) {
    this.playerObject = playerObject;
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
      world.scoreboard.getObjective(objective) ??
      world.scoreboard.addObjective(objective, objective)
    ).getScore(this.playerObject.scoreboardIdentity);
  }

  /**
   * Get player xp level
   * @returns {Number}
   * @example getXpLevel();
   */
  getXpLevel() {
    return this.playerObject.level;
  }

  /**
   * Get player specific tag
   * @returns {Boolean|String}
   * @example getSpecificTag("tag:");
   */
  getSpecificTag(startswith) {
    const check = this.getTags()?.find((tag) => tag.startsWith(startswith));
    return check ? check : false;
  }

  /**
   * Get player all tag
   * @returns {Array<String>}
   * @example getTags();
   */
  getTags() {
    return this.playerObject.getTags();
  }

  /**
   * Check player if had tag
   * @param {String} tag - Tag
   * @returns {Boolean}
   * @example hasTag("tag");
   */
  hasTag(tag) {
    return this.playerObject.hasTag(tag);
  }

  /**
   * Check player if online
   * @returns {Boolean}
   * @example isOnline(targetObj);
   */
  isOnline(target) {
    return (
      this.getAllPlayers().find((name) => name === target.nameTag) !== undefined
    );
  }

  /**
   * Get all player in the world
   * @param {Boolean} asNumber - Types
   * @returns {Array<String>|Number}
   * @example getAllPlayers(true);
   */
  getAllPlayers(asNumber = false) {
    return asNumber ? world.getAllPlayers().length : world.getAllPlayers();
  }
}

export { PlayerClass };
