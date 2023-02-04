const express = require("express");
const conversationRouter = require("./conversationRouter");
const messageRouter = require("./messageRouter");
const userRouter = require("./userRouter");

const router = express.Router();

router.use("/user", userRouter);
router.use("/conv", conversationRouter);
router.use("/message", messageRouter);

module.exports = router;
