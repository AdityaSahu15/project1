import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
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

    fetchProduct();
  }, [id]);

  if (!product) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded mt-10">
      <img src={product.productImage} alt={product.productName} className="w-full h-96 object-cover rounded" />
      <h1 className="text-3xl font-bold mt-4">{product.productName}</h1>
      <p className="text-gray-700 mt-2">{product.productDescription}</p>
      <p className="text-green-600 text-xl mt-4">Price: ₹{product.productPrice}</p>
      <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
