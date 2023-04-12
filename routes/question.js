const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

router.post("/newquestion", (req, res, next) => {
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

module.exports = router;
