require("dotenv").config();

const express = require("express");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { body, header, validationResult } = require("express-validator");

const db = require("../db");

const router = express.Router();

router.post(
  "/",
  body("username")
    .isLength({ min: 1, max: 20 })
    .bail()
    .custom((value) => {
      return db
        .first(["username"])
        .from("users")
        .where({ username: value })
        .then((user) => {
          if (typeof user !== "undefined") {
            return Promise.reject("Username already in use.");
          }
        });
    }),
  body("password").isLength({ min: 1 }),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    bcrypt.hash(
      req.body.password,
      +process.env.SALT_ROUNDS,
      (err, password_hash) => {
        db.insert({
          username: req.body.username,
          password_hash,
        })
          .into("users")
          .then(() => {
            return res.json({
              errors: [],
              userCreated: true,
            });
          })
          .catch((err) => {
            return res.status(400).json({ errors: [err] });
          });
      }
    );
  }
);

router.post(
  "/session",
  body("username").isLength({ min: 1 }),
  body("password").isLength({ min: 1 }),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const usernamePasswordError = {
      msg: "Incorrect username and/or password.",
      params: ["username", "password"],
      location: "body",
    };

    db.first(["username", "password_hash"])
      .from("users")
      .where({ username: req.body.username })
      .then((user) => {
        if (typeof user === "undefined") {
          return res.status(403).json({ errors: [usernamePasswordError] });
        }

        bcrypt.compare(
          req.body.password,
          user.password_hash,
          (err, hashesMatch) => {
            if (!hashesMatch) {
              return res.status(403).json({ errors: [usernamePasswordError] });
            }

            const key = uuidv4();

            db.insert({
              key,
              user_username: user.username,
            })
              .into("sessions")
              .then(() => {
                return res.json({
                  errors: [],
                  sessionKey: key,
                });
              });
          }
        );
      });
  }
);

router.delete(
  "/session",
  header("Authorization").custom((value) => {
    if (typeof value === "undefined" || value.split(" ")[0] !== "Bearer") {
      throw new Error(
        "Bearer token authorization header required. Try 'Bearer [SESSION_KEY]'"
      );
    }
    return true;
  }),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const key = req.headers.authorization.split(" ")[1];

    db("sessions")
      .where({ key, active: true })
      .update({ active: false })
      .then((numSessionsDeactivated) => {
        if (numSessionsDeactivated === 0) {
          return res.status(400).json({
            errors: [
              {
                msg: "No active session exists with that key.",
                param: "Authorization",
                location: "header",
              },
            ],
          });
        }

        return res.json({
          errors: [],
          sessionDeleted: true,
        });
      });
  }
);

module.exports = router;
