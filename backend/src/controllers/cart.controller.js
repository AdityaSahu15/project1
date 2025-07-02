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

//update Cart

 const updateCartQuantity = asyncHandler(async (req, res) => {
  const { productId, type } = req.body;  // type denotes whether it is an increase or decrease
  const userId = req.user._id;

  const cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const index = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );
  if (index === -1) return res.status(404).json({ message: "Item not found in cart" });

  if (type === "inc") {
    cart.items[index].quantity += 1;
  } else if (type === "dec" && cart.items[index].quantity > 1) {
    cart.items[index].quantity -= 1;
  }

  await cart.save();
  res.status(200).json(cart);
});




const deleteCartItem = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  // Filter out the item that needs to be removed
  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );

  await cart.save();

  res.status(200).json({
    message: "Item deleted successfully",
    cart: cart.items,
  });
});

/*

Example Cart Document (before populate):
{
  userId: "123",
  items: [
    {
      productId: "abc123", // Just an ID
      quantity: 2
    }
  ]
}



After .populate("items.productId"):
{
  userId: "123",
  items: [
    {
      productId: {
        _id: "abc123",
        name: "iPhone 15",
        price: 999,
        stock: 10
      },
      quantity: 2
    }
  ]
}

earlier i though for updation and deletion i just need to give the product id and the user id .. 
the cart will be fetched based on user id... then after that i have my cart ... 
whatever changes i need to do i a particular product be it addition or deletion i can do it ...
 from the frontend we can send iten.productId... but we have populated the product field thereby we require item.productId._id



*/



export {addToCart,getCart,updateCartQuantity,deleteCartItem}