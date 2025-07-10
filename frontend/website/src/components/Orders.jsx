import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  // ✅ Verify user
  const verifyUser = async () => {
    try {
      const res = await fetch("/api/login/userInfo", {
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



  // ✅ Fetch user orders
  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/order/get", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setOrders(data);
      } else {
        setMessage(data.message || "Failed to fetch orders.");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  useEffect(() => {
    if (!user && loading) {
      navigate("/login", {
        state: {
          message: "Please login first to see your Orders",
        },
      });
    }

    if (user) {
      fetchOrders();
    }
  }, [user, navigate, loading]);

  
  if (!loading) {
    return <p className="text-center mt-10 text-blue-500">Loading orders...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100  py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-800 underline">
        My Orders
      </h1>

      {message && (
        <p className="text-center text-red-600 font-medium">{message}</p>
      )}

      {!message && orders.length === 0 ? (
        <p className="text-center text-gray-700 text-xl font-medium">
          You haven’t placed any orders yet.
        </p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white shadow rounded-xl p-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-blue-700">
                  Order ID: <span className="text-gray-700">{order._id}</span>
                </h2>
                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium ${order.status === "Placed"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                    }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="divide-y divide-gray-200">
                {order.items.map((item) => (
                  <div
                    key={item.productId._id}
                    className="flex justify-between items-center py-3"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.productId.productImage}
                        alt={item.productId.productName}
                        className="w-20 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {item.productId.productName}
                        </p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>

                    <p className="text-green-700 font-semibold">
                      ₹{item.productId.productPrice * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                <p className="text-lg font-semibold text-green-800">
                  Total: ₹{order.totalAmount}
                </p>
                <p className="text-sm text-gray-500">
                  Ordered on:{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
