import { world } from "@minecraft/server";

// Got from iBlqzed LOL

const databaseNames = [];

class Database {
  /**
   * Create database
   * @param {string} name
   */
  constructor(name) {
    this.data = {};
    this.name = name.replaceAll(/"/g, '\\"');

    if (databaseNames.includes(this.name)) {
      throw new Error(`You can't have 2 of the same databases`);
    }

    if (this.name.length > 13 || this.name.length === 0) {
      throw new Error(
        `Database names can't be more than 13 characters long, and it can't be nothing!`
      );
    }

    databaseNames.push(this.name);

    try {
      world.scoreboard.addObjective(`DB_${this.name}`, `DB_${this.name}`);
    } catch {
      world.scoreboard
        .getObjective(`DB_${this.name}`)
        .getParticipants()
        .forEach((entry) => {
          const parsed = JSON.parse(entry.displayName.replaceAll(/\\"/g, '"'));
          this.data.set(parsed[0], parsed[1]);
        });
    }
  }

  /**
   * Set database value
   * @param {string} key
   * @param {any} value
   */
  set(key, value) {
    const encodedValue = JSON.stringify(value).replaceAll(/"/g, '\\"');
    const encodedKey = key.replaceAll(/"/g, '\\"');

    if (encodedValue.length + encodedKey.length + 1 > 255) {
      throw new Error(
        `Database setter too long, can only be 255 characters rn (Sorry!)`
      );
    }

    if (this.data.hasOwnProperty(key)) {
      runCommand(
        `scoreboard players reset "${encodedKey}_${JSON.stringify(
          this.data.get(key)
        ).replaceAll(/"/g, '\\"')}" "DB_${this.name}"`
      );
    }

    runCommand(
      `scoreboard players set "[${encodedKey},${encodedValue}]" "DB_${this.name}" 0`
    );

    this.data[key] = value;
  }

  /**
   * Push new data
   * @param {string} key
   * @param {any} value
   */
  push(key, value = []) {
    const getOldData = this.get(key);
    const newData = [getOldData, ...value];
    this.set(key, newData);
  }

  /**
   * Get data
   * @param {string} key
   */
  get(key) {
    return this.data[key];
  }

  /**
   * Has key
   * @param {string} key
   */
  has(key) {
    return this.data.hasOwnProperty(key);
  }

  /**
   * Delete data
   * @param {string} key
   */
  delete(key) {
    if (!this.data.hasOwnProperty(key)) {
      return;
    }

    const encodedKey = key.replaceAll(/"/g, '\\"');
    runCommand(
      `scoreboard players reset "[${encodedKey},${JSON.stringify(
        this.data.get(key)
      ).replaceAll(/"/g, '\\"')}]" "DB_${this.name}"`
    );
    delete this.data[key];
  }

  /**
   * Get all key
   */
  keys() {
    return Object.keys(this.data);
  }

  /**
   * Get all value
   */
  values() {
    return Object.values(this.data);
  }

  /**
   * Clear all data
   */
  clear() {
    world.scoreboard.removeObjective(`DB_${this.name}`);
    world.scoreboard.addObjective(`DB_${this.name}`, `DB_${this.name}`);
    this.data = {};
  }

  /**
   * forEach method
   */
  forEach(callback) {
    this.keys().forEach((key) => callback(key, this.data[key]));
  }

  /**
   * Interator
   */
  *[Symbol.iterator]() {
    yield* this.data.entries();
  }
}

const runCommand = world
  .getDimension("overworld")
  .runCommandAsync.bind(world.getDimension("overworld"));

export { Database };
