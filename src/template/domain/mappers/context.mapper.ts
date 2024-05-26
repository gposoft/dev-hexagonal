import { ContextDto, CreateContextDto } from "../dtos";
import { ContextEntity, CreateContextEntity } from "../entities/context.entity";

export class ContextMapper {
  static async toObjectDto(object: any): Promise<ContextDto> {
    return new ContextDto({ id: object.id, name: object.name });
  }

  static async toObjectCreateDto(object: any): Promise<CreateContextDto> {
    return new CreateContextDto({ id: object.id, name: object.name });
  }

  static async toDto(entity: ContextEntity): Promise<ContextDto> {
    return new ContextDto({ id: entity.id, name: entity.name });
  }

  static async toDtos(entities: ContextEntity[]): Promise<ContextDto[]> {
    return await Promise.all(entities.map(async (entity) => this.toDto(entity)));
  }

  static async toCreateEntity(dto: CreateContextDto): Promise<CreateContextEntity> {
    return new CreateContextEntity({ id: dto.id, name: dto.name });
  }
}
