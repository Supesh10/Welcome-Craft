const mongoose = require("mongoose");

const silverPriceSchema = new mongoose.Schema({
  pricePerTola: { type: Number, required: true }, // in NPR
  effectiveDate: { type: Date, default: Date.now }, // use Date only (no time) to identify daily price
});

module.exports = mongoose.model("SilverPrice", silverPriceSchema);
