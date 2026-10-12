const express = require("express");
const path = require("node:path");
const pagesRouter = require("./routes/pages");
const authRouter = require("./routes/auth");

const app = express();

app.use(express.json({ limit: "4kb" }));
app.use("/assets", express.static(path.resolve(__dirname, "../assets")));
app.use("/", pagesRouter);
app.use("/api/auth", authRouter);

app.use("/api", (_req, res) => {
  res.status(404).json({ prototype: true, message: "API route not found." });
});

app.use((_req, res) => {
  res.status(404).type("text/plain").send("Page not found.");
});

module.exports = app;
