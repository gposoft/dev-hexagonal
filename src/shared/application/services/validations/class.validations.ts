import { validate } from "class-validator";
import { ValidatorException } from "../../../../system/exceptions";


export class ClassValidator {
  static async validate(c: object) {
    const errors = await validate(c, { validationError: { target: false } });
    if (errors.length > 0) {
      throw new ValidatorException(errors);
    }
  }
}
