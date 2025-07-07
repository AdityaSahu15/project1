import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { toast } from 'react-hot-toast';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(UserContext);

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

  const handleAddToCart = async (productId) => {

  if (!user) {
  toast.dismiss(); 
  toast.error("Please login to add to cart");
  return;
}


    try {
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({ productId, quantity: 1 })
      });

      if(res.ok)
      {
        toast.dismiss(); 
        toast.success("Item added to Cart successfully")
      }

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Add to cart failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-10 tracking-wide">Explore Our Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {products.map(product => (
          <div key={product._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 overflow-hidden">
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
                <div className="flex gap-4">
                  <Link to={`/products/${product._id}`}>
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-full shadow-md transition-all duration-300 ease-in-out cursor-pointer">
                      View
                    </button>
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-full shadow-md transition-all duration-300 ease-in-out cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
