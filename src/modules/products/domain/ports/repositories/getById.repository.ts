import { ProductEntity } from "../../entities/product.entity";

export interface GetByIdProductRepository {
  getById(code: string): Promise<ProductEntity | null | undefined>;
}
