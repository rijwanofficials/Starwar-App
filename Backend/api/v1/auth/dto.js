const OtpModel = require("../../../models/otpSchema");

const usersignupValidator = async (req, res, next) => {
    try {
        console.log("--Inside usersignupValidator--");
        let { otp, name, password, otpId } = req.body;
        console.log("Inside usersignupValidator", otp, name, password, otpId);
        name = name?.trim();
        password = password?.trim();
        otp = otp?.trim();
        if (!name || !password || !otp || !otpId) {
            return res.status(400).json({
                isSuccess: false,
                message: "Name, password, OTP, and OTP ID are required.",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                isSuccess: false,
                message: "Password must be at least 6 characters long.",
            });
        }
        const otpRecord = await OtpModel.findById(otpId);
        if (!otpRecord) {
            return res.status(400).json({
                isSuccess: false,
                message: "Invalid OTP ID.",
            });
        }

        const email = otpRecord.email?.trim().toLowerCase();
        console.log("Email extracted in usersignupValidator:", email);
        req.body = {
            name,
            password,
            otp,
            otpId,
            email, 
        };

        next();

    } catch (err) {
        console.error("❌ Error in usersignupValidator:", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
        });
    }
};

const userloginValidator = (req, res, next) => {
    try {
        console.log("--Inside userloginValidator--");
        let { email, password } = req.body;

        email = email?.trim();
        password = password?.trim();

        if (!email || !password) {
            return res.status(400).json({
                isSuccess: false,
                message: "Email and password are required.",
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                isSuccess: false,
                message: "Invalid email format.",
            });
        }
        req.body = { email, password };
        next();
    } catch (err) {
        console.error("❌ Error in userloginValidator:", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = { usersignupValidator, userloginValidator };
