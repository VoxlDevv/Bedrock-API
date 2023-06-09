import { system, world } from "@minecraft/server";
import {
  Collection,
  Validation,
  Formatter,
  ChatClass,
} from "../export.modules.js";

class Database {
  /**
   * Database class
   * @param {String} name - Database name
   */
  constructor(name) {
    /**@private */
    this.DB_NAME = name;
    /**@private */
    this.DB_SAVED_NAMES = [];
    /**@private */
    this.RESTORED_DATA = new Collection();

    if (!name) throw new Error("Database name cannot be empty");

    if (this.DB_SAVED_NAMES.includes(name))
      throw new Error(`Database with name ${name} already exist`);

    if (name.length > 13 || name.length === 0)
      throw new Error(
        "Database names can't be more than 13 characters or empty"
      );

    this.DB_SAVED_NAMES.push(name);

    try {
      world.scoreboard.addObjective(`DB_${this.DB_NAME}`, `DB_${this.DB_NAME}`);
    } catch {
      world.scoreboard
        .getObjective(`DB_${this.DB_NAME}`)
        .getParticipants()
        .forEach((results) => {
          const parsedData = JSON.parse(results.displayName);
          const decryptKey = Formatter.DecryptText(parsedData[0]);
          const decryptValue = Formatter.DecryptText(parsedData[1]);
          this.RESTORED_DATA.set(decryptKey, decryptValue);
        });
    }
  }

  /**
   * Set data to database
   * @param {String} key - Key
   * @param {String} value - Value or data
   */
  set(key, value) {
    if (!Validation.isString(value))
      throw new Error("Database::set value must be string");

    const encryptKey = Formatter.EncryptText(key);
    const encryptValue = Formatter.EncryptText(value);

    system.run(() => {
      new ChatClass().runCommand(
        `scoreboard players set "[${encryptKey},${encryptValue}]" "DB_${this.DB_NAME}" 0`
      );
    });

    this.RESTORED_DATA.set(key, value);
  }

  /**
   * Get data from database
   * @param {String} key
   * @returns {Object}
   */
  get(key) {
    return this.RESTORED_DATA.get(key);
  }

  /**
   * Delete database key
   * @param {String} key
   * @returns {any}
   */
  delete(key) {
    if (!this.hasKey(key)) return;

    const encryptKey = Formatter.EncryptText(key);
    const encryptValue = Formatter.EncryptText(
      this.RESTORED_DATA.get(encryptKey)
    );

    system.run(() => {
      new ChatClass().runCommand(
        `scoreboard players reset "[${encryptKey},${encryptValue}]" "DB_${this.DB_NAME}"`
      );
    });

    this.RESTORED_DATA.delete(key);
  }

  /**
   * Reset database
   */
  reset() {
    system.run(() => {
      world.scoreboard.removeObjective(`DB_${this.DB_NAME}`);
      world.scoreboard.addObjective(`DB_${this.DB_NAME}`, `DB_${this.DB_NAME}`);
    });

    this.RESTORED_DATA.clear();
  }

  /**
   * Get all values
   * @returns {Object}
   */
  getValues() {
    return this.RESTORED_DATA.values();
  }

  /**
   * Get all keys
   * @returns {Object}
   */
  getKeys() {
    return this.RESTORED_DATA.keys();
  }

  /**
   * Has key
   * @param {String} key
   * @returns {Boolean}
   */
  hasKey(key) {
    return this.RESTORED_DATA.has(key);
  }

  /**
   * Entries
   */
  entries() {
    return this.RESTORED_DATA.entries();
  }
  /**
   * Iterator
   */
  *[Symbol.iterator]() {
    yield* this.RESTORED_DATA.entries();
  }
}

export { Database };
