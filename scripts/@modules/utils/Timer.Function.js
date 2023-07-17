import { system } from "@minecraft/server";
/**
 * Run next tick
 * @param callback
 */
function runNextTick(callback) {
    const timerId = system.run(callback);
    return timerId;
}
/**
 * Repeatedly executing a function
 * @param callback
 * @param tick
 */
function setTickInterval(callback, tick) {
    const timerId = system.runInterval(callback, tick);
    return timerId;
}
/**
 * Executing a function with delay
 * @param callback
 * @param tick
 */
function setTickTimeout(callback, tick) {
    const timerId = system.runTimeout(callback, tick);
    return timerId;
}
/**
 * Same with setTickInterval but without tick
 * @param callback
 */
function runInfinityLoop(callback) {
    const timerId = system.runInterval(callback);
    return timerId;
}
/**
 * Clear tick
 * @param timerId
 * @example
 * const run = setTickInterval(YourFunction, 20);
 * clearTick(run);
 */
function clearTick(timerId) {
    system.clearRun(timerId);
}
/**
 * Like setTickTimeout but without function
 * @param tick
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
    }
    catch (err) {
        console.warn(err, err.stack);
    }
}
export { runNextTick, setTickInterval, setTickTimeout, runInfinityLoop, clearTick, sleep, };
