const express = require("express");
const router = express.Router();

router
  .get("/", (req, res) => {
    res.send("Get all SKUs");
  })

  .get("/verify", (req, res) => {
    const { status } = req.query
    res.send(`Get SKUs by status. Params (status): ${status}`);
  })

  .get("/search", (req, res) => {
    const { search, category } = req.query
    res.send(`Get SKUs by category. Search ${search}, filter ${category}`);
  });

module.exports = router