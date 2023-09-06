const mongoose = require("mongoose");
const toJSON = require("../utils/toJson");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  questionText: {
    type: String,
    required: [true, "Question of the test is required"],
  },
  answerOptions: [
    {
      type: String,
      required: [true, "Answers of the test are required"],
    },
  ],
  correctAnswer: {
    type: String,
    required: [true, "Correct answer of the test is required"],
  },
});

const testSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title of the test is required"],
  },
  description: {
    type: String,
    required: [true, "Description of the test is required"],
  },
  questions: [questionSchema],
});

toJSON(questionSchema);
toJSON(testSchema);

module.exports = mongoose.model("tests", testSchema);
