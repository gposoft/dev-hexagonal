import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { StartApolloServer } from "./graphql";
import { createServer } from "http";

const httpExpress = () => {
  const app = express();
  app.use(cors({ credentials: true, origin: "*" }));
  app.use(json({ limit: "500mb" }));
  StartApolloServer(app);
  return app;
};

export const httpServer = createServer(httpExpress());
