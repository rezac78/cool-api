const express = require("express");
const dotEnv = require("dotenv");
const connectDB = require('./config/db');

//* Load Config
dotEnv.config({ path: "./config/config.env" });

// Connect to MongoDB
connectDB();

const app = express();

// Middleware setup
app.use(express.json());

// Define a root route
app.get("/", (req, res) => {
  res.send("Hello World from Express.js");
});

//* Select a port
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

module.exports = app;
