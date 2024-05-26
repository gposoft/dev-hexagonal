import { inject, injectable } from "tsyringe";
import { CreateProductDto } from "../../domain/dtos";
import { CreateProductEntity } from "../../domain/entities";
import { ProductMapper } from "../../domain/mappers";
import { CreateProductRepository } from "../../domain/ports";
import { ValidatorService } from "../../../../shared/application/services";

@injectable()
export class CreateProductService {
  constructor(
    @inject("ValidatorService") private readonly validator: ValidatorService<CreateProductEntity>,
    @inject("CreateProductRepository") private readonly createProductRepository: CreateProductRepository
  ) {}

  async create(product: CreateProductDto) {
    const entity = await ProductMapper.toCreateEntity(product); // 1. Convierte Dto -> Entity
    await this.validator.validate(entity); // 2. Validaciones
    const register = await this.createProductRepository.create(entity); // 3. Crea registro en repositorio
    const dto = await ProductMapper.toDto(register); // 4. Convierte Entity -> Dto
    return dto;
  }
}
