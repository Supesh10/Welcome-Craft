const axios = require("axios");
const cheerio = require("cheerio");
const SilverPrice = require("../models/SilverPrice");

async function fetchSilverPriceFromWebsite() {
  try {
    const { data: html } = await axios.get("https://www.hamropatro.com/gold"); // use actual site
    const $ = cheerio.load(html);

    // Find <li> with exact onclick attribute
    const li = $(
      "li[onclick=\"$('.goldchart').hide();$('#goldchart2').show();\"]"
    );

    if (!li.length) throw new Error("Silver price element not found");

    // Extract the price from text like: "Nrs. 2,315.30"
    const text = li.text().trim(); // -> "Nrs. 2,315.30"
    const match = text.match(/([\d,]+\.\d+)/); // Match 2,315.30

    if (!match) throw new Error("Price not found in text");

    const parsedPrice = parseFloat(match[1].replace(/,/g, "")); // 2315.30

    if (isNaN(parsedPrice)) throw new Error("Parsed price is not a number");

    // Save to DB for today's date
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    let existing = await SilverPrice.findOne({ effectiveDate: now });

    if (existing) {
      existing.pricePerTola = parsedPrice;
      await existing.save();
    } else {
      await SilverPrice.create({
        pricePerTola: parsedPrice,
        effectiveDate: now,
      });
    }

    console.log("✅ Silver price updated from website:", parsedPrice);
  } catch (err) {
    console.error("❌ Error fetching silver price:", err.message);
  }
}

module.exports = { fetchSilverPriceFromWebsite };
