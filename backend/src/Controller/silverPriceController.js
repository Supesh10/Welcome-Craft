const silverPriceService = require("../Services/silverPriceScraper");

// Trigger the website scraper to update the silver price
exports.scrapeSilverPrice = async (req, res) => {
  try {
    await silverPriceService.fetchSilverPriceFromWebsite(); // Trigger the scraper
    res.status(200).json({ message: "Silver price updated successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update silver price", error: err.message });
  }
};

// Get today's silver price
exports.getTodaySilverPrice = async (req, res) => {
  try {
    const result = await silverPriceService.getTodayPrice();
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Get price history
exports.getSilverPriceHistory = async (req, res) => {
  try {
    const result = await silverPriceService.getPriceHistory();
    res.status(200).json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch history", error: err.message });
  }
};
