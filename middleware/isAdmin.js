module.exports = (req, res, next) => {
  console.log(req);
  if (req.user && req.user.role > 5) {
    return next();
  }

  res.json("No access");
};
