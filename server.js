const fastify = require("fastify");
const fastifyCors = require("@fastify/cors");
const fastifySwagger = require("@fastify/swagger");
const fastifySwaggerUi = require("@fastify/swagger-ui");
const router = require("./routes/router");

const port = 8003;
const app = fastify();

app.register(fastifyCors);

app.register(fastifySwagger, {
  openapi: {
    openapi: "3.0.0",
    components: {
      securitySchemes: {
        APIKey: {
          type: "apiKey",
          in: "header",
          name: "x-api-key",
          description: "Use a chave de API no cabeçalho como 'x-api-key'",
        },
      },
    },
    info: {
      title: "Test swagger",
      description: "API principal de consumo de microserviços",
      version: "2.0.0",
    },
    servers: [
      {
        url: `http://192.168.16.13:${port}`,
        description: "Development server",
      },
      {
        url: `http://192.168.16.80:${port}`,
        description: "prodution server",
      },
    ],
  },
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
  exposeRoute: true,
});

app.setErrorHandler((error, request, reply) => {

  const statusCode = error.status || 500;
  let messageError =
    error.response?.data.message || error.message || "Erro desconhecido";
  // Verifica o tipo de erro e responde com o status adequado
  switch (statusCode) {
    case 400:
      reply.status(statusCode).send({
        statusCode: statusCode,
        error: "Server Error",
        message: "Bad Request " + messageError,
      });
      break;
    case 401:
      reply.status(statusCode).send({
        statusCode: statusCode,
        error: "Server Error",
        message: "Unauthorized " + messageError,
      });
      break;
    case 403:
      reply.status(statusCode).send({
        statusCode: statusCode,
        error: "Server Error",
        message: "Forbidden " + messageError,
      });
      break;
    case 404:
      reply.status(statusCode).send({
        statusCode: statusCode,
        error: "Server Error",
        message: "Not found " + messageError,
      });
      break;
    case 500:
      reply.status(statusCode).send({
        statusCode: statusCode,
        error: "Server Error",
        message: "Internal server error " + messageError,
      });
      break;
    default:
      reply.status(statusCode).send({
        statusCode: statusCode,
        error: "Server Error",
        message: "Internal server error " + messageError,
      });
  }
});

app.register(router);


const start = () => {
  try {
    app.listen({ port, host: "0.0.0.0" });
    console.log(`aplicação rodando na porta ${port}`);
  } catch (error) {
    console.log(`erro ao iniciar o servidor ${error}`);
  }
};

start();
