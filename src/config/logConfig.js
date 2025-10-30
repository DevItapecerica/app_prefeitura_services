import { NODE_ENV } from "./env.js";

const logg =
  NODE_ENV === "prod"
    ? {
        translateTime: "HH:MM:ss",
        ignore: "hostname",
        colorize: false,
        destination: "logs/server.log",
        mkdir: true,
      }
    : { translateTime: "HH:MM:ss", ignore: "hostname" };

const logConfig = {
  disableRequestLogging: true,
  logger: {
    level: "info",
    transport: {
      target: "pino-pretty",
      options: logg,
    },
  },
};

export default logConfig;
