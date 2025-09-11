import { PORT } from "./config/env.js";
const port = PORT;

// fastify
import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

// swagger
import { swaggerConfig, swaggerUiConfig } from "./config/swaggerConfig.js";
import { corsConfig } from "./config/corsConfig.js";

// router
import serviceRouter from "./routes/serviceRouter.js";

// instância do fastify
const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss",
        ignore: "hostname",
        colorize: false,
        destination: "logs/server.log",
        mkdir: true,
      },
    },
  },
});

// plugins
await fastify.register(cors, corsConfig);
await fastify.register(fastifySwagger, swaggerConfig(port));
await fastify.register(fastifySwaggerUi, swaggerUiConfig);

// hooks
fastify.setErrorHandler((error, request, reply) => {
  // Obtém o código de status ou define como 500 por padrão
  var { code, message, ok, api, validation = false } = error;

  // Loga o erro em ambiente de desenvolvimento
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "dev"
  ) {
    console.log("Error details:", error);
  }

  // Formata resposta de erro de forma padronizada
  var errorResponse = {};

  // Se for erro de validação, adiciona detalhes
  if (validation) {
    code = 400;
    errorResponse = {
      ok: false,
      validation: validation,
      message: "Confira o corpo da requisição e tente novamente",
      api: api || "Services",
    };
  } else {
    if (typeof code === "string") code = 500;
    errorResponse = {
      ok: ok || false,
      validation: false,
      message: message || "Internal Server Error",
      api: api || "Services",
    };
  }

  fastify.log.warn(`Error details: `);
  fastify.log.error(errorResponse);

  // Envia resposta com o código de status apropriado
  reply
    .code(code || 500)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(errorResponse);
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
