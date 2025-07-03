import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState('');

  const { user } = useContext(UserContext);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      console.log(data);
      setProduct(data.product);
    } catch (error) {
      console.error("Error fetching product", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      setMessage("Login to add items");
      setTimeout(() => setMessage(""), 2000);
      return;
    }

    const res = await fetch('/api/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId: product._id, quantity: 1 }),
      credentials: "include"
    });

    const data = await res.json();
    console.log(data);
  };

  if (!product) return <div className="text-center py-10 text-blue-700 text-lg">Loading...</div>;

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10 mb-10">
        <div className="flex justify-center">
          <img
            src={product.productImage}
            alt={product.productName}
            className="h-96 w-full max-w-lg object-cover rounded-lg "
          />
        </div>

        <h1 className="text-3xl font-bold mt-6 text-blue-800">{product.productName}</h1>

        <p className="text-sm text-blue-600 mt-2">Brand: {product.productBrand}</p>
        <p className="text-sm text-blue-600">Category: {product.productCategory}</p>

        <p className="text-gray-700 mt-4">{product.productDescription}</p>
        <p className="text-green-600 text-2xl font-semibold mt-4">₹{product.productPrice}</p>

        <button
          onClick={handleAddToCart}
          className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-full font-medium shadow cursor-pointer transition-all"
        >
          Add to Cart
        </button>

        {message && (
          <p className="text-red-600 text-sm mt-3 animate-pulse font-medium">{message}</p>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
