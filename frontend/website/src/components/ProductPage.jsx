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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-10 tracking-wide">Explore Our Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {products.map(product => (
          <Link to={`/products/${product._id}`} key={product._id}>
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 overflow-hidden">
              <img
                src={product.productImage}
                alt={product.productName}
                className="w-full h-72 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-blue-800 truncate">{product.productName}</h2>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">{product.productDescription}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xl font-bold text-green-600">₹{product.productPrice}</span>
                  <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md cursor-pointer">
                    View
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
