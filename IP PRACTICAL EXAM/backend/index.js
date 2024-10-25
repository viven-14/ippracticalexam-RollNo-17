const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// POST route to calculate salary
app.post("/calculate", (req, res) => {
  const { name, basicSalary } = req.body;

  if (!name || !basicSalary || isNaN(basicSalary)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  // Simple calculation logic (example: deduct 20% tax)
  const netSalary = basicSalary * 0.8;

  res.json({ netSalary });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
