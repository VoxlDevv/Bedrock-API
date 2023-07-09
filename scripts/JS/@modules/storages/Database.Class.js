import { world, ScoreboardIdentityType } from "@minecraft/server";
import { Collection } from "../handlers/data/Collection.Class";
import { ChatClass } from "../handlers/message/Chat.Class";
import { ErrorClass } from "../handlers/message/Error.Class";
import * as Formatter from "../utils/Formatter.Function";
import * as Validation from "../utils/Validation.Function";
import * as Timer from "../utils/Timer.Function";

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
    /**@private */
    this.objective =
      world.scoreboard.getObjective(name) ??
      world.scoreboard.addObjective(name, name);

    if (name.length > 15 || !name)
      this.error.CustomError(
        "Database",
        "constructor",
        "Database names can't be more than 15 characters nor empty"
      );
    if (this.DB_SAVED_NAMES.includes(name))
      this.error.CustomError(
        "Database",
        "constructor",
        `Database with name ${name} already exist`
      );

    this.DB_SAVED_NAMES.push(name);

    Timer.setInfinityLoop(() => {
      for (const participant of this.objective.getParticipants()) {
        if (participant.type !== ScoreboardIdentityType.fakePlayer) continue;
        const [cleanData, parsedData] = participant.displayName
          .slice(1, -1)
          .split(",")
          .map(Formatter.DecryptText);
        this.RESTORED_DATA.set(JSON.parse(cleanData), JSON.parse(parsedData));
      }
    });
  }

  /**@private */
  _dataMerge(...arrays) {
    const destination = {};
    arrays.forEach((source) => {
      for (let prop in source) {
        if (destination[prop] === null || Validation.isArray(destination[prop]))
          destination[prop] =
            destination[prop]?.concat(source[prop]) || source[prop];
        else if (typeof destination[prop] === "object")
          destination[prop] = this._dataMerge(destination[prop], source[prop]);
        else destination[prop] = source[prop];
      }
    });
    return destination;
  }

  /**
   * Push new data to database
   * @param {String} key - Key
   * @param {Any} value - Value or data
   */
  push(key, value) {
    if (!this.hasKey(key)) return undefined;
    this.set(key, this._dataMerge(this.get(key), value));
  }

  /**
   * Set data to database
   * @param {String} key - Key
   * @param {Any} value - Value or data
   */
  async set(key, value) {
    if (value.length >= 32000)
      this.error.CustomError(
        "Database",
        "set",
        "Value length is too much, limit character is 32000 or 32k"
      );
    const [encryptKey, encryptValue] = [key, value].map((item) =>
      Formatter.EncryptText(JSON.stringify(item))
    );
    this.delete(key);
    await null;
    new ChatClass().runCommand(
      `scoreboard players set "[${encryptKey},${encryptValue}]" "${this.DB_NAME}" 0`
    );
    this.RESTORED_DATA.set(key, value);
  }

  /**
   * Get data from database
   * @param {String} key - Key
   */
  get(key) {
    return this.hasKey(key) ? this.RESTORED_DATA.get(key) : undefined;
  }

  /**
   * Delete database data based with key
   * @param {String} key - Key
   */
  async delete(key) {
    if (!this.hasKey(key)) return undefined;
    const [encryptKey, encryptValue] = [key, this.RESTORED_DATA.get(key)].map(
      (item) => Formatter.EncryptText(JSON.stringify(item))
    );
    await null;
    new ChatClass().runCommand(
      `scoreboard players reset "[${encryptKey},${encryptValue}]" "${this.DB_NAME}"`
    );
    this.RESTORED_DATA.delete(key);
  }

  /**
   * Find data without key
   * @param {Function} fn - Function
   */
  find(fn) {
    return this.RESTORED_DATA.find(fn);
  }

  /**
   * Looping the data
   * @param {Function} fn - Function
   */
  forEach(fn) {
    return this.RESTORED_DATA.forEach(fn);
  }

  /**
   * Reset database
   */
  reset() {
    world.scoreboard.removeObjective(`DB_${this.DB_NAME}`);
    world.scoreboard.addObjective(`DB_${this.DB_NAME}`, `DB_${this.DB_NAME}`);
    this.RESTORED_DATA.clear();
  }

  /** Iterator */
  *values() {
    yield* this.RESTORED_DATA.values();
  }

  /** Iterator */
  *keys() {
    yield* this.RESTORED_DATA.keys();
  }

  /**
   * Has key
   * @param {String} key - Key
   */
  hasKey(key) {
    return this.RESTORED_DATA.has(key);
  }

  /** Iterator */
  *entries() {
    yield* this.RESTORED_DATA.entries();
  }

  /** Iterator */
  [Symbol.iterator]() {
    return this.entries();
  }
}

export { Database };
