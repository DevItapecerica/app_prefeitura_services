import {
  getAll,
  getOne,
  // getAllUserService,
  create,
  update,
  deleteOne,
} from "./service.js";

export default class Services {
  static getService = async (request, reply) => {
    try {
      const services = await getAll();
      return reply.status(200).send({ services });
    } catch (error) {
      throw error;
    }
  };

  static getOneService = async (request, reply) => {
    try {
      const id = parseInt(request.params.id);
      const service = await getOne(id);
      return reply.status(200).send({ service });
    } catch (error) {
      throw error;
    }
  };

  static createService = async (request, reply) => {
    try {
      const service = await create(request.body.service);
      return reply.status(201).send({ service });
    } catch (error) {
      throw error;
    }
  };

  static updateService = async (request, reply) => {
    try {
      const id = parseInt(request.params.id);
      await update(id, request.body.service);
      reply.status(204).send();
    } catch (error) {
      throw error;
    }
  };

  static deleteService = async (request, reply) => {
    try {
      const id = parseInt(request.params.id);

      if (id <= 3) {
        const error = new Error("Não é possível deletar esse serviço");
        error.status = 403;
        throw error;
      }

      const deletedCount = await deleteOne(id);

      if (deletedCount < 1) {
        throw { status: 404, message: "Serviço não encontrado" };
      }

      reply.status(204).send();
    } catch (error) {
      throw error;
    }
  };
}
