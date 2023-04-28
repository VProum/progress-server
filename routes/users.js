const express = require("express");
const User = require("../models/User");
const requireAuth = require("../middlewares/requireAuth");
const checkTeacher = require("../middlewares/checkTeacher");
const router = express.Router();
const Agenda = require("agenda");

const agenda = require("./../config/agenda");

const closeEvaluation = async (classeToClose) => {
  //close eval for all student of classeToClose
  await User.updateMany(
    { schoolClass: classeToClose },
    {
      currentEvaluation: {
        isOpen: false,
      },
    }
  );
};

agenda.define("close eval", async (job, done) => {
  const schoolClass = job.attrs.data.classeToUpdate;
  await closeEvaluation(schoolClass);
  done();
});

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
router.post(
  "/opencloseeval",
  requireAuth,
  checkTeacher,
  async (req, res, next) => {
    try {
      const classeToUpdate = req.body.updatedClasse;
      const isOpen = req.body.isOpen;
      const titreEval = req.body.titreEval;
      const updatedUsers = await User.updateMany(
        { schoolClass: classeToUpdate },
        {
          currentEvaluation: {
            isOpen: isOpen,
            evaluationTitle: titreEval,
          },
        }
      );

      //opening eval for class
      if (isOpen) {
        const hob = await agenda.schedule(
          new Date(Date.now() + 3_600_000), //one hour
          "close eval",
          {
            classeToUpdate,
          }
        );
      } else {
        const zob = await agenda.cancel({
          name: "close eval",
          "data.classeToUpdate": classeToUpdate,
        });
      }

      res.status(201).json(updatedUsers);
    } catch (error) {
      next();
    }
  }
);

module.exports = router;
