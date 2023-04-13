const checkId = (req, res, next) => {
    if (req.session.currentUser.id === req.query.userId) {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized - Not your id" });
    }
  };
  
  module.exports = checkId;
