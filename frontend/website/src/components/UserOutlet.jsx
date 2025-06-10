import React, { useContext } from "react";
import { UserContext } from "../UserContext";

const UserOutlet = () => {
  const { user } = useContext(UserContext)
  // console.log(user)
  // console.log(user?.data.email)

  const handleEditClick=()=>{
    
  }

  const handleSaveClick=()=>{

  }

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full border border-blue-300">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          User Dashboard
        </h2>

        <div className="space-y-4 text-blue-500 text-md mt-8">

          <p>
            <span className="font-semibold">Name:</span> {user?.data.fullName || "—"}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user?.data.email || "—"}
          </p>
          <p>
            <span className="font-semibold">Username:</span> {user?.data.userName || "—"}
          </p>
          <p>
            <span className="font-semibold">Contact:</span> {user?.data.contactNo || "—"}
          </p>
        </div>

        <div className="flex gap-x-56 mt-10">

        <button onClick={handleEditClick}
            className="bg-red-400 hover:bg-red-500 text-white font-semibold px-6 py-2 rounded-lg transition duration-300 shadow-md cursor-pointer"
          >
            Edit
          </button>
          <button onClick={handleSaveClick}
            className="bg-green-400 hover:bg-green-500 text-white font-semibold px-6 py-2 rounded-lg transition duration-300 shadow-md cursor-pointer"
          >
            Save
          </button>

        </div>

       
      </div>

       <div className="mt-16 text-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-300 shadow-md cursor-pointer"
          >
            Log Out
          </button>
        </div>

    </div>
  );
};

export default UserOutlet;
