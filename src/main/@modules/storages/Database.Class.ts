import {
  world,
  ScoreboardIdentityType,
  Scoreboard,
  ScoreboardObjective,
} from "@minecraft/server";
import { Collection } from "../handlers/data/Collection.Class";
import { ChatClass } from "../handlers/message/Chat.Class";
import { ErrorClass } from "../handlers/message/Error.Class";
import * as Formatter from "../utils/Formatter.Function";
import * as Validation from "../utils/Validation.Function";
import * as Timer from "../utils/Timer.Function";

class Database {
  private DB_NAME: string;
  private DB_SAVED_NAMES: string[];
  private RESTORED_DATA: Collection;
  private error: ErrorClass;
  private objective: Scoreboard | ScoreboardObjective;

  /**
   * Database class
   * @param name - Database name
   */
  constructor(name: string) {
    this.DB_NAME = name;
    this.DB_SAVED_NAMES = [];
    this.RESTORED_DATA = new Collection();
    this.error = new ErrorClass();
    this.objective =
      world.scoreboard.getObjective(name) ??
      world.scoreboard.addObjective(`DB_${name}`, `DB_${name}`);

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

    Timer.runNextTick(() => {
      for (const participant of this.objective.getParticipants()) {
        if (participant.type !== ScoreboardIdentityType.FakePlayer) continue;
        const [cleanData, parsedData] = participant.displayName
          .slice(1, -1)
          .split(",")
          .map(Formatter.DecryptText);
        this.RESTORED_DATA.set(JSON.parse(cleanData), JSON.parse(parsedData));
      }
    });
  }

  private _dataMerge(...arrays: any): any {
    const destination: any = {};
    arrays.forEach((source: any) => {
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
   * @param key - Key
   * @param value - Value or data
   */
  push(key: string, value: any): undefined | void {
    if (!this.hasKey(key)) return undefined;
    this.set(key, this._dataMerge(this.get(key), value));
  }

  /**
   * Set data to database
   * @param key - Key
   * @param value - Value or data
   */
  async set(key: string, value: any) {
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
      `scoreboard players set "[${encryptKey},${encryptValue}]" "DB_${this.DB_NAME}" 0`
    );
    this.RESTORED_DATA.set(key, value);
  }

  /**
   * Get data from database
   * @param key - Key
   */
  get(key: string): any | undefined {
    return this.hasKey(key) ? this.RESTORED_DATA.get(key) : undefined;
  }

  /**
   * Delete database data based with key
   * @param key - Key
   */
  async delete(key: string): Promise<undefined | void> {
    if (!this.hasKey(key)) return undefined;
    const [encryptKey, encryptValue] = [key, this.RESTORED_DATA.get(key)].map(
      (item) => Formatter.EncryptText(JSON.stringify(item))
    );
    await null;
    new ChatClass().runCommand(
      `scoreboard players reset "[${encryptKey},${encryptValue}]" "DB_${this.DB_NAME}"`
    );
    this.RESTORED_DATA.delete(key);
  }

  /**
   * Find data without key
   * @param fn - Function
   */
  find(fn: (value: any, key?: any, map?: Map<any, any>) => any): any {
    return this.RESTORED_DATA.find(fn);
  }

  /**
   * Looping the data
   * @param fn - Function
   */
  forEach(fn: (value: any, key?: any, map?: Map<any, any>) => void): any {
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
   * @param key - Key
   */
  hasKey(key: string): boolean {
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
