import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { toast } from 'react-hot-toast';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const query = new URLSearchParams(location.search).get("query");

  const fetchResults = async () => {
      try {
        const res = await fetch(`/api/products/search?query=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.products || []);
      } catch (error) {
        console.error("Search failed:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };


  useEffect(() => {
    if (!query?.trim())
    {
      navigate('/home')
       return;
    }
    setLoading(true);
    fetchResults();
  }, [query]);

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
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <h2 className="text-2xl text-center font-bold text-blue-700  mb-6">
        Search Results for: <span className="text-purple-700">{query}</span>
      </h2>

      {loading ? (
        <p className="text-center animate-pulse text-gray-600">Loading...</p>
      ) : results.length === 0 ? (
        <p className="text-center text-red-600 font-semibold">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {results.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-md p-5 text-center"
            >
              <img
                src={product.productImage}
                alt={product.productName}
                className="h-72 w-full object-contain rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold text-blue-800">{product.productName}</h3>
             
              <p className="text-gray-700 mt-2">{product.productDescription}</p>
              <p className="text-green-600 text-xl font-bold mt-3">
                ₹{product.productPrice}
              </p>

              <div className="flex justify-center gap-4 mt-5 cursor-pointer">
                <button
                  onClick={() => navigate(`/products/${product._id}`)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-full shadow-md transition-all duration-300 ease-in-out cursor-pointer"
                >
                  View
                </button>

                <button
                  onClick={() => handleAddToCart(product._id)}
                 className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-full shadow-md transition-all duration-300 ease-in-out cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
