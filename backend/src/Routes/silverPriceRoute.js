// routes/silverPriceRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/silverPriceController");

// Admin-only
router.post("/set", controller.setTodaySilverPrice); // manual input
router.get("/scrape", controller.scrapeSilverPrice); // trigger website scraper

// Public
router.get("/today", controller.getTodaySilverPrice); // latest price
router.get("/history", controller.getSilverPriceHistory); // price history

module.exports = router;
