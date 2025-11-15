const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890', 6);
const OtpModel = require("../../../models/otpSchema");
const { sendOtpEmail } = require("../../../utils/emailHelper");

const sendOtpController = async (req, res) => {
    try {
        console.log("---Inside sendOtpController---");
        const { email } = req.body;
        if (!email)
            return res.status(400).json({
                isSuccess: false,
                message: "Email is required",
            });

        const otp = nanoid();
        console.log("Created and saved otp in otp controller",otp );

        await OtpModel.create({
            email,
            otp,
            expiresAt: Date.now() + 10 * 60 * 1000,
        });
        await sendOtpEmail(email, otp);
        console.log(`OTP for ${email}: ${otp}`);
        res.status(200).json({
            isSuccess: true,
            message: "OTP sent to your email",
        });
    } catch (err) {
        console.error("---Error in sendOtpController---", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Failed to send OTP",
        });
    }
};

module.exports = { sendOtpController };
