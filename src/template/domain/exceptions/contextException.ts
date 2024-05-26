import { ErrorData, Exception } from "../../../system/exceptions";


export class ContextException extends Exception {
  constructor({ code = "400",  path = "/", message = "Error en producto" }: Partial<ErrorData>) {
    super({
      code: `${code}-?`,
      path,
      message,
    });
  }
}
