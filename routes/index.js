const express = require("express");

const router = express.Router();

const apiUser = require("./userRoutes");

router.use("/api/users/", apiUser);

module.exports = router;
