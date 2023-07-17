class Collection extends Map {
  /**
   * Collection
   */
  constructor() {
    super();
  }

  /**
   * Collection find
   * @param fn - Function
   */
  find(fn: (value: any, key?: any, idk?: unknown) => any) {
    for (const [key, value] of this) {
      if (fn(value, key, this)) return value;
    }
  }
}

export { Collection };
