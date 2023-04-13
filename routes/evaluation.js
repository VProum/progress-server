const express = require("express");
const router = express.Router();
const Evaluation = require("../models/Evaluation");
const Answer = require("../models/Answer");

router.post("/newevaluation", async (req, res, next) => {
  const answerArray = JSON.parse(req.body.answerList);
  const answerListWithId = [];

  //create a answer data for each answer in evaluation
  // const time = await answerArray.forEach(async (answer) => {
  //   const newAnswer = {
  //     questionId: answer.questionId,
  //     repartition: answer.repartition,
  //     reponse: answer.reponse,
  //   };
  //   const createdAnswer = await Answer.create(newAnswer);
  //   console.log(createdAnswer.id);
  //   answerListWithId.push(createdAnswer.id);
  //   console.log(answerListWithId);
  // });

  const bar = new Promise((res, rej) => {
    answerArray.forEach(async (answer) => {
      const newAnswer = {
        questionId: answer.questionId,
        repartition: answer.repartition,
        reponse: answer.reponse,
      };
      const createdAnswer = await Answer.create(newAnswer);
      console.log(createdAnswer.id);
      answerListWithId.push(createdAnswer.id);
      console.log(answerListWithId);

      if (answerArray.length === answerListWithId.length) {
        res();
      }
    });
  });

  const time = await bar;

  console.log("time ", time);
  console.log("time2 ", req.session.currentUser);

  //create evaluation data
  const newEvaluation = {
    answerList: answerListWithId,
    userId: req.session.currentUser._id,
  };
  console.log(newEvaluation);
  const createdEvaluation = await Evaluation.create(newEvaluation);
  res.status(201).json(createdEvaluation);
});

module.exports = router;
