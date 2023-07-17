/**
 * Check if string
 * @param string
 */
function isString(string) {
    return typeof string === "string";
}
/**
 * Check if number
 * @param number
 */
function isNumber(number) {
    return typeof number === "number";
}
/**
 * Check if integer
 * @param integer
 */
function isInteger(integer) {
    return Number.isInteger(integer);
}
/**
 * Check if boolean
 * @param boolean
 */
function isBoolean(boolean) {
    return typeof boolean === "boolean";
}
/**
 * Check if object
 * @param object
 */
function isObject(object) {
    return (typeof object === "object" && !Array.isArray(object) && object !== null);
}
/**
 * Check if array
 * @param array
 */
function isArray(array) {
    return Array.isArray(array);
}
/**
 * Check if null
 * @param object
 */
function isNull(object) {
    return object === null;
}
/**
 * Check if undefined
 * @param object
 */
function isUndefined(object) {
    return object === undefined;
}
/**
 * Check if error
 * @param error
 */
function isError(error) {
    return error instanceof Error && "message" in error;
}
export { isString, isNumber, isInteger, isBoolean, isObject, isArray, isNull, isUndefined, isError, };
