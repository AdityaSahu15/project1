# 🛍️ ShopVerse – Your Ultimate Online Shopping Experience

ShopVerse is a full-stack e-commerce web application designed to deliver a smooth and modern shopping experience. From product discovery to order management, everything is user-friendly, responsive, and beautifully built.

## 🌐 Live Demo

👉 [Try ShopVerse Live](https://project1-six-sandy.vercel.app)

---

## 🧰 Tech Stack

### ⚛️ Frontend
- React.js (with Hooks)
- Tailwind CSS (fully responsive design)
- React Router DOM (client-side routing)
- Vite (lightning-fast build tool)
- Context API (for user state management)

### 🔧 Backend
- Node.js with Express
- MongoDB Atlas with Mongoose
- JWT Auth with Refresh Tokens
- Cookie-based Session Management
- CORS Configured for Security
- RESTful API Architecture

### 🚀 Deployment
- **Frontend**: Vercel
- **Backend**: Render

---

## 🚀 Features

### 👤 Authentication & User
- Secure Registration & Login with JWT
- OTP-based Forgot Password Flow
- User Dashboard with Info Editing
- Logout with Cookie Clearing

### 🛍️ Products
- List All Products
- Individual Product Details
- Live Search

### 🛒 Cart
- Add/Remove/Update Items
- Quantity Management
- Cart Summary

### ❤️ Wishlist
- Add to Wishlist
- Remove from Wishlist
- View Saved Products

### 📦 Orders
- Place Orders from Cart
- View Past Orders

### 📱 Responsive UI
- Seamlessly works across PC, Tablet, and Mobile

---

## ⚙️ How to Run Locally

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/project1.git
cd project1



Install Dependencies
🔹 Frontend
bash
cd frontend/website
npm install
🔹 Backend
bash
cd ../../backend
npm install



Running the Project
Backend
bash
npm start
Frontend
bash
npm run dev



Environment Variables

🔹 Backend (backend/.env)
PORT=5000
MONGODB_URI=your_mongo_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
CORS_ORIGIN=https://project1-six-sandy.vercel.app

🔹 Frontend (frontend/website/.env.production)
VITE_API_URL=https://shopverse-2ddh.onrender.com
