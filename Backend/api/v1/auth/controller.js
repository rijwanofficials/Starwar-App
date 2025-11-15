const { UserModel } = require("../../../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Helper: Generate JWT
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

// ------------------ SIGNUP ------------------
const usersignupController = async (req, res) => {
    try {
        let { name, email, password } = req.body;

        name = name?.trim();
        email = email?.trim().toLowerCase();
        password = password?.trim();

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                isSuccess: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({ name, email, password: hashedPassword });
        const token = generateToken(newUser);

        res.cookie("authorization", token, {
            httpOnly: true,
            secure: false, // HTTPS only in prod
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            isSuccess: true,
            message: "User registered successfully",
            user: { id: newUser._id, name: newUser.name, email: newUser.email },
        });
    } catch (err) {
        console.error("❌ Error in usersignupController:", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
        });
    }
};



// ------------------ LOGIN ------------------
const userloginController = async (req, res) => {
    try {
        let { email, password } = req.body;

        email = email?.trim().toLowerCase();
        password = password?.trim();

        console.log("Login body received:", { email, password });

        // Find user (case-insensitive email)
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                isSuccess: false,
                message: "User not found",
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isMatch);

        if (!isMatch) {
            return res.status(400).json({
                isSuccess: false,
                message: "Invalid password",
            });
        }

        // Generate JWT token
        const token = generateToken(user);

        // Set cookie
        res.cookie("authorization", token, {
            httpOnly: true,
            secure: false, // HTTPS only in production
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            isSuccess: true,
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        console.error("❌ Error in userloginController:", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
        });
    }
};



// ------------------ LOGOUT ------------------

const userlogoutController = (req, res) => {
    try {
        res.clearCookie('authorization', {
            httpOnly: true,
            secure: false, // HTTPS only in production
            sameSite: "None",
            path: "/"
        });

        return res.status(200).json({
            isSuccess: true,
            message: "Logged out successfully.",
        });
    } catch (err) {
        console.error("❌ Logout error:", err.message);
        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
        });
    }
};



module.exports = {
    usersignupController,
    userloginController,
    userlogoutController,
};
