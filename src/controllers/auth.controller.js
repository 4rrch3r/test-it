const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
const apiError = require("../utils/apiError.js");
const User = require("../models/index.js").User;

const register = async (req, res, next) => {
  try {
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.password 
    ) {
      throw new apiError(400, "Name,email and password are required");
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role:req.body.role,
    });
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (err) {
    return next(err);
  }
};

const login = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      throw new apiError(400, "Email,password required");
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new apiError(404, "User was not found");
  }
  const isPasswordCorrect = await bcryptjs.compare(
    req.body.password,
    user.password,
  );
  if (!isPasswordCorrect) {
      throw new apiError(401, "Password is incorrect");
  }
  const payload = {
    id: user.id,
    name: user.name,
    role:user.role
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return res.cookie("access_token", token, {httpOnly: true,}).status(200).json({ message: "login success" });
  } catch (err) {
    return next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    return res.status(200).json({ message: "Logout success" });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  register,
  login,
  logout,
};
