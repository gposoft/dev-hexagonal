import { inject, injectable, injectAll } from "tsyringe";
import { Validation } from "../../../domain/validations";

@injectable()
export class ValidatorService<T> {
  constructor(@inject("ProductValidations") private readonly validators: Validation<T>[]) {
    this.validators = validators;
  }

  async validate(param: T): Promise<void> {
    for (const validator of this.validators) {
      await validator.validate(param);
    }
  }
}
