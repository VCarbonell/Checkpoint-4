const db = require("../config");

const findAll = (id) => {
  return db
    .promise()
    .query(
      `SELECT *, message.id as messageID
    FROM message 
    JOIN conversation ON conversation.id=conversation_id
    WHERE conversation_id = ? ORDER BY message.id DESC;`,
      [id]
    )
    .then(([res]) => res);
};

const createOne = (messageInfo) => {
  return db
    .promise()
    .query("INSERT INTO message SET ? ;", [messageInfo])
    .then(([res]) => res);
};

const updateOne = (messageInfo, id) => {
  return db
    .promise()
    .query("UPDATE message SET ? WHERE id = ? ;", [messageInfo, id])
    .then(([res]) => res);
};

const updateAllByConv = (messageInfo, id, user) => {
  return db
    .promise()
    .query("UPDATE message SET ? WHERE conversation_id = ? AND user_id = ?;", [
      messageInfo,
      id,
      user,
    ])
    .then(([res]) => res);
};

const deleteOne = (id) => {
  return db
    .promise()
    .query("DELETE FROM message WHERE id = ? ;", [id])
    .then(([res]) => res);
};

module.exports = {
  findAll,
  createOne,
  updateOne,
  updateAllByConv,
  deleteOne,
};
