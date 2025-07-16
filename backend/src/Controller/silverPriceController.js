const silverPriceService = require("../services/silverPriceService");
const { fetchSilverPriceFromWebsite } = require("../Services/silverPriceScraper");


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
    res.status(500).json({ message: "Failed to fetch history", error: err.message });
  }
};


