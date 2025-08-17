const serverless = require("serverless-http");
const app = require("../app");   // import your express app

module.exports = serverless(app);
