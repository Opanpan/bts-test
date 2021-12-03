const { user } = require("../models");

const registerAction = (req, res) => {
  user
    .register(req.body)
    .then((message) => res.status(201).send(message))
    .catch((error) => res.status(409).send(error));
};

const loginAction = (req, res) => {
  user
    .userAuthenticate(req.body)
    .then((user) => {
      res.json({
        email: user.email,
        token: user.generateToken(),
        username: user.username,
      });
    })
    .catch((error) => res.send(error));
};

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    req.token = bearerToken;

    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = {
  registerAction,
  loginAction,
  verifyToken,
};
