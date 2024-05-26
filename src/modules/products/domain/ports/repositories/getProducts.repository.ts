import { ProductEntity } from "../entities";

export interface GetProductsRepository {
  getProducts(): Promise<ProductEntity[]>;
}
