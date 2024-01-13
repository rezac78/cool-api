const express = require("express");
const dotEnv = require("dotenv");
const cors = require('cors');
const morgan = require("morgan");
// import File
const connectDB = require("./config/db");
const authRoutes = require("./api/routes/authRoutes");
const someAdminRoute = require("./api/routes/someAdminRoute");
// Load Config
dotEnv.config({ path: "./config/config.env" });
// Connect to MongoDB
connectDB();
// start Express
const app = express();
// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// Middleware setup
app.use(express.json());
app.use(cors());
// Define a root route
app.get("/", (req, res) => {
  res.send("Hello World from Express.js");
});
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", someAdminRoute);
// Select a port
const PORT = process.env.PORT || 3000;
// Start server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

module.exports = app;
