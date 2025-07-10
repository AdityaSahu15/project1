import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import { registerUser,loginUser, updateUser, logoutUser } from "./controllers/user.controller.js";
import { verifyJWT } from "./middlewares/auth.middleware.js";
import { getAllProducts ,getProductById, searchProducts} from "./controllers/product.controller.js";
import { addToCart,getCart,updateCartQuantity,deleteCartItem } from "./controllers/cart.controller.js";
import { getUserOrders, placeOrder } from "./controllers/order.controller.js";
import { sendOTP, verifyOTPAndReset } from "./controllers/auth.controller.js";
import {getWishlist, addToWishlist, removeFromWishlist,getWishlistItems} from "./controllers/wishlist.controller.js";


const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json())

app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.use(express.static("public"))

app.use(cookieParser())


// app.post('api',controller)
/*
app.post('/api/login/register', (req, res) => {
  const userData = req.body;
  console.log('Data received from frontend:', userData);

  res.status(200).json({ message: 'User registered successfully' });
  
});
*/

app.post('/api/login/register',registerUser)
app.post('/api/login',loginUser)
app.post('/api/login/userInfo',verifyJWT,updateUser)
app.post('/api/login/userInfo/logout',verifyJWT,logoutUser)

app.get('/api/products/search',searchProducts)
app.get('/api/products/:id',getProductById)
app.get('/api/products',getAllProducts)

/*
 Root Cause: Wrong Route Matching
Your Express backend had the following order of routes:

js
Copy
Edit
app.get('/api/products/:id', getProductById);     // ❌ this was first
app.get('/api/products/search', searchProducts);  // ❌ this came after
🔎 How Express Routing Works
Express matches routes from top to bottom in the order they appear.

When you request:

sql
Copy
Edit
GET /api/products/search
And Express sees this route first:

js
Copy
Edit
app.get('/api/products/:id', getProductById);
It interprets:

javascript
Copy
Edit
"search" ➝ as the value of `:id`
So it tries to find a product by this fake ObjectId "search", like:

js
Copy
Edit
Product.findById("search")
This fails, because "search" is not a valid MongoDB ObjectId — hence the error:

pgsql
Copy
Edit
Cast to ObjectId failed for value "search"

*/


app.get('/api/login/userInfo', verifyJWT, (req, res) => {
  res.status(200).json({
    message: "User verified",
    data: req.user
  });
});

app.post('/api/cart/add',verifyJWT,addToCart)
app.get('/api/cart',verifyJWT,getCart)
app.put('/api/cart/update',verifyJWT,updateCartQuantity)
app.delete('/api/cart/delete',verifyJWT,deleteCartItem)


app.post('/api/order/place',verifyJWT,placeOrder)
app.get('/api/order/get',verifyJWT,getUserOrders)


app.post('/api/forgot-password/send-otp',sendOTP)
app.post('/api/forgot-password/verify-otp',verifyOTPAndReset)


app.get('/api/wishlist', verifyJWT, getWishlist);
app.post('/api/wishlist/add', verifyJWT, addToWishlist);
app.delete('/api/wishlist/remove', verifyJWT, removeFromWishlist);
app.get("/api/wishlist", verifyJWT, getWishlistItems);





export {app}