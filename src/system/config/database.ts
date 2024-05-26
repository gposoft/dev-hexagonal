import { Pool } from "pg";
import { envConfig } from "./environment";

export const connectPg = new Pool({
  user: envConfig.db.postgres.DB_USER,
  password: envConfig.db.postgres.DB_PASSWORD,
  host: envConfig.db.postgres.DB_SERVER,
  port: Number(envConfig.db.postgres.DB_PORT),
  database: envConfig.db.postgres.DB_DATA,
});
