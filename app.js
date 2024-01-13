const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
// import File
const connectDB = require("./config/db");
const authRoutes = require("./api/routes/authRoutes");
const AdminRoute = require("./api/routes/AdminRoute");
const courseRoutes = require("./api/routes/courseRoutes");
const blogRoutes = require("./api/routes/blogRoutes");
const UserRoutes = require("./api/routes/UserRoute");
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
app.use("/api/admin", AdminRoute);
app.use("/api/admin", courseRoutes);
app.use("/api/admin", blogRoutes);
app.use("/api/user", UserRoutes);
// Select a port
const PORT = process.env.PORT || 3000;
// Start server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

module.exports = app;
