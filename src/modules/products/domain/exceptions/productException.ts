import { ErrorData, Exception } from "../../../../system/exceptions";

export class ProductException extends Exception {
  constructor({ code = "400",  path = "/", message = "Error en producto" }: Partial<ErrorData>) {
    super({
      code: `${code}-1`,
      path,
      message,
    });
  }
}
