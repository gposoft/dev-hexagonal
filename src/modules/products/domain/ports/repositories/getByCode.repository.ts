import { ProductEntity } from "../entities/product.entity";

export interface GetByCodeProductRepository {
  getByCode(code: string): Promise<ProductEntity | null | undefined>;
} 