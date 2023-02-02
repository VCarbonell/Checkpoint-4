const userModel = require("../models/userModel");

const userController = {
  getAll: (req, res, next) => {
    userModel
      .findAll()
      .then((users) => res.send(users))
      .catch((err) => next(err));
  },

  getOne: (req, res, next) => {
    const { id } = req.params;
    userModel
      .findAll(id)
      .then((users) => res.send(users))
      .catch((err) => next(err));
  },

  postOne: (req, res, next) => {
    const userInfo = req.body;
    const path = `/userPictures/${req.file.filename}`;
    userInfo.photo = path;
    userModel
      .createOne(userInfo)
      .then((result) => res.status(201).send({ id: result.insertId, userInfo }))
      .catch((err) => next(err));
  },

  login: (req, res, next) => {
    const { username } = req.body;
    userModel
      .findByUsername(username)
      .then((result) => {
        if (result.length === 0) {
          return res.status(401).send("User not found");
        }
        [req.user] = result;
        return next();
      })
      .catch((err) => next(err));
  },

  putOne: (req, res, next) => {
    const userInfo = req.body;
    const { id } = req.params;
    if (res) {
      return userModel
        .updateOne(userInfo, id)
        .then((result) => {
          if (result.affectedRows !== 1) {
            return res.status(404).send(`User ${id} not found`);
          }
          return res
            .status(200)
            .send({ message: `User ${id} modified`, userInfo });
        })
        .catch((err) => next(err));
    }
    if (!id) {
      const { socketID } = req.id;
      return userModel
        .updateOneSocket(userInfo, socketID)
        .then((ress) => ress)
        .catch((err) => console.error(err));
    }
    return userModel
      .updateOne(userInfo, id)
      .then((ret) => ret)
      .catch((err) => console.error(err));
  },

  deleteOne: (req, res, next) => {
    const { id } = req.params;
    userModel
      .deleteOne(id)
      .then((result) => {
        if (result.affectedRows !== 1) {
          return res.status(404).send(`User ${id} not found`);
        }
        return res.status(200).send(`User ${id} deleted`);
      })
      .catch((err) => next(err));
  },
};

module.exports = userController;
