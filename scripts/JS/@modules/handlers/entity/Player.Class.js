import { world, Player } from "@minecraft/server";
import { ChatClass } from "../message/Chat.Class.js";

class PlayerClass {
  /**
   * Get player scoreboard score
   * @param {String|Player} player - Player target (player name or object)
   * @param {String} objective - Scoreboard objective name
   * @returns {Number}
   * @example
   * getScore(playerObj, "money");
   * getScore("JustSky001", "money");
   */
  getScore(player, objective) {
    return (
      world.scoreboard.getObjective(objective) ??
      world.scoreboard.addObjective(objective, objective)
    ).getScore(
      typeof player === `string`
        ? world.scoreboard
            .getParticipants()
            .find((sb) => sb.displayName == player)
        : player.scoreboardIdentity
    );
  }

  /**
   * Get player xp level
   * @param {Player} player - Player object
   * @returns {Number}
   * @example getXpLevel(playerObj);
   */
  getXpLevel(player) {
    return player.level;
  }

  /**
   * Get player specific tag
   * @param {Player} player - Player object
   * @returns {Boolean|String}
   * @example getSpecificTag(playerObj, "tag:");
   */
  getSpecificTag(player, startswith) {
    const check = this.getTags(player)?.find((tag) =>
      tag.startsWith(startswith)
    );
    return check ? check : false;
  }

  /**
   * Get player all tag
   * @param {Player} player - Player object
   * @returns {Array<String>}
   * @example getTags(playerObj);
   */
  getTags(player) {
    return player.getTags();
  }

  /**
   * Check player if had tag
   * @param {Player} player - Player object
   * @param {String} tag - Tag
   * @returns {Boolean}
   * @example hasTag(playerObj, "tag");
   */
  hasTag(player, tag) {
    return player.hasTag(tag);
  }

  /**
   * Check player if online
   * @param {Player} player - Player object
   * @returns {Boolean}
   * @example isOnline(playerObj);
   */
  isOnline(player) {
    return this.getAllPlayers().find((name) => name === player) !== undefined;
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
