const Product = require("../Model/productModel");
const Category = require("../Model/categoryModel");

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      imageUrl,
      category,
      constantPrice,
      height,
      silverPricePerTola,
      weightInTola,
      makingCost,
      weightRange,
      isCustomizable,
    } = req.body;

    // Check if category exists
    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) {
      return res.status(400).json({ message: "Category not found" });
    }

    // Validate required fields based on category type
    if (
      (categoryDoc.name === "Silver Crafts" ||
        categoryDoc.name === "Custom Silver") &&
      (!makingCost || !weightInTola)
    ) {
      return res.status(400).json({
        message:
          "Silver products require silverPricePerTola, makingCost, and weightInTola",
      });
    }

    if (
      categoryDoc.name === "Custom Silver" &&
      (!weightRange || !weightRange.min || !weightRange.max)
    ) {
      return res.status(400).json({
        message:
          "Custom Silver products require weightRange with min and max values",
      });
    }

    if (categoryDoc.name === "Gold Statue" && (!constantPrice || !height)) {
      return res.status(400).json({
        message: "Gold Statue products require constantPrice and height",
      });
    }

    // Create the product
    const newProduct = new Product({
      title,
      description,
      imageUrl,
      category,
      constantPrice,
      height,
      silverPricePerTola,
      weightInTola,
      makingCost,
      weightRange,
      isCustomizable,
    });

    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category"); // Populate category details

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).populate(
      "category"
    ); // Populate category details

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

// Update product details
exports.updateProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      imageUrl,
      category,
      constantPrice,
      height,
      silverPricePerTola,
      weightInTola,
      makingCost,
      weightRange,
      isCustomizable,
    } = req.body;

    // Find the product and category
    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) {
      return res.status(400).json({ message: "Category not found" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        title,
        description,
        imageUrl,
        category,
        constantPrice,
        height,
        silverPricePerTola,
        weightInTola,
        makingCost,
        weightRange,
        isCustomizable,
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};
