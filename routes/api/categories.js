const router = require("express").Router();
const db = require("../../database");
const passport = require("passport");
const isEmpty = require("../../validation/isEmpty");
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

// @route		GET api/categories/:id
// @desc	  Get category
// @access	Public
router.get("/:id", (req, res) => {
  db.query(`SELECT *  FROM categories WHERE id = ?`, {
    replacements: [req.params.id],
    type: db.QueryTypes.SELECT
  }).then(cat => {
    res.json({
      category: cat[0]
    });
  });
});

// @route		PUT api/categories/:id
// @desc	  Edit category
// @access	Private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  (req, res) => {
    db.query(`UPDATE categories SET name = ? WHERE id = ?`, {
      replacements: [req.body.name, req.params.id]
    }).then(cat => {
      if (!isEmpty(req.body.image)) {
        let time = Math.floor(Date.now() / 1000);
        let fileName = req.user.id + "_" + time;
        let imageName = req.user.id + "_" + time + ".png";

        base64Img.img(
          req.body.image,
          "./public/img",
          fileName,
          (err, filepath) => {
            db.query(`UPDATE categories SET img = ? WHERE id = ?`, {
              replacements: [imageName, req.params.id]
            }).then(resDB => {
              res.json({
                success: true
              });
            });
          }
        );
      } else {
        res.json({
          success: true
        });
      }
    });
  }
);

// @route		DELETE api/categories/:id
// @desc	  Delete category
// @access	Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  (req, res) => {
    db.query(`UPDATE categories SET display = 0 WHERE id = ?`, {
      replacements: [req.params.id]
    }).then(cat => {
      res.json({
        success: true
      });
    });
  }
);

module.exports = router;
