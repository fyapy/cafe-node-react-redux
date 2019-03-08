const router = require("express").Router();
const db = require("../../database");
const passport = require("passport");
const isAdmin = require("../../middleware/isAdmin");
const isEmpty = require("../../validation/isEmpty");
const productValidate = require("../../validation/Product");
const base64Img = require("base64-img");

// @route		POST api/products/add
// @desc		Adding Products
// @access	Private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  (req, res) => {
    // const { errors, isValid } = productValidate(req.body);

    // if (!isValid) {
    //   return res.status(400).json({ errors });
    // }

    // const name = req.body.name;

    let time = Math.floor(Date.now() / 1000);
    let fileName = req.user.id + "_" + time;
    let imageName = req.user.id + "_" + time + ".png";

    let catId = isEmpty(req.body.catId) ? null : req.body.catId;

    base64Img.img(req.body.image, "./public/img", fileName, (err, filepath) => {
      db.query(
        `INSERT INTO products (name, price, img, catId) VALUES (?, ?, ?, ?)`,
        {
          replacements: [req.body.name, req.body.price, imageName, catId]
        }
      ).then(resDB => {
        res.json({
          success: true
        });
      });
    });

    // db.query(`INSERT INTO products (name, catId) VALUES (?, ?)`, {
    //   replacements: [name, null]
    // }).then(resDB => {
    //   res.json({
    //     success: "Product created"
    //   });
    // });
  }
);

module.exports = router;
