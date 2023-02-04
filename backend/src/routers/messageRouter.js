const express = require("express");
const messageController = require("../controllers/messageController");

const messageRouter = express.Router();

messageRouter.get("/:id", messageController.getAll);
messageRouter.post("/", messageController.postOne);
messageRouter.put("/:id", messageController.putOne);
messageRouter.put("/read/:id", messageController.readAll);
messageRouter.delete("/:id", messageController.deleteOne);

module.exports = messageRouter;
