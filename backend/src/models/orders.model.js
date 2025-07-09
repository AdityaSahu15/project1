import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
   address: {
    fullName: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    phone: String,
  },
  status: {
    type: String,
    default: "Placed",
    enum: ["Placed", "Shipped", "Delivered", "Cancelled"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export const Order=mongoose.model("Order",orderSchema);

/*

{
  "_id": "order123",
  "userId": "user456",
  "items": [
    { "productId": "prodA", "quantity": 2 },
    { "productId": "prodB", "quantity": 1 }
  ],
  "totalAmount": 1500,
  "status": "Placed",
  "createdAt": "2025-07-03T12:45:00.000Z",
  "updatedAt": "2025-07-03T12:45:00.000Z"
}


*/
