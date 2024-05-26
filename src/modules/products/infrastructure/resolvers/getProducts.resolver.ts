import { DocumentNode, GraphQLResolveInfo } from "graphql";
import gql from "graphql-tag";
import { inject, injectable } from "tsyringe";
import { ContextValue } from "../../../../system/config";
import { ApiResponseService } from "../../../../shared/application/services";
import { GetProductsService } from "../../application/services";
import { ProductDto } from "../../domain/dtos";

@injectable()
export class GetProductsResolver {
  constructor(@inject("GetProductsService") private readonly getProductsService: GetProductsService) {}

  types(): DocumentNode {
    const schema = gql`
      extend type Query {
        getProducts: ProductResponse
      }
    `;

    return schema;
  }

  resolver(): any {
    return {
      Query: {
        getProducts: async (parent: any, args: any, context: ContextValue, info: GraphQLResolveInfo) => {
          const process = async () => {
            const products = await this.getProductsService.getProducts()
            return products;
          };

          return ApiResponseService.response<ProductDto[]>(process);
        },
      },
    };
  }
}
