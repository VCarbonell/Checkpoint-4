const convModel = require("../models/conversationModel");

const conversationController = {
  getAll: (req, res, next) => {
    const { id } = req.params;
    convModel
      .findAll(id)
      .then((result) => res.send(result))
      .catch((err) => next(err));
  },

  getOne: (req, res, next) => {
    const { id } = req.params;
    const { user } = req.query;
    convModel
      .findOne(id, user)
      .then((result) => res.send(result))
      .catch((err) => next(err));
  },

  postOne: (req, res, next) => {
    const convInfo = req.body;
    convModel
      .createOne()
      .then((result) => res.status(201).send({ id: result.insertId, convInfo }))
      .catch((err) => next(err));
  },

  deleteOne: (req, res, next) => {
    const { id } = req.params;
    convModel
      .deleteOne(id)
      .then((result) => {
        if (result.affectedRows !== 1) {
          return res.status(404).send(`Conversation ${id} not found`);
        }
        return res.status(200).send(`Conversation ${id} deleted`);
      })
      .catch((err) => next(err));
  },
};

module.exports = conversationController;
