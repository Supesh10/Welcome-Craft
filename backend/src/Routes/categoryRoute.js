// routes/categoryRoutes.js

const express = require("express");
const router = express.Router();
const categoryController = require("../Controller/categoryController");

// Routes
router.post("/category", categoryController.createCategory); // Create
router.get("/category", categoryController.getAllCategories); // Read All
router.get("/category/:categoryId", categoryController.getCategoryById); // Read One
router.put("/category/:categoryId", categoryController.updateCategory); // Update
router.delete("/category/:categoryId", categoryController.deleteCategory); // Delete

module.exports = router;
