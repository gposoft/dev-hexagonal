import { DocumentNode, GraphQLResolveInfo } from "graphql";
import gql from "graphql-tag";
import { inject, injectable } from "tsyringe";
import { ContextValue } from "../../../system/config";
import { ApiResponseService } from "../../../shared/application/services";
import { ContextDto } from "../../domain/dtos";

@injectable()
export class GetsResolver {
  constructor() {}

  types(): DocumentNode {
    const schema = gql`
      extend type Query {
        gets: ContextResponse
      }
    `;

    return schema;
  }

  resolver(): any {
    return {
      Query: {
        gets: async (parent: any, args: any, context: ContextValue, info: GraphQLResolveInfo) => {
          const process = async () => {
            return [];
          };

          return ApiResponseService.response<ContextDto[]>(process);
        },
      },
    };
  }
}
