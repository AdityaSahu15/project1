import React, { useEffect } from 'react'
import { useContext } from 'react'
import { UserContext } from '../UserContext'
import { useNavigate } from 'react-router-dom'

function Orders() {
  
  const navigate=useNavigate()
  const {user}=useContext(UserContext)
  
  useEffect(()=>{
    if(!user)
    {
      navigate('/login',{
    state: {
    message: "Please login first to see your Orders"
    }
  })
    }
  },[user,navigate])


  return (
    <div>Orders</div>
  )
}

export default Orders