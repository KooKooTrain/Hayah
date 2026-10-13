const path = require("node:path");

try {
  process.loadEnvFile(path.resolve(__dirname, "../.env"));
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const app = require("./app");

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Hayati App running at http://localhost:${port} :3`);
});
