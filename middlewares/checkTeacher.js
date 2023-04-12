const checkTeacher = (req, res, next) => {
    if (req.session.currentUser.isTeacher === true) {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized - Teacher only" });
    }
  };
  
  module.exports = checkTeacher;
