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



const searchProducts = asyncHandler(async (req, res) => {
  const query = req.query.query?.trim();
  console.log("🔍 Search Query:", query);

  if (!query) {
    return res.status(400).json({ message: "No search query provided" });
  }

  try {
    const products = await Product.find({
      productName: { $regex: query, $options: "i" }
    });

    res.status(200).json({ products });  // ✅ Wrap in object
  } catch (error) {
    console.error("❌ Search error:", error);
    res.status(500).json({ message: "Failed to search products" });
  }
});




export {getAllProducts,getProductById,searchProducts}