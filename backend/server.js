const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

const authRoutes = require("./routes/authRoutes");

const projectRoutes = require("./routes/projectRoutes");

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

//Connect Routes in Server
app.use("/api/auth", authRoutes);

//Connect Project Routes
app.use("/api/projects", projectRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("AI Work Manager API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});