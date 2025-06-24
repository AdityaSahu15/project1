import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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

  if (!product) return <div className="text-center py-10">Loading...</div>;

 return (
  <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded mt-10 mb-10">
    <div className="flex justify-center">
      <img
        src={product.productImage}
        alt={product.productName}
        className="h-96 w-full max-w-lg object-cover rounded" // 👈 image sizing optimized
      />
    </div>

    <h1 className="text-3xl font-bold mt-4">{product.productName}</h1>

    <p className="text-sm text-blue-600 mt-1">Brand: {product.productBrand}</p>
    <p className="text-sm text-blue-600">Category: {product.productCategory}</p>

    <p className="text-gray-700 mt-3">{product.productDescription}</p>
    <p className="text-green-600 text-xl mt-4">Price: ₹{product.productPrice}</p>

    <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer">
      Add to Cart
    </button>
  </div>
);
;
;
};

export default ProductDetails;
