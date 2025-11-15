const express = require('express');
const userRouter = require('./user/routes');
const authRouter = require('./auth/routes');
const { otpRouter } = require('./otp/routes');
const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/otp", otpRouter);
apiRouter.use("/user", userRouter);

module.exports = apiRouter;