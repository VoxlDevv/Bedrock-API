import { world } from "@minecraft/server";
import { Database } from "../../storages/Database.Class.js";
import { Collection } from "../data/Collection.Class.js";
import { Config } from "../../../config.js";
import { FailedClass } from "../message/Failed.Class.js";
import { CommandRegistration } from "./CommandRegistration.Class.js";

const DB = new Database("GlobalDB");
const Prefix = DB.get("commandPrefix") ?? Config.defaultPrefix;

class CommandClass {
  /**
   * Custom Command
   */
  constructor() {
    this.registration = new Collection();
    this.failed = new FailedClass();
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
  getCommand(command) {
    return (
      this.registration.get(command) ||
      this.registration.find((als) => als?.aliases?.includes(command))
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
   * Execute
   * @private
   */
  execute(packet) {
    const { message, sender } = packet;
    if (!message.startsWith(Prefix)) return;

    packet.cancel = true;
    const args = message
      .slice(Prefix.length)
      .trim()
      .match(/"[^"]+"|\S+/g)
      .map((e) => e.replace(/"/g, ""));
    const commandName = args.shift().toLowerCase();
    const commandGet = this.getCommand(commandName);

    if (!commandGet || (commandGet.private && !sender.isOp())) {
      this.failed.InvalidCommand(sender, commandName);
    }
    if (
      commandGet.requireTags.length > 0 &&
      !commandGet.requireTags.every((i) => sender.getTags().includes(i))
    ) {
      this.failed.InvalidCommand(sender, commandName);
    }

    commandGet.callback({
      DB: { used: DB, primitive: Database },
      raw: packet,
      sender,
      args,
      config: Config,
    });
  }
}

const Command = new CommandClass();
export { Command, Prefix };
