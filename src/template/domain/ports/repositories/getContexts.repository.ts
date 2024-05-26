import { ContextEntity } from "../../entities/context.entity";

export interface GetContextsRepository {
  getProducts(): Promise<ContextEntity[]>;
}
