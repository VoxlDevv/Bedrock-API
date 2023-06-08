import { system } from "@minecraft/server";

/**
 * Repeatedly executing a function
 * @param {Function} callback
 * @param {Number} tick
 * @returns {Number}
 */
function setTickInterval(callback, tick) {
  const timerId = system.runInterval(callback, tick);
  return timerId;
}

/**
 * Executing a function with delay
 * @param {Function} callback
 * @param {Bumber} tick
 * @returns {Number}
 */
function setTickTimeout(callback, tick) {
  const timerId = system.runTimeout(callback, tick);
  return timerId;
}

/**
 * Same with setTickInterval but without tick
 * @param {Function} callback
 * @returns {Number}
 */
function setInfinityLoop(callback) {
  const timerId = system.run(callback, tick);
  return timerId;
}

/**
 * Clear tick
 * @param {Number} timerId
 * @example
 * const run = setTickInterval(YourFunction, 20);
 * clearTick(run);
 */
function clearTick(timerId) {
  system.clearRun(timerId);
}

/**
 * Like setTickTimeout but without function
 * @param {Number} tick
 * @returns {Promise}
 * @example
 * console.warn("One");
 * sleep(20);
 * console.warn("Two");
 */
async function sleep(tick) {
  try {
    return new Promise((resolve, reject) => {
      system.runTimeout(resolve, tick);
    });
  } catch (err) {
    console.warn(err, err.stack);
  }
}

export { setTickInterval, setTickTimeout, setInfinityLoop, clearTick, sleep };
