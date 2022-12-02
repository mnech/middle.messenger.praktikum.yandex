require("dotenv").config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./dist'));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
}); 
