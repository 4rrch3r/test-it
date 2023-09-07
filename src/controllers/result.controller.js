const apiError = require("../utils/apiError.js");
const resultModel = require('../models/index.js').Result;

const getResults = async (req, res, next) => {
  try {
    const results = await resultModel.find({});
    return res.status(200).json(results);
  } catch (err) {
    return next(err);
  }
};

const getResult = async (req, res, next) => {
  try {
    const result = await resultModel.findById(req.params.id).exec();
    if (!result) {
      throw new apiError(404, "Result was not found");
    }
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};

const postResult = async (req, res, next) => {
  try {
    const newResult = new resultModel({
      test: req.body.test,
      user: req.body.user,
      score: req.body.score,
      timestamp: req.body.timestamp,
    });
    const savedResult = await newResult.save();
    return res.status(201).json(savedResult);
  } catch (err) {
    return next(err);
  }
};

const putResult = async (req, res, next) => {
    try {
      const result = await resultModel.findById(req.params.id).exec();
      if (!result) {
        throw new apiError(404, "Result was not found");
      }
      const updatedResult = await resultModel.findByIdAndUpdate(
        req.params.id,
        {
          test: req.body.test,
          user: req.body.user,
          score: req.body.score,
          timestamp: req.body.timestamp,
        },
        { new: true }
      );
      return res.status(200).json(updatedResult);
    } catch (err) {
      return next(err);
    }
  };

  const deleteResult = async (req, res, next) => {
    try {
      const result = await resultModel.findById(req.params.id).exec();
      if (!result) {
        throw new apiError(404, "Result was not found");
      }
      await resultModel.findByIdAndDelete(req.params.id);
      return res.status(200).json("Result deleted");
    } catch (err) {
      return next(err);
    }
  };

module.exports = {
    getResults,
    getResult,
    postResult,
    putResult,
    deleteResult
};
