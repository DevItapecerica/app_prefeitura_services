export const swaggerConfig = (port) => {
  return {
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
        title: "Services Microservice API",
        description: "API principal para o gerenciamento de serviços",
        version: "2.0.0",
      },
      servers: [
        {
          url: `http://189.20.193.253:${port}`,
          description: "Servidor de desenvolvimento",
        },
        {
          url: `http://189.20.193.252:${port}`,
          description: "Servidor de produção",
        },
      ],
    },
  };
};

export const swaggerUiConfig = {
  routePrefix: "/docs",
  exposeRoute: true,
};
