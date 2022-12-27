require("dotenv").config();
const express = require("express");
const fallback = require("express-history-api-fallback");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const root = __dirname + "/dist";
app.use(express.static(root));
app.use(fallback('index.html', { root: root}))

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
}); 
