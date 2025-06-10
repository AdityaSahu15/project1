import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import { registerUser,loginUser } from "./controllers/user.controller.js";

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

export {app}