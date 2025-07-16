const Order = require("../Model/orderModel");

// Create Order
exports.createOrder = async (req, res) => {
  try {
    const {
      customerName,
      phoneNumber,
      email,
      product,
      productTitle,
      productCategory,
      quantity,
    } = req.body;

    // Basic validation
    if (
      !customerName ||
      !phoneNumber ||
      !email ||
      !product ||
      !productTitle ||
      !productCategory ||
      !quantity
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided." });
    }

    if (
      order.productCategory === "Silver Crafts" ||
      order.productCategory === "Custom Silver"
    ) {
      const silverPrice = await SilverPrice.findOne().sort({ createdAt: -1 });
    }

    const newOrder = new Order({
      customerName,
      phoneNumber,
      email,
      product,
      productTitle,
      productCategory,
      quantity,
      silverPriceAtOrder: silverPrice,
    });

    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

// Get All Orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("product")
      .populate("productCategory")
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

// Update Order
exports.updateOrder = async (req, res) => {
  try {
    const { status, quantity } = req.body;
    const updateFields = {};
    if (status) updateFields.status = status;
    if (quantity) updateFields.quantity = quantity;

    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      updateFields,
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order updated", order });
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error });
  }
};

// Delete Order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
};
