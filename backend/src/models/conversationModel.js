const db = require("../config");

const findAll = (id) => {
  return db
    .promise()
    .query(
      `SELECT conversation.*, username, user.id as userID, active_conversation, photo, isConnected, lastConnexion FROM conversation
      JOIN user  ON user.id=user_one_id AND user.id != ? OR user.id=user_two_id AND user.id != ?
      WHERE user_one_id = ? OR user_two_id = ? ;`,
      [id, id, id, id]
    )
    .then(([res]) => res);
};

const findOne = (id, user) => {
  return db
    .promise()
    .query(
      `SELECT conversation.*, username, user.id as userID, active_conversation, photo, isConnected, lastConnexion FROM conversation
      JOIN user  ON user.id=user_one_id AND user.id != ? OR user.id=user_two_id AND user.id != ?
      WHERE conversation.id = ?`,
      [user, user, id]
    )
    .then(([res]) => res);
};

const createOne = (users) => {
  return db
    .promise()
    .query("INSERT INTO conversation SET ? ;", [users])
    .then(([res]) => res);
};

const deleteOne = (id) => {
  return db
    .promise()
    .query("DELETE FROM conversation WHERE id = ? ;", [id])
    .then(([res]) => res);
};

module.exports = {
  findAll,
  findOne,
  createOne,
  deleteOne,
};
