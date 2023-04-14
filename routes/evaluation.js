const express = require("express");
const router = express.Router();
const Evaluation = require("../models/Evaluation");
const Answer = require("../models/Answer");
const User = require("../models/User");
const checkTeacher = require("../middlewares/checkTeacher");
const requireAuth = require("../middlewares/requireAuth");

router.post("/newevaluation", async (req, res, next) => {
  const answerArray = req.body;
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
  Evaluation.find({ userId: req.session.currentUser._id })
    .populate({
      path: "answerList",
      populate: { path: "questionId" },
    })
    .then((evaluations) => {
      res.status(200).json(evaluations);
    })
    .catch(next);
});

//fetch one eval for one student
router.get("/:id", requireAuth, (req, res, next) => {
  Evaluation.findById(req.params.id)
    .populate({
      path: "answerList",
      populate: { path: "questionId" },
    })
    .then((evaluation) => {
      console.log(
        "*****************",
        evaluation.userId,
        req.session.currentUser._id
      );

      // res.status(200).json(evaluation);
      if (evaluation.userId.toString() === req.session.currentUser._id) {
        console.log("pzefij");
        res.status(200).json(evaluation);
      } else {
        res.status(401).json({ message: "Unauthorized - Wrong student id" });
      }
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
