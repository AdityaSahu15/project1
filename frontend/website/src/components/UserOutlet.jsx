// UserOutlet.jsx
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import { UpdatedInfoContext } from "../UpdatedInfoContext";
import UserDashboardMenu from "./UserDashboardMenu";
import { useNavigate, Navigate } from "react-router-dom";

const UserOutlet = () => {
  const { user, setUser } = useContext(UserContext);
  const { field, inputValue, setField, setInputValue } = useContext(UpdatedInfoContext);
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const verifyUser = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login/userInfo`, {
        method: "GET",
         headers: {
    "Content-Type": "application/json"
  },
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data);
        setLoading(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  if (user === undefined && loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin h-12 w-12 border-4 border-t-blue-600 border-gray-300 rounded-full"></div>
        <span className="ml-4 text-xl font-medium text-gray-700">
          Logging out...
        </span>
      </div>
    );

  if (user === null && loading) return <Navigate to="/login" replace />;

  const handleEditClick = () => {
    setShowMenu((prev) => !prev);
  };

  const handleSaveClick = async (e) => {
    console.log("Saving:", field, inputValue);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login/userInfo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ field, inputValue }),
        credentials: 'include',
      });

      const data = await res.json();
      console.log('Response from backend:', data);

      if (res.ok) {
        setUser(prev => ({
          ...prev,
          data: {
            ...prev.data,
            [field === "Name" ? "fullName" :
              field === "Email" ? "email" :
                field === "UserName" ? "userName" :
                  field === "Contact" ? "contact" : field
            ]: inputValue
          }
        }));
        setShowMenu(false);
        setField(null);
        setInputValue(null);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const handleLogoutClick = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login/userInfo/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await res.json();
    setUser(undefined);

    setTimeout(() => {
      navigate('/home');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center px-4 py-10">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full border border-blue-200">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          User Dashboard
        </h2>

        <div className="space-y-4 text-blue-800 text-base">
          <p><span className="font-semibold">Name:</span> {user?.data?.fullName || "—"}</p>
          <p><span className="font-semibold">Email:</span> {user?.data?.email || "—"}</p>
          <p><span className="font-semibold">Username:</span> {user?.data?.userName || "—"}</p>
          <p><span className="font-semibold">Contact:</span> {user?.data?.contact || "—"}</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
          <button
            onClick={handleEditClick}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2.5 rounded-md w-full text-base font-medium cursor-pointer"
          >
            Edit
          </button>

          <button
            onClick={handleSaveClick}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2.5 rounded-md w-full text-base font-medium cursor-pointer"
          >
            Save
          </button>
        </div>

        {showMenu && <UserDashboardMenu />}
      </div>

      <div className="mt-10">
        <button
          onClick={handleLogoutClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-base font-semibold shadow-md cursor-pointer mt-10"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserOutlet;
