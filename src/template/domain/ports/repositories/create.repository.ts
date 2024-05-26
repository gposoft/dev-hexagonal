import { ContextEntity, CreateContextEntity } from "../../entities/context.entity";

export interface CreateContextRepository {
  create(context: CreateContextEntity): Promise<ContextEntity>;
}
