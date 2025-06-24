import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  console.log(products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-blue-100 py-6 px-4">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.map(product => (
          <Link to={`/products/${product._id}`} key={product._id}>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <img
                src={product.productImage}
                alt={product.productName}
                className="w-full h-72 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-blue-800">{product.productName}</h2>
                <p className="text-gray-600 text-sm mt-1">{product.productDescription}</p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-lg font-bold text-green-600">₹{product.productPrice}</span>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm cursor-pointer">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
