const router = require("express").Router();
const isAdmin = require("../../middleware/isAdmin");
const multer = require("multer");
const db = require("../../database");

const storage = multer.diskStorage({
  destination: "public/img/gallary",
  filename: (req, file, cb) => {
    cb(null, `gallary-${Date.now()}.jpeg`);
  }
});

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
  db.query(`INSERT INTO gallary (title, img) VALUES (?, ?)`, {
    replacements: [req.body.title, req.file.filename]
  }).then(gallary => {
    res.json({ success: true });
  });
});

router.get("/", (req, res) => {
  db.query(`SELECT * FROM gallary`, {
    type: db.QueryTypes.SELECT
  }).then(gallary => {
    res.json({ gallary });
  });
});

router.delete("/:id", (req, res) => {
  db.query(`DELETE FROM gallary WHERE id = ?`, {
    replacements: [req.params.id]
  }).then(del => {
    res.json({ success: true });
  });
});

module.exports = router;
