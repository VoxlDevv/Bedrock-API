import { world } from "@minecraft/server";
import { Collection } from "../data/Collection.Class.js";
import { FailedClass } from "../message/Failed.Class.js";
import { Database } from "../../storages/Database.Class.js";
import { ErrorClass } from "../message/Error.Class.js";
import * as Validation from "../../utils/Validation.Function.js";
import { Config } from "../../../config.js";

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
   * Build custom command
   * @param {CommandRegistration} registration - Registration information
   * @param {Function} callback - Callback
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
   * Execute
   * @private
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
    const commandInput = commandName.inputs;

    if (
      !commandName ||
      (!!commandName?.private && !sender.isOp()) ||
      (commandName?.requireTags.length > 0 &&
        !commandName?.requireTags.every((i) => sender.getTags().includes(i)))
    ) {
      this.failed.InvalidCommand(sender, commandArgs);
    } else
      commandName?.callback({
        DB: {
          used: this.db,
        },
        inputs: {
          getInput: (inputNumber) => {
            const inputTypes = ["string", "boolean", "number", "player"];
            const getTypes = commandInput[inputNumber];
            const inputValue = args[inputNumber];

            for (let i = 0; i < getTypes.length; i++) {
              const type = getTypes[i];
              if (type === "player" && inputValue && inputValue.startsWith("@"))
                return inputValue.substring(1);
              if (inputTypes.includes(type) && typeof inputValue === type)
                return inputValue;
              return false;
            }
          },
        },
        raw: packet,
        sender,
        config: Config,
        allCommandRegistration: this.getAllCommands(),
      });
  }
}

const Command = new CommandClass();
export { Command };
