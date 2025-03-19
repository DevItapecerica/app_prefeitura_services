const Services = require("../controller/serviceController");
const auth = require("../middleware/authKey");

const router = (fastify, options) => {
  fastify.route({
    method: "GET",
    url: "/service",
    preHandler: [auth],
    handler: Services.getService,
  });

  fastify.route({
    method: "GET",
    url: "/service/:id",
    preHandler: [auth],
    handler: Services.getOneService,
  });
  fastify.route({
    method: "POST",
    url: "/service/user",
    preHandler: [auth],
    handler: Services.postUserService,
  });
  fastify.route({
    method: "POST",
    url: "/service",
    preHandler: [auth],
    handler: Services.createService,
  });
  fastify.route({
    method: "PUT",
    url: "/service/:id",
    preHandler: [auth],
    handler: Services.updateService,
  });
  fastify.route({
    method: "DELETE",
    url: "/service/:id",
    preHandler: [auth],
    handler: Services.deleteService,
  });
};

module.exports = router;
