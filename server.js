const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection (FIXED)
mongoose.connect("mongodb://127.0.0.1:27017/regulatoryDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// 📦 Schema
const CountrySchema = new mongoose.Schema({
  name: String,
  tax: Number
});

const Country = mongoose.model("Country", CountrySchema);

// ➕ Add Sample Data (run once)
app.get("/add-data", async (req, res) => {
  try {
    await Country.insertMany([
      { name: "India", tax: 30 },
      { name: "Singapore", tax: 15 },
      { name: "Dubai", tax: 5 }
    ]);
    res.send("Data Added");
  } catch (err) {
    res.send("Data already exists or error");
  }
});

// 🧠 Simulation API
app.post("/simulate", async (req, res) => {
  const { countryA, countryB, amount } = req.body;

  try {
    const cA = await Country.findOne({ name: countryA });
    const cB = await Country.findOne({ name: countryB });

    if (!cA || !cB) {
      return res.json({ error: "Country not found" });
    }

    let savings = 0;
    let message = "No benefit";

    if (cB.tax < cA.tax) {
      savings = ((cA.tax - cB.tax) * amount) / 100;
      message = "Better route found";
    }

    let compliance = savings > 0 ? "High" : "Medium";

    res.json({
      savings,
      message,
      compliance
    });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ START SERVER (VERY IMPORTANT)
app.listen(5000, () => {
  console.log("Server started on port 5000");
});