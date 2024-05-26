import "reflect-metadata";
import { format } from "date-fns";
import { envConfig, httpServer } from "./system/config";
import { blue, yellow, white, red, green, bold, underline } from "colorette";

export const start = async () => {
  console.clear();
  const port = envConfig.http.port;

  httpServer.listen({ port }, () => {
    const now = new Date();
    console.log(bold(`[${format(now, "yyyy-MM-dd HH:mm:ss")}] - Startup`));
    console.log(yellow(`[${format(now, "yyyy-MM-dd HH:mm:ss")}] - Environment: `) + bold(`${process.env.NODE_ENV}`));
    console.log(yellow(`[${format(now, "yyyy-MM-dd HH:mm:ss")}] - Port: `) + bold(`${port}`));
    console.log(yellow(`[${format(now, "yyyy-MM-dd HH:mm:ss")}] - GraphQL: `) + bold(`http://localhost:${port}/gql`));
  });
};

start();
