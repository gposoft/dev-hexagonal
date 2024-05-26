import { inject, injectable } from "tsyringe";
import { Validation } from "../../../../shared/domain/validations/validations";
import { HttpStatusCode } from "../../../../system/exceptions";
import { CreateProductEntity } from "../../domain/entities";
import { ProductException } from "../../domain/exceptions";
import { GetByCodeProductRepository, GetByIdProductRepository } from "../../domain/ports";

@injectable()
export class CreateProductEntityValidation implements Validation<CreateProductEntity> {
  constructor(
    @inject("GetByCodeProductRepository") private readonly getByCodeProduct: GetByCodeProductRepository,
    @inject("GetByIdProductRepository") private readonly getByIdProduct: GetByIdProductRepository
  ) {}

  async validate(product: CreateProductEntity) {
    const foundId = await this.getByIdProduct.getById(product.id);
    if (foundId && foundId.id === product.id) throw new ProductException({ code: HttpStatusCode.CONFLICT.toString(), path: "CREATE", message: "El id del producto ya existe" });

    
    const foundCode = await this.getByCodeProduct.getByCode(product.code);
    if (foundCode && foundCode.code === product.code)
      throw new ProductException({ code: HttpStatusCode.CONFLICT.toString(), path: "CREATE", message: "El codigo del producto ya existe" });
  }
}
