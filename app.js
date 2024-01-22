const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const redis = require("redis");
const cookieParser = require('cookie-parser');
// import File
const connectDB = require("./config/db");
const authRoutes = require("./api/routes/authRoutes");
const adminRoutes = require("./api/routes/AdminRoute");
const courseRoutes = require("./api/routes/courseRoutes");
const blogRoutes = require("./api/routes/blogRoutes");
const userRoutes = require("./api/routes/UserRoute");

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

// Create a Redis client
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || "cool-api-75mo.onrender.com", // Replace with your Redis server host
  port: process.env.REDIS_PORT || 6379, // Replace with your Redis server port
});

// Load Config
dotEnv.config({ path: "./config/config.env" });

// Connect to MongoDB
connectDB();

// Start Express
const app = express();

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Middleware setup
app.use(express.json());
const corsOptions = {
  origin: 'https://cool-api-75mo.onrender.com', 
  credentials: true, 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

// Define a root route
app.get("/", (req, res) => {
  res.send("Hello World from Express.js");
});
app.use(cookieParser());
app.use(limiter);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Set various HTTP headers for security
app.use(helmet());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes); // Admin-related routes
app.use("/api/courses", courseRoutes); // Course-related routes
app.use("/api/blog", blogRoutes); // Blog-related routes
app.use("/api/user", userRoutes); // User-related routes

// Select a port
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

module.exports = app;
