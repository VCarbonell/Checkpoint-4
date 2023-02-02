const messageModel = require("../models/messageModel");

const messageController = {
  getAll: (req, res, next) => {
    const { id } = req.params;
    messageModel
      .findAll(id)
      .then((result) => res.send(result))
      .catch((err) => next(err));
  },

  postOne: (req, res, next) => {
    const messageInfo = req.body;
    if (res) {
      return messageModel
        .createOne(messageInfo)
        .then((result) =>
          res.status(201).send({ id: result.insertId, messageInfo })
        )
        .catch((err) => next(err));
    }
    return messageModel
      .createOne(messageInfo)
      .then((ress) => ress)
      .catch((err) => console.error(err));
  },

  putOne: (req, res, next) => {
    const messageInfo = req.body;
    const { id } = req.params;
    messageModel
      .updateOne()
      .then((result) => {
        if (result.affectedRows !== 1) {
          return res.status(404).send(`Message ${id} not found`);
        }
        return res
          .status(200)
          .send({ message: `Message ${id} modified`, messageInfo });
      })
      .catch((err) => next(err));
  },

  deleteOne: (req, res, next) => {
    const { id } = req.params;
    messageModel
      .deleteOne(id)
      .then((result) => {
        if (result.affectedRows !== 1) {
          return res.status(404).send(`Message ${id} not found`);
        }
        return res.status(200).send(`Message ${id} deleted`);
      })
      .catch((err) => next(err));
  },
};

module.exports = messageController;
