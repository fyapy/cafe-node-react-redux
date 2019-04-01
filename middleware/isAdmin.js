module.exports = (req, res, next) => {
  if (req.user && req.user.role > 5) {
    return next();
  }

  res.json("No access");
};
