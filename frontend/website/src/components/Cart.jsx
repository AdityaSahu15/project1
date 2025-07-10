import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function Cart() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(false);

  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const verifyUser = async () => {
    try {
      const res = await fetch('/api/login/userInfo', {
        method: 'GET',
        credentials: 'include',
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

  useEffect(() => {
    if (!user && loading) {
      navigate('/login', {
        state: { message: 'Please login first to see your Cart' },
      });
    }
  }, [user, navigate, loading]);

  const fetchCart = async () => {
    try {
      const res = await fetch('/api/cart', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      setCartItems(data.items || []);
      setTotal(data.subTotal);
      if ((data.items || []).length === 0) {
        setMessage('🛒 Your cart is empty. Browse products and add some!');
      }
    } catch (error) {
      console.error('Failed to fetch cart', error);
    }
  };

  useEffect(() => {
    if (user) fetchCart();
  }, [user]);

  const updateQuantity = async (productId, type) => {
    try {
      await fetch('/api/cart/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ productId, type }),
      });
      fetchCart();
    } catch (err) {
      console.error('Failed to update quantity', err);
    }
  };

  const deleteItem = async (productId) => {
    try {
      const res = await fetch('/api/cart/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ productId }),
      });
      if (res.ok) fetchCart();
    } catch (error) {
      console.log(error.message);
    }
  };

  const buyItems = async () => {
    setLoading(true);
    setMessage('');

    console.log("Sending address from frontend:", address);

    try {
      const res = await fetch('/api/order/place', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Order placed successfully")
        navigate('/orders');
      } else {
        setMessage(data.message || 'Something went wrong while placing the order.');
      }
    } catch (err) {
      console.error('Order placement failed:', err);
      setMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-8 px-4">
      {message && (
        <p className="text-center text-blue-700 text-xl font-semibold mt-10 animate-pulse">
          {message}
        </p>
      )}

      {!message && (
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-800 mb-8 text-center underline">
            My Cart
          </h1>

          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.productId._id}
                className="bg-white shadow-lg rounded-xl p-5 flex justify-between items-start"
              >
                <div className="flex gap-5 items-center">
                  <img
                    src={item.productId.productImage}
                    alt={item.productId.productName}
                    className="w-28 h-24 object-cover rounded-md"
                  />
                  <div>
                    <h2 className="text-base font-medium text-gray-800">
                      {item.productId.productName}
                    </h2>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-md text-gray-600">Qty:</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.productId._id, 'dec')}
                          className="bg-blue-500 text-white w-7 h-7 rounded-lg hover:bg-blue-600 cursor-pointer"
                        >
                          −
                        </button>
                        <span className="text-base font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId._id, 'inc')}
                          className="bg-blue-500 text-white w-7 h-7 rounded-lg hover:bg-blue-600 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteItem(item.productId._id)}
                      className="mt-4 text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer transition transform hover:scale-105"
                    >
                      Remove item
                    </button>
                  </div>
                </div>

                <div className="text-green-600 font-bold text-xl mt-2">
                  ₹{item.productId.productPrice * item.quantity}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mt-10 pt-6">
            <p className="text-2xl font-semibold text-green-700 mb-4 md:mb-0">
              Total: ₹{total}
            </p>

            {!showAddressForm ? (
              <button
                onClick={() => setShowAddressForm(true)}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded shadow-md cursor-pointer transition transform hover:scale-105"
              >
                Proceed to Buy
              </button>
            ) : (
              <button
                onClick={() => setShowAddressForm(false)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded shadow-md cursor-pointer transition transform hover:scale-105"
              >
                Unplace
              </button>
            )}
          </div>

          {showAddressForm && (
            <div className="mt-10 bg-white p-8 rounded-2xl shadow-xl border border-purple-200">
  <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center ">
    Enter Shipping Address
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {['fullName', 'street', 'city', 'state', 'zipCode', 'country', 'phone'].map((field) => (
      <div key={field} className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">
          {field[0].toUpperCase() + field.slice(1)}
        </label>
        <input
          type="text"
          name={field}
          value={address[field]}
          onChange={handleAddressChange}
          placeholder={`Enter ${field}`}
          className="border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg p-2 text-gray-800 placeholder-gray-400 shadow-sm transition"
          required
        />
      </div>
    ))}
  </div>

  <div className="flex justify-center mt-8">
    <button
      onClick={buyItems}
      className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-full shadow-md transition-transform transform hover:scale-105 cursor-pointer"
    >
      Confirm & Place Order
    </button>
  </div>
</div>

          )}
        </div>
      )}
    </div>
  );
}

export default Cart;
