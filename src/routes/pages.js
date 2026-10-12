const express = require("express");
const path = require("node:path");

const router = express.Router();
const projectRoot = path.resolve(__dirname, "../..");

router.get("/", (_req, res) => {
  res.sendFile(path.join(projectRoot, "landing.html"));
});

router.get("/signin", (_req, res) => {
  res.sendFile(path.join(projectRoot, "signin.html"));
});

module.exports = router;
