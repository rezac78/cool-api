const express = require("express");
const { port } = require("./config");

const app = express();

// Middleware setup
app.use(express.json());

// Define a root route
app.get("/", (req, res) => {
  res.send("Hello World from Express.js");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
