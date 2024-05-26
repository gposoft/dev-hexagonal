import { CreateProductEntity, ProductEntity } from "../../entities/product.entity";

export interface CreateProductRepository {
  create(product: CreateProductEntity): Promise<ProductEntity>;
}
