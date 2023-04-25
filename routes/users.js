const express = require("express");
const User = require("../models/User");
const requireAuth = require("../middlewares/requireAuth");
const checkTeacher = require("../middlewares/checkTeacher");
const router = express.Router();

router.get("/me", requireAuth, (req, res, next) => {
  User.findById(req.session.currentUser._id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

router.get("/allusers", requireAuth, checkTeacher, (req, res, next) => {
  User.find({})
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});


// Update open evaluations for a classe
router.post("/opencloseeval", requireAuth, checkTeacher, async (req, res, next) => {
  const classeToUpdate = req.body.updatedClasse;
  const isOpen = req.body.isOpenTemp;
  const titreEval = req.body.titreEval;
  console.log(classeToUpdate, isOpen);
  const updatedUsers = await User.updateMany({ schoolClass: classeToUpdate }, {currentEvaluation: {
    isOpen: isOpen,
    evaluationTitle: titreEval
    }
  });
  res.status(201).json(updatedUsers);
});

module.exports = router;
