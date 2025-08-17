const express = require("express");
const router = express.Router();
const { getSummary } = require("../controllers/summaryController");
const multer = require("multer");

// Use memory storage instead of disk storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to generate summary with optional file upload
router.post("/generate", upload.single("transcriptFile"), getSummary);

module.exports = router;
