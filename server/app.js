const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const cors = require("cors");
const weatherRoutes = require("./routes/weatherRoutes");

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());

app.use("/weather", weatherRoutes);

module.exports = app;
