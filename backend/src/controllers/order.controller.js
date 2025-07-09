import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { Order } from "../models/orders.model.js"; // ✅ Make sure file name is orders.model.js

const placeOrder = async (req, res) => {
  const userId = req.user._id;
  const { address } = req.body;
  console.log(req.body)

  

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    for (const item of cart.items) {
      const product = item.productId;
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      if (product.productStock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.productName}`,
        });
      }
    }

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.productId.productPrice * item.quantity,
      0
    );

    const order = await Order.create({
      userId,
      items: cart.items.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      })),
      totalAmount,
      address, // ✅ Save address
      status: "Placed",
    });

    for (const item of cart.items) {
      const product = item.productId;
      product.productStock -= item.quantity;
      await product.save();
    }

    cart.items = [];
    cart.subTotal = 0;
    await cart.save();

    return res.status(200).json({
      message: "Order placed successfully",
      orderId: order._id,
      order,
    });
  } catch (error) {
    console.error("Order placement error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export { placeOrder, getUserOrders };
