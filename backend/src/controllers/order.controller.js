import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { Order } from "../models/orders.models.js";

 const placeOrder = async (req, res) => {
  const userId = req.user._id;

  try {
    // 1. Fetch the user's cart
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 2. Stock check
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

    // 3. Calculate total price
    const totalAmount = cart.items.reduce(
      (sum, item) =>
        sum + item.productId.productPrice * item.quantity,
      0
    );

    // 4. Create order
    const order = await Order.create({
      userId,
      items: cart.items.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      })),
      totalAmount,
      status: "Placed",
    });

    // 5. Update product stock
    for (const item of cart.items) {
      const product = item.productId;
      product.productStock -= item.quantity;
      await product.save();
    }

    // 6. Clear cart
    cart.items = [];
    cart.subTotal = 0;
    await cart.save();

    // 7. Respond with order
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



export {placeOrder,getUserOrders}