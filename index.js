import app from "./app.js";
const PORT = 8000;

app.listen(PORT, (req, res) => {
  console.log(`DFSA server is running at http://localhost:${PORT}`);
});