import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ContextEntity {
  constructor(data?: { id: string, name:string }) {
    if (data) {
      Object.assign(this, data);
    }
  }
  id: string;
  name: string;
}

export class CreateContextEntity {
  constructor(data?: { id: string; name: string }) {
    if (data) {
      Object.assign(this, data);
    }
  }

  @IsString()
  @IsNotEmpty({ message: "El id es requerido" })
  id: string;

  @IsString()
  @IsNotEmpty({ message: "El nombre no puede ser vacio" })
  name: string;
}

export class UpdateContextEntity {
  constructor(data?: {name:string}) {
    if (data) {
      Object.assign(this, data);
    }
  }

  @IsString()
  @IsOptional()
  name?: string;
}
