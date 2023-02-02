const db = require("../config");

const findOne = (id) => {
  return db
    .promise()
    .query("SELECT * FROM user WHERE id = ? ;", [id])
    .then(([res]) => res);
};

const findAll = () => {
  return db
    .promise()
    .query("SELECT * FROM user ;")
    .then(([res]) => res);
};

const findByUsername = (username) => {
  return db
    .promise()
    .query("SELECT * FROM user WHERE username = ? ;", [username])
    .then(([res]) => res);
};

const createOne = (userInfo) => {
  return db
    .promise()
    .query("INSERT INTO user SET ? ;", [userInfo])
    .then(([res]) => res);
};

const updateOne = (userInfo, id) => {
  return db
    .promise()
    .query("UPDATE user SET ? WHERE id = ? ;", [userInfo, id])
    .then(([res]) => res);
};

const updateOneSocket = (userInfo, id) => {
  return db
    .promise()
    .query("UPDATE user SET ? WHERE socket_id = ? ;", [userInfo, id])
    .then(([res]) => res);
};

const deleteOne = (id) => {
  return db
    .promise()
    .query("DELETE FROM user WHERE id = ? ;", [id])
    .then(([res]) => res);
};

module.exports = {
  findOne,
  findAll,
  findByUsername,
  createOne,
  updateOne,
  updateOneSocket,
  deleteOne,
};
