const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} = require("../Controller/orderController");
const auth = require("../Middleware/authMiddleware");

router.post("/create", auth, createOrder);
router.get("/", auth, getOrders);
router.put("/update/:orderId", auth, updateOrder);
router.delete("/delete/:orderId", auth, deleteOrder);

module.exports = router;
