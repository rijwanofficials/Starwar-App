const OtpModel = require("../../../models/otpSchema");

const validateOtpMiddleware = async (req, res, next) => {
    try {
        console.log("---Inside validateOtpMiddleware---");
        let { otp, name, password, email } = req.body;
        console.log("Data from body:", otp, name, password, email);

        if (!email) {
            return res.status(400).json({
                isSuccess: false,
                message: "Email is required",
            });
        }
        if (!otp) {
            return res.status(400).json({
                isSuccess: false,
                message: "OTP is required",
            });
        }

        otp = otp.toString();
        console.log("Validating OTP for:", email, otp);
        const otpRecord = await OtpModel.findOne({ email }).sort({ createdAt: -1 });
        if (!otpRecord) {
            return res.status(400).json({
                isSuccess: false,
                message: "OTP not found. Please request a new one.",
            });
        }

        console.log("OTP record from DB:", otpRecord.otp);

        if (otpRecord.expiresAt < Date.now()) {
            await otpRecord.deleteOne();
            return res.status(400).json({
                isSuccess: false,
                message: "OTP expired. Please request a new one.",
            });
        }

        if (otpRecord.otp.toString() !== otp) {
            console.log("OTP mismatch!");
            return res.status(400).json({
                isSuccess: false,
                message: "Invalid OTP. Try again.",
            });
        }
        await otpRecord.deleteOne();
        console.log(`✅ OTP verified for ${email}`);

        next();
    } catch (err) {
        console.error("❌ Error in validateOtpMiddleware:", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = { validateOtpMiddleware };
