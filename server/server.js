const port = 3000;
const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});