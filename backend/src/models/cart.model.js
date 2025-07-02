import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Reference to your product collection
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // One cart per user
  },
  items: [cartItemSchema],
  subTotal:{
    type:Number,
    default:0
  }
}, { timestamps: true });

export const Cart= mongoose.model("Cart", cartSchema);
