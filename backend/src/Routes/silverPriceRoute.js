const express = require("express");
const router = express.Router();
const controller = require("../Controller/silverPriceController");

// Admin-only route to trigger scraping
router.get("/scrape", controller.scrapeSilverPrice);

// Public routes
router.get("/today", controller.getTodaySilverPrice);
router.get("/history", controller.getSilverPriceHistory);

module.exports = router;
