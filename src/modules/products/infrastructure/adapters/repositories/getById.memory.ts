import { injectable } from "tsyringe";
import { Products } from "../../../../../dataset/product.memory";
import { ProductEntity } from "../../../domain/entities";
import { GetByIdProductRepository } from "../../../domain/ports";

@injectable()
export class GetByIdProductMemoryRepository implements GetByIdProductRepository {
  async getById(id: string): Promise<ProductEntity | null | undefined> {
    const found = Products.find((p) => p.id === id);
    return found;
  }
}
