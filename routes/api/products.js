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
  }
);

// @route		GET api/products/:id
// @desc	  Get products
// @access	Public
router.get("/:id", (req, res) => {
  db.query(`SELECT *  FROM products WHERE id = ?`, {
    replacements: [req.params.id],
    type: db.QueryTypes.SELECT
  }).then(prod => {
    res.json({
      product: prod[0]
    });
  });
});

// @route		PUT api/products/:id
// @desc	  Edit product
// @access	Private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  (req, res) => {
    db.query(
      `UPDATE products SET name = ?, price = ?, catId = ? WHERE id = ?`,
      {
        replacements: [
          req.body.name,
          req.body.price,
          req.body.catId,
          req.params.id
        ]
      }
    ).then(cat => {
      if (!isEmpty(req.body.image)) {
        let time = Math.floor(Date.now() / 1000);
        let fileName = req.user.id + "_" + time;
        let imageName = req.user.id + "_" + time + ".png";

        base64Img.img(
          req.body.image,
          "./public/img",
          fileName,
          (err, filepath) => {
            db.query(`UPDATE products SET img = ? WHERE id = ?`, {
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

// @route		DELETE api/products/:id
// @desc	  Delete product
// @access	Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  (req, res) => {
    db.query(`UPDATE products SET display = 0 WHERE id = ?`, {
      replacements: [req.params.id]
    }).then(cat => {
      res.json({
        success: true
      });
    });
  }
);

module.exports = router;
