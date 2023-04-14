const express = require("express");
const router = express.Router();
const Answer = require("../models/Answer");
const checkTeacher = require("../middlewares/checkTeacher");

//Create a new answer
router.post("/newanswer", (req, res, next) => {
  const { questionId, repartition, reponse } = req.body;

  const newAnswer = { questionId, repartition, reponse };

  Answer.create(newAnswer)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(next);
});

//Fetch all infos for one question, teacher only
router.get("/allanswers", checkTeacher, (req, res, next) => {
  Answer.find({ "answer.questionId": req.query.questionId })
    .then((answers) => {
      res.status(200).json(answers);
    })
    .catch(next);
});

module.exports = router;
