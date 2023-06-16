import { setTickTimeout } from "./Timer.Function";

class CooldownClass {
  /**
   * Cooldown system
   * @param {String} name - Cooldown name
   */
  constructor(name) {
    /**@private */
    this.name = name;
    /**@private */
    this.endTime = null;
  }

  /**
   * Start cooldown
   * @param {Number} duration - Duration in seconds
   */
  start(duration) {
    if (this.isActive()) return;

    this.endTime = Date.now() + duration * 1000;

    setTickTimeout(() => {
      this.endTime = null;
    }, duration * 20);
  }

  /**
   * Check cooldown
   * @returns {Boolean}
   */
  isActive() {
    return this.endTime !== null && this.endTime > Date.now();
  }

  /**
   * Get cooldown time remaining
   * @returns {Number}
   */
  getCooldown() {
    if (this.isActive()) {
      const remainingTime = Math.max(0, this.endTime - Date.now());
      return Math.round(remainingTime / 1000);
    }
    return 0;
  }
}

export { CooldownClass };
