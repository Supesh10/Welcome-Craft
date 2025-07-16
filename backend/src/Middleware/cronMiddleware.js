const cron = require("node-cron");
const { fetchSilverPriceFromWebsite } = require("../Services/silverPriceScraper");

// Run every hour on the hour
cron.schedule("0 * * * *", () => {
  fetchSilverPriceFromWebsite();
});
