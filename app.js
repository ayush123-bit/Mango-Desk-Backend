const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const summaryRoutes = require("./routes/summaryRoutes");
const emailRoutes = require("./routes/emailRoutes");

const app = express();

app.use(cors({
  origin: ["https://mongo-desk-frontend.vercel.app"], // your frontend
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(bodyParser.json());

// register routes
app.use("/api/summary", summaryRoutes);
app.use("/api/email", emailRoutes);

module.exports = app;
