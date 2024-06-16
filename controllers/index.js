const services = require("../services/index.js");

const get = async (req, res, next) => {
  try {
    const result = await services.getAllContacts();
    res.status(200).json({
      status: "succes",
      code: 200,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      code: 404,
    });
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, email, number, favorite } = req.body;
    const result = await services.createContact(name, email, number, favorite);
    res.status(201).json({
      status: "succes",
      code: 201,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      code: 500,
    });
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;
  try {
    const result = await services.updateContact(id, { favorite });
    if (result) {
      res.status(200).json({
        status: "succes",
        code: 200,
        data: result,
      });
    }
  } catch (error) {
    console.log(error);
    res.statu(404).json({
      status: "error",
      code: 404,
    });
  }
};

const deleteData = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await services.deleteContact(id);
    res.status(200).json({
      status: " succes",
      code: 200,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "error",
      code: 404,
    });
  }
};

module.exports = { get, create, update, deleteData };
