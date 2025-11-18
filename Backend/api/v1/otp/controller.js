const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890", 6);
const OtpModel = require("../../../models/otpSchema");
const { sendOtpEmail } = require("../../../utils/otpEmail");

const sendOtpController = async (req, res) => {
    try {
        console.log("---Inside sendOtpController---");
        let { email } = req.body;
        if (!email) {
            return res.status(400).json({
                isSuccess: false,
                message: "Email is required",
            });
        }
        email = email.trim().toLowerCase();
        const otp = nanoid();
        console.log("Generated OTP:", otp);
        const otpRecord = await OtpModel.create({
            email,
            otp,
            expiresAt: Date.now() + 10 * 60 * 1000,
        });
        const emailStatus = await sendOtpEmail(email, otp);

        if (!emailStatus.success) {
            console.error("Email sending failed:", emailStatus.message);
            return res.status(500).json({
                isSuccess: false,
                message: "OTP generated but failed to send email",
                error: emailStatus.message,
                details: emailStatus.details || null,
            });
        }
        console.log(`OTP email successfully sent to ${email}`);
        console.log("otpId", otpRecord._id);
        return res.status(200).json({
            isSuccess: true,
            message: "OTP sent to your email",
            otpId: otpRecord._id,
            expiresAt: otpRecord.expiresAt,
        });
    } catch (err) {
        console.error("---Error in sendOtpController---", err.message);
        return res.status(500).json({
            isSuccess: false,
            message: "Server error while sending OTP",
            error: err.message,
        });
    }
};

module.exports = { sendOtpController };
