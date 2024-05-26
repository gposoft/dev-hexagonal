import { injectable } from "tsyringe";
import { Products } from "../../../../../dataset/product.memory";
import { ProductEntity } from "../../../domain/entities";
import { GetByCodeProductRepository } from "../../../domain/ports";

@injectable()
export class GetByCodeProductMemoryRepository implements GetByCodeProductRepository {
  async getByCode(code: string): Promise<ProductEntity | null | undefined> {
    const found = Products.find((p) => p.code === code);
    return found;
  }
}
