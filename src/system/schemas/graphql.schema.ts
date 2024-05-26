import { buildSubgraphSchema } from "@apollo/subgraph";
import gql from "graphql-tag";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { productSchemas } from "../../modules/products/infrastructure/resolvers/product.schemas";
import { container } from "tsyringe";
import { CreateProductResolver } from "../../modules/products/infrastructure/resolvers/create.resolver";
import { setupDependencies } from "../config";
import { GraphQLSchema } from "graphql";
import { GetProductsResolver } from "../../modules/products/infrastructure/resolvers/getProducts.resolver";

const rootTypeDefs = gql`
  type DataError {
    code: String
    path: String
    message: String
  }

  interface Response {
    status: String
    errors: [DataError]
  }

  type Query {
    _rootQuery: String
  }

  type Mutation {
    _rootMutation: String
  }
`;

export const getGraphQLSchemas = (): GraphQLSchema => {
  setupDependencies();

  const globalTypes = mergeTypeDefs([productSchemas, rootTypeDefs]);

  const rootResolvers = {
    Query: {},
    Mutation: {},
  };

  const createProductResolver = container.resolve(CreateProductResolver);
  const getProductsResolver = container.resolve(GetProductsResolver);

  const subgraphSchema = buildSubgraphSchema([
    { typeDefs: globalTypes, resolvers: rootResolvers },
    { typeDefs: createProductResolver.types(), resolvers: createProductResolver.resolver() },
    { typeDefs: getProductsResolver.types(), resolvers: getProductsResolver.resolver() },
  ]);

  return subgraphSchema;
};
