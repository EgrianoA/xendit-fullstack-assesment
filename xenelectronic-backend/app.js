"use strict";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require('dotenv')
const routes = require("./app/routes/routes");
const morgan = require('morgan')

dotenv.config()
let mongoServer = process.env.DB;

mongoose
  .connect(mongoServer, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .catch(() => console.log("mongoose connection error"));
mongoose.Promise = global.Promise;

app.use(cors());
app.use(morgan(':date[iso] ":method :url"'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", routes);

app.get("/", async (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

module.exports = app;
