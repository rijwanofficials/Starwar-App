const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");



const morgan = require("morgan");
require("dotenv").config();

const connectDB = require("./config/db");
const apiRouter = require("./api/v1/routes");

const app = express();

// Database Connection
connectDB();

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: [
        "https://www.rijwan.me",
        "https://rijwan.me",
        "http://localhost:5173"
    ],
    credentials: true,
}));

app.use(express.json());
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => res.send("Hello From Backend"));
app.use("/api/v1", apiRouter);

// Start Server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
