import { injectable } from "tsyringe";
import { Products } from "../../../../../dataset/product.memory";
import { ProductEntity } from "../../../domain/entities";
import { GetProductsRepository } from "../../../domain/ports";


@injectable()
export class GetProductsMemoryRepository implements GetProductsRepository {
  async getProducts(): Promise<ProductEntity[]> {
    return Products
  }
}
