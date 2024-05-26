import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { Express } from "express";
import cors from "cors";
import { json } from "body-parser";
import { GraphQLFormattedError } from "graphql";
import { getGraphQLSchemas } from "../schemas";

export interface ContextValue {
  token: string;
}

export const StartApolloServer = async (app: Express) => {
  const server = new ApolloServer({
    schema: getGraphQLSchemas(),
    formatError: (err: GraphQLFormattedError, error) => {
      return {
        message: err.message,
      };
    },
  });
  await server.start();
  app.use(
    "/gql",
    cors<cors.CorsRequest>({ credentials: true, origin: "*" }),
    json({ limit: "500mb" }),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const authorization = (req.headers && req.headers.authorization) || "";
        const context: ContextValue = {
          token: authorization && authorization.includes("Bearer") ? (authorization + "").split(" ")[1] : "API",
        };

        return context;
      },
    })
  );
};
