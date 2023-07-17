class ErrorClass {
  /**
   * Custom error
   * @param className - Class target
   * @param functionName - Function target
   * @param errorMessage - Error message
   */
  CustomError(
    className: string,
    functionName: string,
    errorMessage: string
  ): Error {
    throw new Error(`[${className}::${functionName}] ${errorMessage}`);
  }
}

export { ErrorClass };
