import { injectable } from "tsyringe";
import { GetContextsRepository } from "../../../domain/ports";
import { ContextEntity } from "../../../domain/entities/context.entity";

@injectable()
export class GetContextsMemoryRepository implements GetContextsRepository {
  getProducts(): Promise<ContextEntity[]> {
    throw new Error("Method not implemented.");
  }
}
