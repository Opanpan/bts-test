const express = require("express");

const app = express();
const port = 8000;

const logger = require("morgan");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const router = require("./routes");

app.use(router);

app.listen(port);
