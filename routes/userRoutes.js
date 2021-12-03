const express = require("express");
const jwt = require("jsonwebtoken");

const user = express.Router();
const userController = require("../controllers/userControllers");

user.post("/signup", userController.registerAction);
user.post("/signin", userController.loginAction);

user.get("/", userController.verifyToken, (req, res) => {
  jwt.verify(req.token, "ifanalriansyah", (err, authData) => {
    if (err) res.sendStatus(403);
    else {
      res.json({
        message: "Welcome to Profile",
      });
    }
  });
});

module.exports = user;
