import { ChatSendAfterEvent, ChatSendBeforeEvent, Player, world } from "@minecraft/server";
import { Collection } from "../data/Collection.Class";
import { FailedClass } from "../message/Failed.Class";
import { Database } from "../../storages/Database.Class";
import { ErrorClass } from "../message/Error.Class";
import * as Validation from "../../utils/Validation.Function";
import { Config } from "../../../config";

class CommandClass {
  /**
   * Custom Command
   */
  constructor() {
    /**@private */
    this.registration = new Collection();
    /**@private */
    this.failed = new FailedClass();
    /**@private */
    this.error = new ErrorClass();
    /**@private */
    this.db = new Database("GlobalDB");
    /**@private */
    this.commandPrefix = this.db.get("commandPrefix") ?? Config.defaultPrefix;

    /**@private */
    world.beforeEvents.chatSend.subscribe(this.execute.bind(this));
  }

  /**
   * @typedef {Object} CommandCallbackArgs
   * @property {Player} sender - Sender command
   * @property {Object} inputs - Get command inputs
   * @property {(inputNumber: Number) => String|Boolean|Number|undefined} inputs.getInput - Get command input
   * @property {Config} config - Get config from config.js
   * @property {Database} DB - GlobalDB
   * @property {ChatSendAfterEvent} raw - Get raw packets
   * @property {Object} allCommandRegistration - Get all command registration
   * Build custom command
   * @param {CommandRegistration} registration - Registration information
   * @param {(args: CommandCallbackArgs) => void} callback - Callback function
   */
  BuildCommand(registration, callback) {
    const information = registration.extractJSON();
    this.registration.set(information.name, {
      ...information,
      callback,
    });
  }

  /**
   * Get command
   * @private
   */
  getCommand(commandName) {
    return (
      this.registration.get(commandName) ||
      this.registration.find((als) => als?.aliases.includes(commandName))
    );
  }

  /**
   * Get all command registration
   * @returns {Array<any>}
   */
  getAllCommands() {
    return this.registration;
  }

  /**
   * Get command prefix
   * @returns {String}
   */
  getPrefix() {
    return this.commandPrefix;
  }

  /**
   * Set command prefix
   * @param {String} prefix
   */
  setPrefix(prefix) {
    if (!prefix)
      this.error.CustomError(
        "CommandClass",
        "setPrefix",
        "prefix cannot be empty"
      );

    if (!Validation.isString(prefix))
      this.error.CustomError(
        "CommandClass",
        "setPrefix",
        "prefix must be string"
      );

    this.db.set("currentPrefix", prefix);
  }

  /**
   * Get input
   * @private
   */
  getCommandInput(args, commandInput, inputNumber) {
    if (!commandInput) return undefined;

    const inputTypes = ["string", "boolean", "number", "playername"];
    const getTypes = commandInput[inputNumber];
    const inputValue = args[inputNumber];

    if (!getTypes || inputValue === undefined) return undefined;

    for (const type of getTypes) {
      if (type === "playername" && inputValue.startsWith("@"))
        return inputValue.substring(1);

      if (inputTypes.includes(type)) {
        if (type === "boolean") {
          if (inputValue === "true") return true;
          if (inputValue === "false") return false;
        }

        if (type === "number") {
          const parsedValue = Number(inputValue);
          if (!isNaN(parsedValue)) return parsedValue;
        }

        if (typeof inputValue === type) return inputValue;
      }
    }

    return undefined;
  }

  /**
   * Execute
   * @private
   * @param {ChatSendBeforeEvent} packet 
   */
  execute(packet) {
    const { message, sender } = packet;
    if (!message.startsWith(this.commandPrefix)) return;

    packet.cancel = true;
    const args = message
      .slice(this.commandPrefix.length)
      .trim()
      .match(/"[^"]+"|\S+/g)
      .map((e) => e.replace(/"/g, ""));
    const commandArgs = args.shift().toLowerCase();
    const commandName = this.getCommand(commandArgs);

    if (
      !commandName ||
      (!!commandName?.private && !sender.isOp()) ||
      (commandName?.requireTags.length > 0 &&
        !commandName?.requireTags.every((i) => sender.getTags().includes(i)))
    )
      return this.failed.InvalidCommand(sender, commandArgs);
    else
      commandName?.callback({
        DB: {
          used: this.db,
        },
        inputs: {
          getInput: (inputNumber) =>
            this.getCommandInput(args, commandName.inputs, inputNumber),
        },
        raw: packet,
        sender,
        config: Config,
      });
  }
}

const Command = new CommandClass();
export { Command };
