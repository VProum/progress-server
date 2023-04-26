const checkEvalExpiry = (req, res, next) => {
  if (req.session.currentUser.isOpen === true) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized - Evaluation Closed" });
  }
};

module.exports = checkEvalExpiry;
