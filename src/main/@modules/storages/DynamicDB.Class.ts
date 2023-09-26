import { Entity, Player, Vector3, World } from "@minecraft/server";
import { ErrorClass } from "../modules";
import DataTypes from "../@types/storages/DBDataTypes";

const __SAVED_NAMES: string[] = [];

class DB {
  private DB_PROPERTIES: World | Entity | Player;
  private DB_KEYS: string[];
  private error: ErrorClass;

  constructor(name: string, type: World | Entity | Player) {
    this.DB_PROPERTIES = type;
    this.DB_KEYS = [];
    this.error = new ErrorClass();
  }

  _dataMerge(...arrays: any[]) {
    const destination: any = {};
    arrays.forEach((source) => {
      for (let prop in source) {
        if (destination[prop] === null || Array.isArray(destination[prop]))
          destination[prop] =
            (destination[prop] || []).concat(source[prop]) || source[prop];
        else if (typeof destination[prop] === "object")
          destination[prop] = this._dataMerge(destination[prop], source[prop]);
        else destination[prop] = source[prop];
      }
    });
    return destination;
  }

  get(key: string) {
    if (
      this.DB_PROPERTIES.getDynamicProperty(key) === "$" ||
      !this.DB_PROPERTIES.getDynamicProperty(key)
    )
      return undefined;
    else return this.DB_PROPERTIES.getDynamicProperty(key);
  }

  set(key: string, data: DataTypes) {
    this.DB_KEYS.push(key);
    this.DB_PROPERTIES.setDynamicProperty(key, data);
  }

  *keys() {
    for (const key of this.DB_KEYS) {
      yield key;
    }
  }

  hasKey(key: string) {
    for (const existingKey of this.keys()) {
      if (key === existingKey) {
        return true;
      }
    }
    return false;
  }

  push(key: string, data: DataTypes) {
    this.set(key, this._dataMerge(this.get(key), data));
  }

  delete(key: string) {
    this.DB_KEYS.splice(this.DB_KEYS.indexOf(key), 1);
    this.set(key, "$");
  }

  *entries() {
    for (const key of this.keys()) {
      const value = this.get(key);
      if (value === undefined) continue;
      yield [key, value];
    }
  }

  *values() {
    for (const [, value] of this.entries()) {
      yield value;
    }
  }

  find(fn: (value: DataTypes, key?: any) => any) {
    for (const [key, value] of this.entries()) {
      if (fn(value, key)) return value;
    }
  }
  /*
  forEach(callback) {
    for (const [key, value] of this.entries()) {
      callback(value, key, this);
    }
  }

  reset() {
    this.db.clear();
    this.key_save = [];
  }*/

  *[Symbol.iterator]() {
    yield* this.entries();
  }
}
