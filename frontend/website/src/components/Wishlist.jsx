import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const Wishlist = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const verifyUser = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login/userInfo`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) setUser(data?.data);
      else setUser(null);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(true);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/wishlist`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      setWishlist(data.items || []);
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
    }
  };

  useEffect(() => {
    if (!user && loading) {
      navigate('/login', {
        state: { message: 'Please login first to see your Wishlist' },
      });
    }
    if (user) fetchWishlist();
  }, [user, navigate, loading]);

  const removeFromWishlist = async (productId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/wishlist/remove`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Removed from wishlist");
        fetchWishlist(); // Refresh list
      } else {
        toast.error(data.message || "Failed to remove item");
      }
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-12 px-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-800 underline">
         My Wishlist 
      </h1>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-700 text-xl font-medium">
          No items in wishlist yet. Start exploring and save your favorites!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {wishlist.map((item) => {
            const product = item.productId;
            return (
              <div
                key={product._id}
                className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transition transform hover:scale-105 hover:shadow-purple-300"
              >
                <div className="absolute top-4 right-4 bg-white text-pink-500 border border-pink-200 px-2 py-1 rounded-full text-xs font-semibold shadow">
                  ♥ Wishlist
                </div>

                <div className="w-full aspect-[4/3] overflow-hidden">
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="w-full h-full object-cover transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                <div className="p-6 space-y-2">
                  <h2 className="text-xl font-bold text-purple-800 line-clamp-1">
                    {product.productName}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {product.productDescription}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xl font-bold text-green-600">
                      ₹{product.productPrice}
                    </span>
                    <Link to={`/products/${product._id}`}>
                      <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-full shadow-md text-md transition-transform transform hover:scale-105 cursor-pointer">
                        View
                      </button>
                    </Link>
                  </div>

                  <div className="flex justify-center ">
                    <button
                      onClick={() => removeFromWishlist(product._id)}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-full shadow-md text-sm transition-transform transform hover:scale-105 cursor-pointer"
                    >
                      Remove from Wishlist
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
