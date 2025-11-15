const express = require("express");
const { validateTokenMiddleware } = require("../middleware/validateTokenMiddleware");
const { getProfileController } = require("./controller");
const userRouter = express.Router();

userRouter.get("/profile", validateTokenMiddleware, getProfileController);

module.exports = userRouter;