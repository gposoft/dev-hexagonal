import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ProductDto {
  constructor(data?: { id: string; code: string; name: string; price: number }) {
    if (data) {
      Object.assign(this, data);
    }
  }
  id: string;
  code: string;
  name: string;
  price: number;
}

export class CreateProductDto {
  constructor(data?: { id: string; code: string; name: string; price: number }) {
    if (data) {
      Object.assign(this, data);
    }
  }

  @IsString()
  @IsNotEmpty({ message: "El id es requerido" })
  id: string;
  @IsString()
  @IsNotEmpty({ message: "El código no puede ser vacio" })
  code: string;
  @IsString()
  @IsNotEmpty({ message: "El nombre no puede ser vacio" })
  name: string;
  @IsNumber({}, { message: "El precio debe ser un número." })
  price: number;
}

export class UpdateProductDto {
  constructor(data?: { code?: string; name?: string; price?: number }) {
    if (data) {
      Object.assign(this, data);
    }
  }

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  code?: string;

  @IsNumber({}, { message: "El precio debe ser un número." })
  @IsOptional()
  price?: number;
}
