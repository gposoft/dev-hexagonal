import { DocumentNode, GraphQLResolveInfo } from "graphql";
import gql from "graphql-tag";
import { ContextValue } from "../../../../system/config";
import { inject, injectable } from "tsyringe";
import { ApiResponseService } from "../../../../shared/application/services";


import { ProductDto } from "../../domain/dtos";
import { CreateProductService } from "../../application/services";
import { ProductMapper } from "../../domain/mappers";

@injectable()
export class CreateProductResolver {
  constructor(@inject("CreateProductService") private readonly createProductService: CreateProductService) {}

  types(): DocumentNode {
    const schema = gql`
      input ProductInput {
        id: ID
        code: String
        name: String
        price: Float
      }

      extend type Mutation {
        createProduct(product: ProductInput): ProductResponse
      }
    `;

    return schema;
  }

  resolver(): any {
    return {
      Mutation: {
        createProduct: async (parent: any, args: any, context: ContextValue, info: GraphQLResolveInfo) => {

          const process = async () => {
            const { product } = args
            const createProductDto = await ProductMapper.toObjectCreateDto(product)
            const productDto = await this.createProductService.create(createProductDto);
            return [productDto];
          };

          return ApiResponseService.response<ProductDto[]>(process);
        },
      },
    };
  }
}
