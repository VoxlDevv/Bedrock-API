import { world } from "@minecraft/server";

/**
 * Get all online players
 * @param {Boolean} asNumber - If true, it will return number
 * @returns {Array<String>|Number}
 */
function getOnlinePlayers(asNumber = false) {
  return asNumber ? world.getAllPlayers().length : world.getAllPlayers();
}

export { getOnlinePlayers };
