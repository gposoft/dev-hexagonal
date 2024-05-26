import { inject, injectable } from "tsyringe";
import { ProductMapper } from "../../domain/mappers";
import { GetProductsRepository } from "../../domain/ports";

@injectable()
export class GetProductsService {
  constructor(@inject("GetProductsRepository") private readonly getProductsRepository: GetProductsRepository) {}

  async getProducts() {
    const productsEntities = await this.getProductsRepository.getProducts()
    const productDtos = await ProductMapper.toDtos(productsEntities);
    return productDtos;
  }
}