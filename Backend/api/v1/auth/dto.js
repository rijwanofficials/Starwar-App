
const usersignupValidator = (req, res, next) => {
    try {
        console.log("--Inside usersignupValidator--");
        let { name, email, password, otp } = req.body;
        console.log("Inside usersignupValidator",name,email,password,otp);

        name = name?.trim();
        email = email?.trim();
        password = password?.trim();

        if (!name || !email || !password) {
            return res.status(400).json({
                isSuccess: false,
                message: "Name, email, and password are required.",
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                isSuccess: false,
                message: "Invalid email format.",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                isSuccess: false,
                message: "Password must be at least 6 characters long.",
            });
        }
        req.body = { name, email, password, otp };
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

        // sanitized values
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
