const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let items = [];

// Route GET
app.get("/items", (req, res) => {
  res.status(200).json(items);
});

// Route POST
app.post("/items", (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "Text is required" });
  }

  items.push(text.trim());

  res.status(201).json({
    message: "Item ajouté",
    items
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});