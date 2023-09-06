const mongoose = require("mongoose");
const toJSON = require("../utils/toJson");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name of the user is required"],
  },
  email: {
    type: String,
    required: [true, "Email of the user is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password of the user is required"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

toJSON(userSchema);

module.exports = mongoose.model("users", userSchema);