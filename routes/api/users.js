const router = require("express").Router();
const db = require("../../database");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const config = require("../../config/config");

// Validation
const validateRegister = require("../../validation/Register");
const validateLogin = require("../../validation/Login");

// @route		POST api/users/register
// @desc		Register user
// @access	Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegister(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  db.query(`SELECT * FROM users WHERE email = ?`, {
    replacements: [req.body.email],
    type: db.QueryTypes.SELECT
  }).then(user => {
    if (user[0]) {
      // Handle User already created error
      errors.email = "Такой Email уже занят";
      return res.status(400).json(errors);
    } else {
      // Create User
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          db.query(
            `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
            {
              replacements: [req.body.name, req.body.email, hash]
            }
          ).then(resUser => {
            // User matched. Create JWT payload
            const payload = { id: user.id, name: user.name };

            // Sign token
            jwt.sign(
              payload,
              config.secretOrKey,
              { expiresIn: 3600 * 24 * 30 },
              (err, token) => {
                res.json({
                  success: true,
                  token: `Bearer ${token}`
                });
              }
            );
          });
        });
      });
    }
  });
});

// @route		POST api/users/login
// @desc		Login user
// @access	Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLogin(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  db.query(`SELECT * FROM users WHERE email = ?`, {
    replacements: [email],
    type: db.QueryTypes.SELECT
  }).then(dbU => {
    const user = dbU[0];

    if (!user) {
      errors.email = "Пользователь не найден";
      return res.status(400).json({ errors });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        errors.email = "Пользователь не найден";
        return res.status(400).json({ errors });
      }

      // User matched. Create JWT payload
      const payload = { id: user.id, name: user.name };

      // Sign token
      jwt.sign(
        payload,
        config.secretOrKey,
        { expiresIn: 3600 * 24 * 30 },
        (err, token) => {
          res.json({
            success: true,
            token: `Bearer ${token}`
          });
        }
      );
    });
  });
});

// @route		GET api/users/current
// @desc		Return current user
// @access	Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      role: req.user.role,
      email: req.user.email
    });
  }
);

module.exports = router;
