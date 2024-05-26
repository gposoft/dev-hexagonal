import { injectable } from "tsyringe";
import { CreateContextRepository } from "../../../domain/ports";
import { CreateContextEntity, ContextEntity } from "../../../domain/entities/context.entity";

@injectable()
export class CreateContextMemoryRepository implements CreateContextRepository {
    async create(context: CreateContextEntity): Promise<ContextEntity> {
        throw new Error("Method not implemented.");
    }
}
