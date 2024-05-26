import { CreateProductDto, ProductDto, UpdateProductDto } from "../dtos/product.dto";
import { CreateProductEntity, ProductEntity, UpdateProductEntity } from "../entities/product.entity";

export class ProductMapper {
  static async toObjectDto(object: any): Promise<ProductDto> {
    return new ProductDto({ id: object.id, code: object.code, name: object.name, price: object.price });
  }

  static async toObjectCreateDto(object: any): Promise<CreateProductDto> {
    return new CreateProductDto({ id: object.id, code: object.code, name: object.name, price: object.price });
  }

  static async toDto(entity: ProductEntity): Promise<ProductDto> {
    return new ProductDto({ id: entity.id, code: entity.code, name: entity.name, price: entity.price });
  }

  static async toDtos(entities: ProductEntity[]): Promise<ProductDto[]> {
    return await Promise.all(entities.map(async (entity) => this.toDto(entity)));
  }

  static async toCreateEntity(dto: CreateProductDto): Promise<CreateProductEntity> {
    return new CreateProductEntity({ id: dto.id, code: dto.code, name: dto.name, price: dto.price, createdAt: new Date() });
  }
}
