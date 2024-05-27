import { config } from "dotenv";
import path from "path";
const envPath = path.join(__dirname, `.env.${process.env.NODE_ENV}`);
config({ path: `.env.${process.env.NODE_ENV}` });

export const envConfig = {
  db: {
    engine: process.env.DB_ENGINE,
    postgres: {
      DB_USER: process.env.DB_POSTGRES_USER || "developer",
      DB_PASSWORD: process.env.DB_POSTGRES_PASSWORD || "developer",
      DB_SERVER: process.env.DB_POSTGRES_SERVER || "DEVELOPER",
      DB_DATA: process.env.DB_POSTGRES_DATA || "dbservices",
      DB_PORT: process.env.DB_POSTGRES_PORT || 1433,
    },
  },
  security: {
    jwt_pass: process.env.SECURITY_JWT_KEY || "",
    APIKEY: process.env.API_KEY || "",
  },
  email: {
    outlook: {
      user: process.env.EMAIL_USER || "",
      password: process.env.EMAIL_PASSWORD || "",
    },
  },
  http: {
    port: Number(process.env.BACKEND_PORT || 0),
  },
};
