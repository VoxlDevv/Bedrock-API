import { system, world } from "@minecraft/server";
import { Collection } from "../handlers/data/Collection.Class";
import { ChatClass } from "../handlers/message/Chat.Class";
import { ErrorClass } from "../handlers/message/Error.Class";
import * as Formatter from "../utils/Formatter.Function";
import { Validation } from "../export.modules";

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
    /**@private */
    this.error = new ErrorClass();

    if (!name)
      this.error.CustomError(
        "Database",
        "constructor",
        "Database name cannot be empty"
      );

    if (this.DB_SAVED_NAMES.includes(name))
      this.error.CustomError(
        "Database",
        "constructor",
        `Database with name ${name} already exist`
      );

    if (name.length > 13 || name.length === 0)
      this.error.CustomError(
        "Database",
        "constructor",
        "Database names can't be more than 13 characters or empty"
      );

    this.DB_SAVED_NAMES.push(name);

    try {
      world.scoreboard.addObjective(`DB_${this.DB_NAME}`, `DB_${this.DB_NAME}`);
    } catch {
      world.scoreboard
        .getObjective(`DB_${this.DB_NAME}`)
        ?.getParticipants()
        .forEach((results) => {
          const cleanData = results.displayName.slice(1, -1);
          const parsedData = cleanData.split(",");
          const decryptKey = Formatter.DecryptText(parsedData[0]);
          const decryptValue = Formatter.DecryptText(parsedData[1]);
          this.RESTORED_DATA.set(decryptKey, JSON.parse(decryptValue));
        });
    }
  }

  /**@private */
  _dataMerge(...arrays) {
    const destination = {};
    arrays.forEach((source) => {
      let prop;
      for (prop in source) {
        if (prop in destination && destination[prop] === null)
          destination[prop] = source[prop];
        else if (prop in destination && Validation.isArray(destination[prop]))
          destination[prop] = destination[prop].concat(source[prop]);
        else if (prop in destination && typeof destination[prop] === "object")
          destination[prop] = merge(destination[prop], source[prop]);
        else destination[prop] = source[prop];
      }
    });
    return destination;
  }

  /**
   * Push data to database
   * @param {String} key - Key
   * @param {Any} value - Value or data
   */
  push(key, value) {
    if (!this.hasKey(key)) return undefined;
    const newData = this._dataMerge(this.get(key), value);
    this.set(key, newData);
  }

  /**
   * Set data to database
   * @param {String} key - Key
   * @param {Any} value - Value or data
   */
  set(key, value) {
    if (value.length >= 32000)
      this.error.CustomError(
        "Database",
        "set",
        "value length is too much, limit character is 32000 or 32k"
      );

    const encryptKey = Formatter.EncryptText(key);
    const encryptValue = Formatter.EncryptText(JSON.stringify(value));

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
    if (!this.hasKey(key)) return undefined;
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
   * Find specific values inside Database
   * @param {Function} fn
   * @returns {any}
   */
  find(fn) {
    return this.RESTORED_DATA.find(fn);
  }

  /**
   * Reset database
   */
  reset() {
    world.scoreboard.removeObjective(`DB_${this.DB_NAME}`);
    world.scoreboard.addObjective(`DB_${this.DB_NAME}`, `DB_${this.DB_NAME}`);

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
