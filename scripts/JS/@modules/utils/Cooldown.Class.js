class CooldownClass {
  /**
   * Cooldown system
   * @param {String} name - Cooldown name
   */
  constructor(name) {
    this.cooldowns = new Map();
    this.name = name;
  }

  /**
   * Start the cooldown
   * @param {Number} duration - Duration
   */
  start(duration) {
    const endTime = Date.now() + duration * 1000;
    this.cooldowns.set(this.name, endTime);
  }

  /**
   * Check if cooldown is active
   * @returns {Boolean}
   */
  isActive() {
    const endTime = this.cooldowns.get(this.name);
    if (!endTime) {
      return false;
    }
    return Date.now() < endTime;
  }

  /**
   * Get cooldown time left
   * @returns {Number}
   */
  getTime() {
    const endTime = this.cooldowns.get(this.name);
    if (!endTime) {
      return 0;
    }
    return Math.max(0, endTime - Date.now());
  }
}

export { CooldownClass };
