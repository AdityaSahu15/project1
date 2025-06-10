// UserOutlet.jsx
import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import UserDashboardMenu from "./UserDashboardMenu";

const UserOutlet = () => {
  const { user } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);

  const handleEditClick = () => {
    setShowMenu((prev) => !prev);
  };

  const handleSaveClick = () => {
    // Logic to save the changes

    
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full border border-blue-200">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">
          User Dashboard
        </h2>

        <div className="space-y-3 text-blue-700 text-base">
          <p><span className="font-medium">Name:</span> {user?.data.fullName || "—"}</p>
          <p><span className="font-medium">Email:</span> {user?.data.email || "—"}</p>
          <p><span className="font-medium">Username:</span> {user?.data.userName || "—"}</p>
          <p><span className="font-medium">Contact:</span> {user?.data.contactNo || "—"}</p>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleEditClick}
            className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Edit
          </button>

          <button
            onClick={handleSaveClick}
            className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Save
          </button>
        </div>

        {showMenu && <UserDashboardMenu />}
      </div>

      <div className="mt-10">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-32 cursor-pointer"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserOutlet;