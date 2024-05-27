import { container } from "tsyringe";
import { CreateProductEntityValidation } from "../../modules/products/application/validations";
import {
  CreateProductMemoryRepository,
  GetByCodeProductMemoryRepository,
  GetByIdProductMemoryRepository,
  GetProductsMemoryRepository,
} from "../../modules/products/infrastructure/adapters/repositories";
import { ValidatorService } from "../../shared/application/services";

import { CreateProductResolver } from "../../modules/products/infrastructure/resolvers";
import { CreateProductService, GetProductsService } from "../../modules/products/application/services";
import { GetProductsResolver } from "../../modules/products/infrastructure/resolvers/getProducts.resolver";
import { envConfig } from "./environment";

const setupProduct = () => {
  //* 1. Repositories
  if (envConfig.db.engine === "MEMORY") {
    container.register("CreateProductRepository", { useClass: CreateProductMemoryRepository });
    container.register("GetByCodeProductRepository", { useClass: GetByCodeProductMemoryRepository });
    container.register("GetByIdProductRepository", { useClass: GetByIdProductMemoryRepository });
    container.register("GetProductsRepository", { useClass: GetProductsMemoryRepository });
  }

  //* 2. Validations
  container.register("CreateProductEntityValidation", { useClass: CreateProductEntityValidation });
  container.register("ProductValidations", {
    useFactory: (container) => {
      return [container.resolve(CreateProductEntityValidation)];
    },
  });

  //* 3. Services
  container.register("ValidatorService", { useClass: ValidatorService });
  container.register("CreateProductService", { useClass: CreateProductService });
  container.register("GetProductsService", { useClass: GetProductsService });

  //* 4. Resolvers
  container.register("CreateProductResolver", { useClass: CreateProductResolver });
  container.register("GetProductsResolver", { useClass: GetProductsResolver });
};

export const setupDependencies = () => {
  setupProduct();
};
