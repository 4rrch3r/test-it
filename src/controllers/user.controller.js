const apiError = require("../utils/apiError.js");
const userModel = require("../models/index.js").User;
const bcryptjs = require("bcrypt");

const getUsers = async (req, res, next) => {
  try {
    const users = await userModel.find({});
    return res.status(200).json(users);
  } catch (err) {
    return next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    let user;
    if (
      (req.user.role == "user" && req.user.id == req.params.id) ||
      req.user.role == "admin"
    ) {
      user = await userModel.findById(req.params.id).exec();
    }
    if (!user) {
      throw new apiError(404, "User was not found");
    }
    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
};

const postUser = async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
      throw new apiError(400, "Name,email and password are required");
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);
    const newUser = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    });
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (err) {
    return next(err);
  }
};

const putUser = async (req, res, next) => {
  try {
    let user;
    if (
      (req.user.role == "user" && req.user.id == req.params.id) ||
      req.user.role == "admin"
    ) {
      user = await userModel.findById(req.params.id).exec();
    }
    if (!user) {
      throw new apiError(404, "User was not found");
    }
    if (!req.body.name || !req.body.email || !req.body.password) {
      throw new apiError(400, "Name,email and password are required");
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
      },
      { new: true }
    );
    return res.status(200).json(updatedUser);
  } catch (err) {
    return next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id).exec();
    if (!user) {
      throw new apiError(404, "User was not found");
    }
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).json("User deleted");
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
};
