import { inject, injectable } from "tsyringe";
import { GetContextsRepository } from "../../domain/ports";
import { ContextMapper } from "../../domain/mappers";

@injectable()
export class GetContextsService {
  constructor(@inject("GetContextsRepository") private readonly getContextsRepository: GetContextsRepository) {}

  async getProducts() {
    const contextsEntities = await this.getContextsRepository.getProducts();
    const contextDtos = await ContextMapper.toDtos(contextsEntities);
    return contextDtos;
  }
}
