import React, { useEffect } from 'react'
import { useContext } from 'react'
import { UserContext } from '../UserContext'
import { useNavigate } from 'react-router-dom'


function Cart() {

  const navigate=useNavigate();
  const {user}=useContext(UserContext);

  useEffect(()=>{
      if(!user)
    navigate('/login',{
  state: {
    message: "Please login first to see the cart"
  }
})
  },[user,navigate])
 

  return (

    
    <div>Cart</div>
  )
}

export default Cart