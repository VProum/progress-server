const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const checkTeacher = require("../middlewares/checkTeacher");
const requireAuth = require("../middlewares/requireAuth");


router.post("/newquestion", checkTeacher, (req, res, next) => {
  const { competences, capacites, questions = "", isLive = false } = req.body;

  Question.findOne({ competences })
    .then((questDoc) => {
      if (questDoc) {
        return res.status(400).json({ message: "Competences already taken" });
      }
      const newQuestion = { competences, capacites, questions };

      Question.create(newQuestion)
        .then(() => {
          res.sendStatus(201);
        })
        .catch(next);
    })
    .catch(next);
});

//Fetch all questions, teacher only
router.get("/allquestions", checkTeacher, (req, res, next) => {
  Question.find()
    .then((questions) => {
      res.status(200).json(questions);
    })
    .catch(next);
});

//Fetch all available questions, students for eval
router.get("/questionsforeval", requireAuth, (req, res, next) => {
  Question.find({ isLive: true })
    .then((questions) => {
      res.status(200).json(questions);
    })
    .catch(next);
});

module.exports = router;
