class ErrorClass {
  /**
   * Custom error
   * @param {any} className
   * @param {any} functionName
   * @param {any} errorMessage
   */
  CustomError(className, functionName, errorMessage) {
    throw new Error(`${className}::${functionName} ${errorMessage}`);
  }
}

export { ErrorClass };
