import { Cart } from "../models/cart.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Add to Cart
 const addToCart = asyncHandler( async (req, res) => {
    
  const userId = req.user?._id;
  console.log(userId)
  const { productId ,quantity=1} = req.body;
  console.log(productId)

  try {
    let cart = await Cart.findOne({ userId });
    

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId,quantity}],
      });
    } else {
      const index = cart.items.findIndex(
        (item) => item.productId.toString() === productId.toString()
      );

      if (index !== -1) {
        cart.items[index].quantity += 1;
      } else {
        cart.items.push({ productId,quantity});
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Cart
 const getCart = asyncHandler( async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error fetching cart" });
  }
});


export {addToCart,getCart}