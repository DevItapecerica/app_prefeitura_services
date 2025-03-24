const fastify = require("fastify");
const fastifyCors = require("@fastify/cors");
const fastifySwagger = require("@fastify/swagger");
const fastifySwaggerUi = require("@fastify/swagger-ui");
const serviceRouter = require("./routes/serviceRouter");
const {swaggerConfig, swaggerUiConfig} = require('./config/swaggerConfig');
const { corsConfig } = require("./config/corsConfig");


const port = process.env.APPLICATION_PORT || 8003;
const app = fastify();

app.register(fastifyCors, corsConfig);

app.register(fastifySwagger, swaggerConfig(port));
app.register(fastifySwaggerUi, swaggerUiConfig);

app.setErrorHandler((error, request, reply) => {
  const statusCode = error.status || error.statusCode || 500;
  console.log(error)
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

app.register(serviceRouter);

const start = () => {
  try {
    app.listen({ port, host: "0.0.0.0" });
    console.log(`aplicação rodando na porta ${port}`);
  } catch (error) {
    console.log(`erro ao iniciar o servidor ${error}`);
  }
};

start();
