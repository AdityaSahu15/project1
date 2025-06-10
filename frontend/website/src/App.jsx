import { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import './App.css'
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
import Orders from './components/Orders'
import Cart from './components/Cart';
import Footer from './components/Footer';
import Register from './components/Register';
import UserOutlet from './components/UserOutlet';
import { UserContext } from './UserContext';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<Login />}/>
       <Route path='/login/register' element={<Register/>}/>
       <Route path='/login/register/userInfo' element={<UserOutlet />}/>
       <Route path='/login/userInfo' element={<UserOutlet />}/>
      <Route path='/orders' element={<Orders />} />
      <Route path='/cart' element={<Cart />} />
    </Route>

  )
)

// different different routes mention karenge 

function App() {

const[user,setUser]=useState(null);

  return (
    <>
    <UserContext.Provider value={{user,setUser}}>
       <RouterProvider router={router} />
    </UserContext.Provider>
     
    </>
  )
}

export default App
