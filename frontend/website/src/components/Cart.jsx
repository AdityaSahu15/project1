import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../UserContext'
import { useNavigate } from 'react-router-dom'


function Cart() {

  const navigate=useNavigate();
  const {user,setUser}=useContext(UserContext);
  const[cartItems,setCartItems]=useState([]);
  const[loading,setloading]=useState(false);

// basically what was happening is on every render/refresh the user is initially null and on seeing the user is null the redirection would take place while our verification took time .. so we made use of loader to redirect only if user is null and our verification is done 
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
      setUser(data?.data)
      setloading(true);
    }
    else{
      setUser(null)
    }

  } catch (error) {
    console.log(error)
    setUser(null)
  }finally{
    setloading(true)
  }
}

useEffect(()=>{
  verifyUser()
},[])



useEffect(()=>{

      if(!user && loading)
    navigate('/login',{
  state: {
    message: "Please login first to see your Cart"
  }
})
  },[user,navigate])


  const fetchCart = async () => {
      try {
        const res = await fetch("/api/cart", {
          method: "GET",
          credentials: "include", // for cookies
        });
        const data = await res.json();
        setCartItems(data.items || []);
      
      } catch (error) {
        console.error("Failed to fetch cart", error);
        
      }
    };


  useEffect(() => {
    if (user) fetchCart();
  }, [user,cartItems]);



  const updateQuantity = async (productId, type) => {
  try {
    const res = await fetch("/api/cart/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ productId, type }),
    });

    const data = await res.json();
    console.log(data);
    if (res.ok) {
      // Fetch updated cart again
      const updatedRes = await fetch("/api/cart", {
        method: "GET",
        credentials: "include",
      });
      const updatedData = await updatedRes.json();
      setCartItems(updatedData.items || []);
    } else {
      console.error("Update failed:", data.error);
    }
  } catch (err) {
    console.error("Failed to update quantity", err);
  }
};


const deleteItem=async(productId)=>{

  try {
    
    const res=await fetch("/api/cart/delete",{
    method:"DELETE",
    headers: {
        "Content-Type": "application/json",
      },
      credentials:"include",
      body: JSON.stringify({productId}),  
  })

  const data=res.json();
  console.log(data);

  if(res.ok)
  {
    setCartItems(data.items || [])
  }
  else
  {
    console.log(data.message)
  }  
  } catch (error) {
    console.log(error.message)
  }

}






  return (
    <>
    <div className=" h-screen max-w-4xl mx-auto p-6 mt-10">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">Your Cart</h1>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.productId._id}
            className="flex items-center justify-between bg-white shadow-md rounded p-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.productId.productImage}
                alt={item.productId.productName}
                className="w-30 h-24 object-cover rounded"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{item.productId.productName}</h2>
                <div className='flex gap-x-5'>
                  <p className="text-md text-gray-500">Qty: {item.quantity}</p>
                <div className='flex gap-x-1'>
                  <button onClick={()=>updateQuantity(item.productId._id,"dec")} className='bg-blue-300 w-5 rounded hover:bg-blue-400 cursor-pointer'>-</button>
                  <button onClick={()=>updateQuantity(item.productId._id,"inc")} className='bg-blue-300 w-5 rounded hover:bg-blue-400 cursor-pointer'>+</button></div>
                </div>
                <button onClick={()=> deleteItem(item.productId._id)} className='bg-red-700 p-1 rounded mt-3 cursor-pointer text-gray-200 transition duration-300'>
                  Remove item
                </button>
                
              </div>
            </div>
            <p className="text-green-600 font-bold text-lg">
              ₹{item.productId.productPrice * item.quantity}
            </p>
          </div>
        ))}
      </div>
      <p className='text-xl font-semibold mt-2 '>Total:</p>
    </div>

    </>
  )
}

export default Cart