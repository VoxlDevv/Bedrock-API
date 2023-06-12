class Collection extends Map {
  /**
   * Collection
   */
  constructor() {
    super();
  }

  /**
   * Collection find
   * @param {Function} fn
   */
  find(fn) {
    for (const [key, value] of this) {
      if (fn(value, key, this)) return value;
    }
  }
}

export { Collection };
