// UserOutlet.jsx
import React, { useContext, useState,useEffect } from "react";
import { UserContext } from "../UserContext";
import { UpdatedInfoContext } from "../UpdatedInfoContext"; // ✅ new import
import UserDashboardMenu from "./UserDashboardMenu";
import { useNavigate } from "react-router-dom";



const UserOutlet = () => {
  const { user ,setUser} = useContext(UserContext);
  const { field, inputValue,setField,setInputValue } = useContext(UpdatedInfoContext); // ✅ use context
  const [showMenu, setShowMenu] = useState(false);
  const[loading,setLoading]=useState(false);

  
  const navigate=useNavigate();


  const verifyUser=async()=>{
  try {
    const res=await fetch('/api/login/userInfo',{
      method: "GET",
      credentials: "include",
    })

    const data=await res.json();
   // console.log(data.data);

    if(res.ok )
    {
      setUser(data)
      setLoading(true);
    }

  } catch (error) {
    console.log(error)
  }
}

useEffect(()=>{
  verifyUser()
},[])



    if (user === undefined && loading) return <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="animate-spin h-12 w-12 border-4 border-t-blue-600 border-gray-300 rounded-full"></div>
  <span className="ml-4 text-xl font-medium text-gray-700">
    Logging out...
  </span>
</div>

if (user === null && loading) return <Navigate to="/login" replace />;

  const handleEditClick = () => {
    setShowMenu((prev) => !prev);
  };

  const handleSaveClick = async (e) => {
    console.log("Saving:", field, inputValue); 
    
    
   try {
    const res=await fetch('/api/login/userInfo',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({field,inputValue}), // Send the field and inputValue
        credentials: 'include'   // it is used to send cookies along with the req , before updation we need to make sure of who the user is therefore we send cookie along because it contains the access and refresh token thus we can verify the user 
      })

      const data = await res.json();
      console.log('Response from backend:', data); // response mai updated user ka info fetch karwa lenge 
      
      if(res.ok)
      {
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
        setShowMenu(false)
        setField(null)
        setInputValue(null)
        
      }

      
    
   } 
   catch (error) {
    console.log(error)
   }

  };



  const handleLogoutClick=async()=>{
    const res=await fetch('/api/login/userInfo/logout',
      {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials:'include'
        // there won't be any body that we would be sending while logging out 
        // we are simply sending the cookies and in the user logout controller we would be deleting the tokens from the cookie
      }
    )
    const data=await res.json()
    setUser(undefined);

    
    //alert(data.message)
    // after logging out we would navigate or redirect to home page
    

    setTimeout(() => {
      
      navigate('/home')
    }, 1000);
   

  }




  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full border border-blue-200">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">
          User Dashboard
        </h2>

        <div className="space-y-3 text-blue-700 text-base">
          <p><span className="font-medium">Name:</span> {user?.data?.fullName ||  "—" }</p>
          <p><span className="font-medium">Email:</span> {user?.data?.email || "—"}</p>
          <p><span className="font-medium">Username:</span> {user?.data?.userName || "—"}</p>
          <p><span className="font-medium">Contact:</span> {user?.data?.contact || "—"}</p>
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
        <button onClick={handleLogoutClick}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-32 cursor-pointer"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserOutlet;
