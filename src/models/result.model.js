const mongoose = require("mongoose");
const toJSON = require("../utils/toJson");
const Schema = mongoose.Schema;

const resultSchema = new Schema({
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    required: [true, "Test id is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User id is required"],
  },
  score: {
    type: Number,
    required: [true, "Score of the test is required"],
    min:0
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

toJSON(resultSchema);

module.exports = mongoose.model("results", resultSchema);
