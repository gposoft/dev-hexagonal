import { inject, injectable } from "tsyringe";
import { Validation } from "../../../shared/domain/validations";
import { CreateContextEntity } from "../../domain/entities/context.entity";

@injectable()
export class CreateContextEntityValidation implements Validation<CreateContextEntity> {
  constructor() {}

  async validate(context: CreateContextEntity) {
    //* Method not implemented.
  }
}
