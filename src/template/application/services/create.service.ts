import { inject, injectable } from "tsyringe";
import { CreateContextDto } from "../../domain/dtos";
import { ContextMapper } from "../../domain/mappers";
import { CreateContextRepository } from "../../domain/ports";
import { ValidatorService } from "../../../shared/application/services";
import { CreateContextEntity } from "../../domain/entities/context.entity";

@injectable()
export class CreateContextService {
  constructor(
    @inject("ValidatorService") private readonly validator: ValidatorService<CreateContextEntity>,
    @inject("CreateContextRepository") private readonly createContextRepository: CreateContextRepository
  ) {}

  async create(context: CreateContextDto) {
    //* 1. Convierte Dto -> Entity
    const entity = await ContextMapper.toCreateEntity(context);
    //* 2. Validaciones
    await this.validator.validate(entity);
    //* 3. Crea registro en repositorio
    const register = await this.createContextRepository.create(entity);
    //* 4. Convierte Entity -> Dto
    const dto = await ContextMapper.toDto(register);
    return dto;
  }
}
