import {  PORT } from "./config/env.js";
const port = PORT;

// fastify
import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

// swagger
import { swaggerConfig, swaggerUiConfig } from "./config/swaggerConfig.js";
import { corsConfig } from "./config/corsConfig.js";

// hooks
import LoggerResponse from "./hooks/LoggerResponse.js";
import errorHook from "./hooks/errorHook.js";

// router
import serviceRouter from "./routes/serviceRouter.js";

//log
import logConfig from "./config/logConfig.js";

const fastify = Fastify(logConfig);

// plugins
await fastify.register(cors, corsConfig);
await fastify.register(fastifySwagger, swaggerConfig(port));
await fastify.register(fastifySwaggerUi, swaggerUiConfig);

// hooks
await fastify.register(LoggerResponse);
await fastify.register(errorHook);

// rotas
await fastify.register(serviceRouter);

// inicialização
const start = async () => {
  try {
    await fastify.listen({ port, host: "0.0.0.0" });
  } catch (error) {
    console.error("❌ Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
};

start();
