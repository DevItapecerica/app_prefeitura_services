import { Op } from "sequelize";
import DbService from "../db/model/serviceModel.js";

export const getAll = async () => {
  return await DbService.findAll();
};

export const getOne = async (id) => {
  return await DbService.findOne({ where: { id } });
};

export const create = async (service) => {
  const newService = await DbService.create(service);
  console.log("Serviço criado:", newService);
  return newService;
};

export const deleteOne = async (id) => {
  const deletedCount = await DbService.destroy({ where: { id } });
  return deletedCount;
};

export const update = async (id, service) => {
  const [updatedCount] = await DbService.update(service, { where: { id } });
  return updatedCount;
};
