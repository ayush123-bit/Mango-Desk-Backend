const express = require("express");
const router = express.Router();
const { sendSummary } = require("../controllers/emailController");

router.post("/send", sendSummary);

module.exports = router;
