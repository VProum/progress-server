const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const checkTeacher = require("../middlewares/checkTeacher");

router.post("/newquestion", checkTeacher, (req, res, next) => {
  const { competences, capacites, questions = "" } = req.body;

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

module.exports = router;
