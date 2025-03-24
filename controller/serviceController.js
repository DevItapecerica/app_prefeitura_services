const {
  getAll,
  getOne,
  getAllUserService,
  create,
  update,
  deleteOne,
} = require("./service");

const getService = async (request, reply) => {
  try {
    const services = await getAll();

    return reply.status(201).send({ services });
  } catch (error) {
    throw error;
  }
};

const getOneService = async (request, reply) => {
  try {
    id = request.params.id;
    const services = await getOne(id);

    return reply.status(201).send({ services });
  } catch (error) {
    throw error;
  }
};

const createService = async (request, reply) => {
  console.log(request.body);
  try {
    const service = await create(request.body.service);

    return reply.status(201).send({ service });
  } catch (error) {
    throw error;
  }
};

const updateService = async (request, reply) => {
  try {
    const id = request.params.id;
    const service = await update(id, request.body.service);
    if (service > 0) {
      return reply.status(201).send("Service updated successfully");
    } else {
      error = new Error();
      error.status = 404;
      error.message = "Service not updated";
      throw error;
    }
  } catch (error) {
    throw error;
  }
};

const deleteService = async (request, reply) => {
  try {
    const id = request.params.id;

    if (id <= 3) {
      let error = new Error();
      error.status = 403;
      error.message = "Não é possível deletar esse serviço";
      throw error;
    }

    await deleteOne(id);
    return reply.status(200).send("Service deleted successfully");
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getService,
  getOneService,
  createService,
  updateService,
  deleteService,
};
