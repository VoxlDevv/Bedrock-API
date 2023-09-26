import { world } from "@minecraft/server";
import { ErrorClass } from "./Error.Class";
class ChatClass {
    /**
     * Broadcast message in chat
     * @param rawtext - The text must be Object
     * @param player - Player name (Optional)
     * @example broadcast({ text: "Hello world!" });
     */
    broadcast(rawtext, player) {
        return this.runCommand(`tellraw ${player ? `"${player}"` : "@a"} {"rawtext":[${JSON.stringify(rawtext)}]}`);
    }
    /**
     * Runs a command
     * @param command - Basic command but without "/"
     * @param dimension - "overworld" | "nether" | "the end"
     * @param debugMode - If true, it will logs the command results, but if false, it will run the command
     * @example runCommand("say Hello world!");
     */
    runCommand(command, dimension = "overworld", debugMode = false) {
        if (command.startsWith("/"))
            new ErrorClass().CustomError("ChatClass", "runCommand", 'command cannot starts with "/" at <anonymous>');
        return debugMode
            ? console.warn(JSON.stringify(this.runCommand(command)))
            : world.getDimension(dimension).runCommand(command);
    }
    /**
     * Runs multiple command at once
     * @param commands - Basic command but without "/"
     * @example runCommands([ "say Hello", "say World!" ]);
     */
    runCommands(commands) {
        if (commands.some((slash) => slash.startsWith("/")))
            new ErrorClass().CustomError("ChatClass", "runCommands", 'commands cannot starts with "/" at <anonymous>');
        commands.forEach((cmd) => {
            this.runCommand(cmd);
        });
    }
}
export { ChatClass };
