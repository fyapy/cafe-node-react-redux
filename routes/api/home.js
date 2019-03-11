const router = require("express").Router();
const db = require("../../database");

// @route		GET api/home
// @desc		Get all products and categories
// @access	Public
router.get("/", (req, res) => {
  db.query(`SELECT * FROM categories WHERE display = 1`).then(cats => {
    db.query(`SELECT * FROM products WHERE display = 1`).then(prod => {
      res.json({ categories: cats[0], products: prod[0] });
    });
  });
});

module.exports = router;
