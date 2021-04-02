export class ErrorUtils {
  public static traceError(functionName: string, error: Error) {
    console.error(`${functionName}: ${error.message}`);
    console.log(error.stack);
  }
}
