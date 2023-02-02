const express = require("express");
const multer = require("multer");
const userController = require("../controllers/userController");
const { verifyPassword, hashPassword } = require("../middlewares/auth");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "../frontend/public/userPictures");
  },
  filename: (req, file, callBack) => {
    const ext = file.mimetype.split("/")[1];
    const fileName = file.originalname.substring(
      0,
      file.originalname.lastIndexOf(".")
    );
    callBack(null, `${fileName}-${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage });

const userRouter = express.Router();

userRouter.get("/", userController.getAll);
userRouter.get("/:id", userController.getOne);
userRouter.post(
  "/",
  upload.single("userPicture"),
  hashPassword,
  userController.postOne
);
userRouter.post("/login", userController.login, verifyPassword);
userRouter.put("/:id", userController.putOne);
userRouter.delete("/:id", userController.deleteOne);

module.exports = userRouter;
