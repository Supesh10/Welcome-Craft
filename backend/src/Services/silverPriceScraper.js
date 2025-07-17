const axios = require("axios");
const cheerio = require("cheerio");
const SilverPrice = require("../Model/silverPriceModel");

async function fetchSilverPriceFromWebsite() {
  try {
    // Fetch the page HTML
    const { data: html } = await axios.get("https://www.hamropatro.com/gold"); // Use actual site URL
    const $ = cheerio.load(html);

    // Find the <li> element with the required attribute
    const li = $(
      "li[onclick=\"$('.goldchart').hide();$('#goldchart2').show();\"]"
    );

    if (!li.length) throw new Error("Silver price element not found");

    // Extract and parse the price from text (e.g. "Nrs. 2,315.30")
    const text = li.text().trim();
    const match = text.match(/([\d,]+\.\d+)/);

    if (!match) throw new Error("Price not found in text");

    const parsedPrice = parseFloat(match[1].replace(/,/g, "")); // e.g., 2315.30

    if (isNaN(parsedPrice))
      throw new Error("Parsed price is not a valid number");

    // Get today's date (set to midnight)
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    // Check if the price for today already exists in the database
    let existing = await SilverPrice.findOne({ effectiveDate: now });

    if (existing) {
      existing.pricePerTola = parsedPrice; // Update existing record
      await existing.save();
    } else {
      // Create a new entry for today's price
      await SilverPrice.create({
        pricePerTola: parsedPrice,
        effectiveDate: now,
      });
    }

    console.log(`✅ Silver price updated from website: Nrs. ${parsedPrice}`);
  } catch (err) {
    console.error("❌ Error fetching silver price:", err.message);
    throw err; // Rethrow the error to be handled by the controller
  }
}

module.exports = { fetchSilverPriceFromWebsite };
