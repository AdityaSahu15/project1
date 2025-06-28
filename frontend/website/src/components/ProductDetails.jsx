import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const[message,setMessage]=useState('');

  const {user}=useContext(UserContext);



      const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        console.log(data)
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product", error);
      }
    };

  useEffect(() => {
    fetchProduct();
  }, [id]);


  const handleAddToCart=async()=>{
    if(!user)
    {
      setMessage("Login to add items")
      return;
    }

   
    const res=await fetch('/api/cart/add',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({productId:product._id,quantity:1}), // sending the product id 
        credentials:"include"
      } )
      

      const data=await res.json();
      console.log(data);
   
  }



  if (!product) return <div className="text-center py-10">Loading...</div>;

 return (
<>

  <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded mt-10 mb-10">
    <div className="flex justify-center">
      <img
        src={product.productImage}
        alt={product.productName}
        className="h-96 w-full max-w-lg object-cover rounded" 
      />
    </div>

    <h1 className="text-3xl font-bold mt-4">{product.productName}</h1>

    <p className="text-sm text-blue-600 mt-1">Brand: {product.productBrand}</p>
    <p className="text-sm text-blue-600">Category: {product.productCategory}</p>

    <p className="text-gray-700 mt-3">{product.productDescription}</p>
    <p className="text-green-600 text-xl mt-4">Price: ₹{product.productPrice}</p>

    <button onClick={handleAddToCart} className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer">
      Add to Cart
    </button>

    {message && <p  className="text-red-600 text-sm mt-2">{message}</p>}

    
  </div>

  

  </>
);
;
;
};

export default ProductDetails;
