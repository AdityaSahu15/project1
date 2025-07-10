import { Wishlist } from "../models/wishlist.model.js";

export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.user._id }).populate("items.productId");
    res.status(200).json(wishlist || { items: [] });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch wishlist" });
  }
};

export const addToWishlist = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;

  try {
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({ userId, items: [{ productId }] });
    } else if (!wishlist.items.some(item => item.productId.toString() === productId)) {
      wishlist.items.push({ productId });
      await wishlist.save();
    }

    res.status(200).json({ message: "Added to wishlist" });
  } catch (err) {
    res.status(500).json({ message: "Error adding to wishlist" });
  }
};

export const removeFromWishlist = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;

  try {
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

    wishlist.items = wishlist.items.filter(item => item.productId.toString() !== productId);
    await wishlist.save();

    res.status(200).json({ message: "Removed from wishlist" });
  } catch (err) {
    res.status(500).json({ message: "Error removing from wishlist" });
  }
};


export const getWishlistItems = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.user._id }).populate("items");
    if (!wishlist) return res.status(200).json({ wishlist: [] });
    res.status(200).json({ wishlist: wishlist.items });
  } catch (error) {
    console.error("Wishlist fetch error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};