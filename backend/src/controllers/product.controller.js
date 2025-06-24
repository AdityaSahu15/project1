import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllProducts=asyncHandler(async(req,res)=>{
    const products=await Product.find({}) // it is used to select all the documents with no condition 
    return  res.status(200).json({message:"succesfuuly fetched all the products",products})
})


const getProductById=asyncHandler(async(req,res)=>{
    try {
        const product=await Product.findById(req.params.id)
        if(!product)
        return res.status(404).json({message:"Product not found"})
        res.json({product})
    } catch (error) {
        return res.status(404).json({message:error.message})
    }
})
export {getAllProducts,getProductById}