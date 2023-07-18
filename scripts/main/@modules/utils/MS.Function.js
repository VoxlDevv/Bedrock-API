/**
 * Converting durations or milliseconds
 */
function Format(value, { compactDuration = false, fullDuration = false, avoidDuration = [], } = {}) {
    if (typeof value === "string") {
        if (/^\d+$/.test(value))
            return Number(value);
        const durations = value.match(/-?\d*\.?\d+\s*?(years?|yrs?|weeks?|days?|hours?|hrs?|minutes?|mins?|seconds?|secs?|milliseconds?|msecs?|ms|[smhdwy])/gi);
        return durations
            ? durations.reduce((a, b) => a + toMiliseconds(b), 0)
            : null;
    }
    if (typeof value === "number")
        return toDuration(value, {
            compactDuration,
            fullDuration,
            avoidDuration,
        });
    return false;
}
/**
 * Convert durations to milliseconds
 */
function toMiliseconds(value) {
    const number = Number(value.replace(/[^-.0-9]+/g, ""));
    value = value.replace(/\s+/g, "");
    if (/\d+(?=y)/i.test(value))
        return number * 3.154e10;
    else if (/\d+(?=w)/i.test(value))
        return number * 6.048e8;
    else if (/\d+(?=d)/i.test(value))
        return number * 8.64e7;
    else if (/\d+(?=h)/i.test(value))
        return number * 3.6e6;
    else if (/\d+(?=m)/i.test(value))
        return number * 60000;
    else if (/\d+(?=s)/i.test(value))
        return number * 1000;
    else if (/\d+(?=ms|milliseconds?)/i.test(value))
        return number;
}
/**
 * Convert milliseconds to duration
 */
function toDuration(value, { compactDuration = false, fullDuration = false, avoidDuration = [], } = {}) {
    const absMs = Math.abs(value);
    const duration = [
        { short: "w", long: "week", duration: Math.floor(absMs / 6.048e8) },
        { short: "d", long: "day", duration: Math.floor(absMs / 8.64e7) % 7 },
        { short: "h", long: "hour", duration: Math.floor(absMs / 3.6e6) % 24 },
        { short: "m", long: "minute", duration: Math.floor(absMs / 60000) % 60 },
        { short: "s", long: "second", duration: Math.floor(absMs / 1000) % 60 },
        { short: "ms", long: "millisecond", duration: absMs % 1000 },
    ];
    const mappedDuration = duration
        .filter((obj) => obj.duration !== 0 && avoidDuration
        ? fullDuration &&
            !avoidDuration.map((v) => v.toLowerCase()).includes(obj.short)
        : obj.duration)
        .map((obj) => `${Math.sign(value) === -1 ? "-" : ""}${compactDuration
        ? `${Math.floor(obj.duration)}${obj.short}`
        : `${Math.floor(obj.duration)} ${obj.long}${obj.duration === 1 ? "" : "s"}`}`);
    const result = fullDuration
        ? mappedDuration.join(compactDuration ? " " : ", ")
        : mappedDuration[0];
    return result || `${absMs}`;
}
export { Format, toMiliseconds, toDuration };
