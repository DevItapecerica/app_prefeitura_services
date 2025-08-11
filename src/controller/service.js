import { Op } from "sequelize";
import DbService from "../db/model/serviceModel.js";

export const getAll = async () => {
  try {
    return await DbService.findAll();
  } catch (error) {
    console.error("Erro ao buscar todos os serviços:", error);
    throw error;
  }
};

export const getOne = async (id) => {
  try {
    return await DbService.findOne({ where: { id } });
  } catch (error) {
    console.error(`Erro ao buscar serviço com ID ${id}:`, error);
    throw error;
  }
};

export const create = async (service) => {
  try {
    const newService = await DbService.create(service);
    console.log("Serviço criado:", newService);
    return newService;
  } catch (error) {
    console.error("Erro ao criar serviço:", error);
    throw error;
  }
};

export const deleteOne = async (id) => {
  try {
    const deletedCount = await DbService.destroy({ where: { id } });
    return deletedCount;
  } catch (error) {
    console.error(`Erro ao deletar serviço com ID ${id}:`, error);
    throw error;
  }
};

export const update = async (id, service) => {
  try {
    const [updatedCount] = await DbService.update(service, { where: { id } });
    return updatedCount;
  } catch (error) {
    console.error(`Erro ao atualizar serviço com ID ${id}:`, error);
    throw error;
  }
};
