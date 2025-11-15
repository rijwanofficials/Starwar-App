const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const otpSchema = new Schema(
    {
        email: { type: String, required: true },
        otp: { type: Number, required: true },
        expiresAt: { type: Date, required: true },
    },
    { timestamps: true }
);

const OtpModel = model("Otp", otpSchema); // Use a clear variable name
module.exports = OtpModel;
