const app = require("./app");

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Hayati prototype running at http://localhost:${port}`);
});
