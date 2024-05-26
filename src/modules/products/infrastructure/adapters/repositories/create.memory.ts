import { injectable } from "tsyringe";
import { Products } from "../../../../../dataset/product.memory";
import { CreateProductEntity, ProductEntity } from "../../../domain/entities";
import { CreateProductRepository } from "../../../domain/ports";

@injectable()
export class CreateProductMemoryRepository implements CreateProductRepository {
  async create(product: CreateProductEntity): Promise<ProductEntity> {
    const register: ProductEntity = {
      ...product,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    Products.push(register);
    return register;
  }
}


