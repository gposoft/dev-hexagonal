import { DocumentNode, GraphQLResolveInfo } from "graphql";
import gql from "graphql-tag";
import { inject, injectable } from "tsyringe";
import { ContextValue } from "../../../system/config";
import { ApiResponseService } from "../../../shared/application/services";
import { ContextDto } from "../../domain/dtos";

@injectable()
export class CreateResolver {
  constructor() {}

  types(): DocumentNode {
    const schema = gql`
      input ContextInput {
        id: ID
      }

      extend type Mutation {
        create(context: ContextInput): ContextResponse
      }
    `;

    return schema;
  }

  resolver(): any {
    return {
      Mutation: {
        create: async (parent: any, args: any, context: ContextValue, info: GraphQLResolveInfo) => {
          const process = async () => {
            const { context } = args;
            return [];
          };

          return ApiResponseService.response<ContextDto[]>(process);
        },
      },
    };
  }
}
