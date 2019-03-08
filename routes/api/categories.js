const router = require("express").Router();
const db = require("../../database");
const passport = require("passport");
const isAdmin = require("../../middleware/isAdmin");
const categoryValidate = require("../../validation/Categories");
const base64Img = require("base64-img");

// @route		GET api/categories
// @desc		Get all categories
// @access	Public
router.get("/", (req, res) => {
  res.json({
    categories: "Категории"
  });
});

// @route		POST api/categories/add
// @desc		Add new categories
// @access	Private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  (req, res) => {
    // const { errors, isValid } = categoryValidate(req.body);

    // if (!isValid) {
    //   return res.status(400).json({ errors });
    // }

    let time = Math.floor(Date.now() / 1000);
    let fileName = req.user.id + "_" + time;
    let imageName = req.user.id + "_" + time + ".png";

    base64Img.img(req.body.image, "./public/img", fileName, (err, filepath) => {
      db.query(`INSERT INTO categories (name, img) VALUES (?, ?)`, {
        replacements: [req.body.name, imageName]
      }).then(resDB => {
        res.json({
          success: true
        });
      });
    });
  }
);

module.exports = router;
