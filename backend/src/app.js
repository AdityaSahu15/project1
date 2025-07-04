import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import { registerUser,loginUser, updateUser, logoutUser } from "./controllers/user.controller.js";
import { verifyJWT } from "./middlewares/auth.middleware.js";
import { getAllProducts ,getProductById} from "./controllers/product.controller.js";
import { addToCart,getCart,updateCartQuantity,deleteCartItem } from "./controllers/cart.controller.js";
import { getUserOrders, placeOrder } from "./controllers/order.controller.js";
import { sendOTP, verifyOTPAndReset } from "./controllers/auth.controller.js";
const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}))

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
app.get('/api/products',getAllProducts)
app.get('/api/products/:id',getProductById)


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

export {app}