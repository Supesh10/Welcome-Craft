const Category = require("../Model/categoryModel");

// Create Category
exports.createCategory = async (req, res) => {
  try {
    const { name, description, imageUrl } = req.body;

    const exists = await Category.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCategory = new Category({ name, description, imageUrl });
    await newCategory.save();

    res
      .status(201)
      .json({ message: "Category created", category: newCategory });
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};

// Get All Categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

// Get Single Category
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category", error });
  }
};

// Update Category
exports.updateCategory = async (req, res) => {
  try {
    const { name, description, imageUrl } = req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.categoryId,
      { name, description, imageUrl },
      { new: true }
    );

    if (!category)
      return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "Category updated", category });
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.categoryId);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};
