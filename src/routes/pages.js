const express = require("express");
const path = require("node:path");

const router = express.Router();
const pagesDirectory = path.resolve(__dirname, "../../pages");

router.get("/", (_req, res) => {
  res.sendFile(path.join(pagesDirectory, "landing.html"));
});

router.get("/signin", (_req, res) => {
  res.sendFile(path.join(pagesDirectory, "signin.html"));
});

router.get("/settings", (_req, res) => {
  res.sendFile(path.join(pagesDirectory, "settings.html"));
});

router.get("/calendar", (_req, res) => {
  res.sendFile(path.join(pagesDirectory, "calendar.html"));
});

router.get("/AI", (_req, res) => {
  res.sendFile(path.join(pagesDirectory, "AI.html"));
});
module.exports = router;
