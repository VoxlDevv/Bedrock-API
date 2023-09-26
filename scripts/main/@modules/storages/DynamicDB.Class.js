import { ErrorClass } from "../modules";
const __SAVED_NAMES = [];
class DB {
    DB_PROPERTIES;
    DB_KEYS;
    error;
    constructor(name, type) {
        this.DB_PROPERTIES = type;
        this.DB_KEYS = [];
        this.error = new ErrorClass();
    }
    _dataMerge(...arrays) {
        const destination = {};
        arrays.forEach((source) => {
            for (let prop in source) {
                if (destination[prop] === null || Array.isArray(destination[prop]))
                    destination[prop] =
                        (destination[prop] || []).concat(source[prop]) || source[prop];
                else if (typeof destination[prop] === "object")
                    destination[prop] = this._dataMerge(destination[prop], source[prop]);
                else
                    destination[prop] = source[prop];
            }
        });
        return destination;
    }
    get(key) {
        if (this.DB_PROPERTIES.getDynamicProperty(key) === "$" ||
            !this.DB_PROPERTIES.getDynamicProperty(key))
            return undefined;
        else
            return this.DB_PROPERTIES.getDynamicProperty(key);
    }
    set(key, data) {
        this.DB_KEYS.push(key);
        this.DB_PROPERTIES.setDynamicProperty(key, data);
    }
    *keys() {
        for (const key of this.DB_KEYS) {
            yield key;
        }
    }
    hasKey(key) {
        for (const existingKey of this.keys()) {
            if (key === existingKey) {
                return true;
            }
        }
        return false;
    }
    push(key, data) {
        this.set(key, this._dataMerge(this.get(key), data));
    }
    delete(key) {
        this.DB_KEYS.splice(this.DB_KEYS.indexOf(key), 1);
        this.set(key, "$");
    }
    *entries() {
        for (const key of this.keys()) {
            const value = this.get(key);
            if (value === undefined)
                continue;
            yield [key, value];
        }
    }
    *values() {
        for (const [, value] of this.entries()) {
            yield value;
        }
    }
    find(fn) {
        for (const [key, value] of this.entries()) {
            if (fn(value, key))
                return value;
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
