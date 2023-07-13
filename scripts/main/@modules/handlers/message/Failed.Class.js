import { Player } from "@minecraft/server";

class FailedClass {
  /**
   * Invalid command message
   * @param {Player} player - Player object
   * @param {String} commandName - Command name
   */
  InvalidCommand(player, commandName) {
    return player.sendMessage({
      rawtext: [
        {
          text: "§c",
        },
        {
          translate: "commands.generic.unknown",
          with: [`${commandName}`],
        },
      ],
    });
  }
}

export { FailedClass };
