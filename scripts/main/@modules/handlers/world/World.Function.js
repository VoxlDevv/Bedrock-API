import { world } from "@minecraft/server";
/**
 * Get all online players
 */
function getOnlinePlayers() {
    return world.getAllPlayers();
}
export { getOnlinePlayers };
