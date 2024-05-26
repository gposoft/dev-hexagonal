import { Exception } from "./generic.exception";
import { ValidatorException } from "./validator.exception";
import { ErrorData } from "../models/error.model";

export class ErrorProcessor {
  private static errorHandlers = [Exception, ValidatorException];

  static processError(err: Error): ErrorData[] {
    for (const errorType of this.errorHandlers) {
      if (err instanceof errorType) return err.getErrors();
    }
    return [
      {
        code: "500",
        path: "/",
        message: err.message,
      },
    ];
  }
}
