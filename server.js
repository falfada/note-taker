const express = require("express");
const path = require("path");

const api = require('./routes/index');

const PORT = 3001;
const app = express();

app.use(express.static("public"));
app.use(express.json());

app.use('/api', api);

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Start taking notes at http://localhost:${PORT}`);
});
