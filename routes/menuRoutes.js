const express = require("express");
const router = express.Router();

// connection
const MenuItem = require("../models/MenuItem");

// Menuitem api
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const savedMenuItem = await newMenuItem.save();
    console.log("data saved: ", savedMenuItem);
    res.status(200).json(savedMenuItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// parameterised api
router.get('/:tastetype', async (req, res) => {
    try {
      const tastetype = req.params.tastetype;
      if (tastetype === "sweet" || tastetype === "spicy" || tastetype === "sour") {
        const response = await MenuItem.find({ taste: tastetype });
        console.log("response fetched");
        res.status(200).json(response);
      } else {
        res.status(404).json({ error: "Invalid tasteType" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

module.exports = router;
