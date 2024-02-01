const rateLimit = require("express-rate-limit");
// Configure the rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
module.exports = limiter;
