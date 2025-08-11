import { PORT } from "./src/config/env.js";
const port = PORT || 8004;

// fastify
import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

// swagger
import { swaggerConfig, swaggerUiConfig } from "./src/config/swaggerConfig.js";
import { corsConfig } from "./src/config/corsConfig.js";

// hooks
import { errorHook } from "./src/hooks/errorHook.js";

// router
import serviceRouter from "./src/routes/serviceRouter.js";

// instância do fastify
const fastify = Fastify();

// plugins
await fastify.register(cors, corsConfig);
await fastify.register(fastifySwagger, swaggerConfig(port));
await fastify.register(fastifySwaggerUi, swaggerUiConfig);

// hooks
fastify.setErrorHandler((error, request, reply) => {
  console.error("----------------------------------------------------------");
  console.error("Error:", error);
  console.error("----------------------------------------------------------");
  errorHook(error, reply);
});

// rotas
await fastify.register(serviceRouter);

// inicialização
const start = async () => {
  try {
    await fastify.listen({ port, host: "0.0.0.0" });
    console.log(`🚀 Server is running on port ${port}`);
  } catch (error) {
    console.error("❌ Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
};

start();
