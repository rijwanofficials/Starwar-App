const express = require("express");
const { usersignupValidator, userloginValidator } = require("./dto");
const { usersignupController, userloginController, userlogoutController } = require("./controller");
const { validateOtpMiddleware } = require("../middleware/validateOtpMiddleware");
const authRouter = express.Router();

authRouter.post(
    "/signup",
    usersignupValidator,      
    validateOtpMiddleware,    
    usersignupController    
);
authRouter.post(
    "/login",
    userloginValidator,
    userloginController
);
authRouter.get("/logout", userlogoutController);

module.exports = authRouter;