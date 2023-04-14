const express = require("express");
const router = express.Router();
const Evaluation = require("../models/Evaluation");
const Answer = require("../models/Answer");
const User = require("../models/User");
const checkTeacher = require("../middlewares/checkTeacher");
const requireAuth = require("../middlewares/requireAuth");

router.post("/newevaluation", async (req, res, next) => {
  const answerArray = JSON.parse(req.body.answerList);
  const answerListWithId = [];

  const createAnswersPromise = new Promise((res, rej) => {
    answerArray.forEach(async (answer) => {
      const newAnswer = {
        questionId: answer.questionId,
        repartition: answer.repartition,
        reponse: answer.reponse,
      };
      const createdAnswer = await Answer.create(newAnswer);
      answerListWithId.push(createdAnswer.id);

      if (answerArray.length === answerListWithId.length) {
        res();
      }
    });
  });

  await createAnswersPromise;

  //create evaluation data
  const newEvaluation = {
    answerList: answerListWithId,
    userId: req.session.currentUser._id,
  };
  const createdEvaluation = await Evaluation.create(newEvaluation);
  res.status(201).json(createdEvaluation);
});

//fetch all eval for one student
router.get("/allevaluation", requireAuth, (req, res, next) => {
  Evaluation.find({ userId: req.session.currentUser._id }).populate({
    path: "answerList",
    populate: { path: "questionId" },
  })
    .then((evaluations) => {
      res.status(200).json(evaluations);
    })
    .catch(next);
});

//fetch all eval for teacher
router.get("/allevaluations", checkTeacher, (req, res, next) => {
  Evaluation.find()
    .then((evaluations) => {
      res.status(200).json(evaluations);
    })
    .catch(next);
});

module.exports = router;
