import { Player, world } from "@minecraft/server";
import { ErrorClass } from "./Error.Class";

class ChatClass {
  /**
   * Broadcast message in chat
   * @param {Object} rawtext - The text must be Object
   * @param {Player|Player.name} player - Player name (Optional)
   * @returns {any}
   * @example broadcast({ text: "Hello world!" });
   */
  broadcast(rawtext, player) {
    const JSONstring = JSON.stringify(rawtext);
    return this.runCommand(
      `tellraw ${player ? `"${player}"` : "@a"} {"rawtext":[${JSONstring}]}`
    );
  }

  /**
   * Runs a command
   * @param {String} command - Basic command but without "/"
   * @param {String} dimension - "overworld" | "nether" | "the end"
   * @param {Boolean} debugMode - If true, it will logs the command results, but if false, it will run the command
   * @returns {any}
   * @example runCommand("say Hello world!");
   */
  runCommand(command, dimension = "overworld", debugMode = false) {
    if (command.startsWith("/"))
      new ErrorClass().CustomError(
        "ChatClass",
        "runCommand",
        'command cannot starts with "/" at <anonymous>'
      );

    return debugMode
      ? console.warn(JSON.stringify(this.runCommand(command)))
      : world.getDimension(dimension).runCommand(command);
  }

  /**
   * Runs multiple command at once
   * @param {Array<String>} commands - Basic command but without "/"
   * @example runCommands([ "say Hello", "say World!" ]);
   */
  runCommands(commands) {
    if (commands.some((slash) => slash.startsWith("/")))
      new ErrorClass().CustomError(
        "ChatClass",
        "runCommands",
        'commands cannot starts with "/" at <anonymous>'
      );

    commands.forEach((cmd) => {
      this.runCommand(cmd);
    });
  }
}

export { ChatClass };
