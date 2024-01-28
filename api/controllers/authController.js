const jwt = require("jsonwebtoken");
const User = require("../models/User");
const xssFilters = require("xss-filters");

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

exports.register = async (req, res) => {
  try {
    const email = xssFilters.inHTMLData(req.body.email);
    const username = xssFilters.inHTMLData(req.body.username);
    const existingUser = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email or username already exists",
      });
    }
    const sanitizedUserData = {
      ...req.body,
      email,
      username,
    };
    const user = await User.create(sanitizedUserData);
    const token = generateToken(user);
    res.status(201).json({
      success: true,
      message: "User successfully created",
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.login = async (req, res) => {
  const email = xssFilters.inHTMLData(req.body.email);
  const password = xssFilters.inHTMLData(req.body.password);
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Such a user has not been registered.",
      });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Email or password is incorrect." });
    }
    const token = generateToken(user);
    res.status(200).json({
      success: true,
      message: "welcome",
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.json({ success: true, message: "Logged out successfully" });
};