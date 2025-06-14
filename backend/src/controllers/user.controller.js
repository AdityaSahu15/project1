import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { response } from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import { User } from "../models/user.model.js"


const generateAccessAndRefreshTokens=async (userId)=>{
    try {
  const user=await User.findById(userId)
  const accessToken=user.generateAccessToken()
  const refreshToken=user.generateRefreshToken()

  user.refreshToken=refreshToken
  await  user.save({validateBeforeSave:false})

  return {accessToken,refreshToken}

} catch (error) {
  throw new ApiError(500,"Something went wrong while generating refresh and access token")
}
}





const registerUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body
  console.log(req.body);

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required")
  }

  const existedUser = await User.findOne({
    $or: [{ email }]
  })

  if (existedUser) {
    return res.status(409).json({
      success: false,
      message: "User with this email already exists",
      errors: [],
    });
  }

  const user = await User.create({
    email,
    password
  })

  const createdUser = await User.findById(user._id).select("-password")

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user")
  }

  //req.user=createdUser

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  )


})


const loginUser = asyncHandler(async (req, res) => {

  // hume login karna h 
  /*
  req.body se email aur password lenge 
  pehle verify karenge ki email id registered h bhi ya nhi 
  uske baad we will check check if the password is correct or not  
  
  
  
  */
  console.log(req.body);
  const { email, password } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
     return res.status(400).json(
      {
      success: false,
      message: "All fields are required",
      errors: [],
      }
    )
  }

  const user = await User.findOne({
     email 
  })

  if (!user) {
    return res.status(409).json(
      {
      success: false,
      message: "No user with this email id ",
      errors: [],
      }
    )
  }

  const isPasswordValid = await user.isPasswordCorrect(password)

  if (!isPasswordValid) {
    return res.status(401)
    .json(
      {
      success: false,
      message: "Incorrect Password",
      errors: [],
      }
    )
  }

   const createdUser = await User.findById(user._id).select("-password")
  // console.log(createdUser)

   const {accessToken,refreshToken}=await  generateAccessAndRefreshTokens(user._id)

    const options={
    httpOnly:true,
    secure:true
   } 

   //req.user=createdUser

  return res.status(200)
  .cookie("accessToken",accessToken,options)
  .cookie("refreshToken",refreshToken,options)
    .json(
      new ApiResponse(200, createdUser,"User logged in Successfully")
    )

})

const updateUser = asyncHandler(async (req, res) => {
  console.log("BODY:", req.body);
  console.log("req.user:", req.user);

  const { field, inputValue } = req.body;

  if (!req.user?._id) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  let update = {};
  if (field === "Name") {
    update.fullName = inputValue;
  }

  if(field  === "Email"){
    update.email=inputValue
  }

  if(field === "Username"){
    update.userName=inputValue;
  }
  if(field === "Contact"){
    update.contact=inputValue;
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { $set: update },
    { new: true }
  ).select("-password -refreshToken");

  console.log("Updated user:", updatedUser);

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  

  res.status(200).json({ message: "User updated", user: updatedUser });
});



export { registerUser,loginUser,updateUser }