const apiError = require("../utils/apiError.js");
const testModel = require("../models/index.js").Test;

const getTests = async (req, res, next) => {
  try {
    const tests = await testModel.find({});
    return res.status(200).json(tests);
  } catch (err) {
    return next(err);
  }
};

const getTest = async (req, res, next) => {
  try {
    const test = await testModel.findById(req.params.id).exec();
    if (!test) {
      throw new apiError(404, "Test was not found");
    }
    return res.status(200).json(test);
  } catch (err) {
    return next(err);
  }
};

const postTest = async (req, res, next) => {
  try {
    const newTest = new testModel({
      title: req.body.title,
      description: req.body.description,
      questions: req.body.questions,
    });
    const savedTest = await newTest.save();
    return res.status(201).json(savedTest);
  } catch (err) {
    return next(err);
  }
};

const putTest = async (req, res, next) => {
  try {
    const test = await testModel.findById(req.params.id).exec();
    if (!test) {
      throw new apiError(404, "Test was not found");
    }
    const updatedTest = await testModel.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        questions: req.body.questions,
      },
      { new: true }
    );
    return res.status(200).json(updatedTest);
  } catch (err) {
    return next(err);
  }
};

const deleteTest = async (req, res, next) => {
  try {
    const test = await testModel.findById(req.params.id).exec();
    if (!test) {
      throw new apiError(404, "Test was not found");
    }
    await testModel.findByIdAndDelete(req.params.id);
    return res.status(200).json("Test deleted");
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getTests,
  getTest,
  postTest,
  putTest,
  deleteTest,
};
