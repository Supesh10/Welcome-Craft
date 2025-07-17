const cron = require("node-cron");
const { fetchSilverPriceFromWebsite } = require("./silverPriceScraper");

// Run every hour on the hour
cron.schedule("0 * * * *", async () => {
  console.log("🕐 Running silver price scrape job...");
  try {
    await fetchSilverPriceFromWebsite();
    console.log("Silver price updated successfully via cron job");
  } catch (error) {
    console.error("Error during cron job:", error.message);
  }
});
