const jwt = require("jsonwebtoken");

const validateTokenMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.authorization;

        if (!token) {
            return res.status(401).json({
                isSuccess: false,
                message: "No token provided",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error("Token validation error:", err.message);
        return res.status(401).json({
            isSuccess: false,
            message: "Invalid or expired token.",
        });
    }
};

module.exports = { validateTokenMiddleware };
