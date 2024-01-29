const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.optionalAuth = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    console.log("token", token);
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded", decoded);
      req.user = await User.findById(decoded.id);
      console.log("req.user", req.user);
    } catch (error) {
      console.error("Error verifying token:", error);
    }
  }
  next();
};