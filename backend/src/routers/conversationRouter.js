const express = require("express");
const convController = require("../controllers/conversationController");

const conversationRouter = express.Router();

conversationRouter.get("/:id", convController.getAll);
conversationRouter.get("/one/:id", convController.getOne);
conversationRouter.post("/", convController.postOne);
conversationRouter.delete("/:id", convController.deleteOne);

module.exports = conversationRouter;
