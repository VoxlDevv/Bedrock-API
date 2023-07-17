/**
 * Check if string
 * @param string
 */
function isString(string: string): boolean {
  return typeof string === "string";
}

/**
 * Check if number
 * @param number
 */
function isNumber(number: number): boolean {
  return typeof number === "number";
}

/**
 * Check if integer
 * @param integer
 */
function isInteger(integer: bigint): boolean {
  return Number.isInteger(integer);
}

/**
 * Check if boolean
 * @param boolean
 */
function isBoolean(boolean: boolean): boolean {
  return typeof boolean === "boolean";
}

/**
 * Check if object
 * @param object
 */
function isObject(object: object): boolean {
  return (
    typeof object === "object" && !Array.isArray(object) && object !== null
  );
}

/**
 * Check if array
 * @param array
 */
function isArray(array: Array<any>): boolean {
  return Array.isArray(array);
}

/**
 * Check if null
 * @param object
 */
function isNull(object: null): boolean {
  return object === null;
}

/**
 * Check if undefined
 * @param object
 */
function isUndefined(object: undefined): boolean {
  return object === undefined;
}

/**
 * Check if error
 * @param error
 */
function isError(error: Error): boolean {
  return error instanceof Error && "message" in error;
}

export {
  isString,
  isNumber,
  isInteger,
  isBoolean,
  isObject,
  isArray,
  isNull,
  isUndefined,
  isError,
};