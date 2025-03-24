// const { getAll, getOne, create, update, deleteOne } = require("./service");
const { Op } = require("sequelize");
const DbService = require("../db/model/serviceModel");

const getAll = () => {
  try {
    let services = DbService.findAll();

    return services;
  } catch (error) {
    throw error;
  }
};

const getOne = (id) => {
  try {
    let services = DbService.findOne({
      where: { id: id },
    });

    return services;
  } catch (error) {
    throw error;
  }
};

const create = (service) => {
  try {
    let newService = DbService.create(service);

    return newService;
  } catch (error) {
    throw error;
  }
};

const deleteOne = (id) => {
  try {
    let service = DbService.destroy({
      where: { id: id },
    });
    return service;
  } catch (error) {
    throw error;
  }
};

const update = (id, service) => {
  try {
    let serviceUpdate = DbService.update(service, {
      where: { id: id },
    });
    return serviceUpdate;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
};
