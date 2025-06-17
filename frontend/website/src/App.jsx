import { useState } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
import Orders from './components/Orders';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Register from './components/Register';
import UserOutlet from './components/UserOutlet';
import { UserContext } from './UserContext';
import { UpdatedInfoContext } from './UpdatedInfoContext'; // ✅ New import
import { useEffect } from 'react';
import ProductPage from './components/ProductPage';





const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/login/register' element={<Register />} />
      <Route path='/login/register/userInfo' element={<UserOutlet />} />
      <Route path='/login/userInfo' element={<UserOutlet />} />
      <Route path='/orders' element={<Orders />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/products' element={<ProductPage/>}/>
    </Route>
  )
);

function App() {
  const [user, setUser] = useState(null); // the global user state (instance of the user )
  const [field, setField] = useState(''); // after  login and registration the fields we wish to add/edit 
  const [inputValue, setInputValue] = useState(''); // the actual thing with which we want to replace the existing field value

 

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <UpdatedInfoContext.Provider value={{ field, setField, inputValue, setInputValue }}>
        <RouterProvider router={router} />
      </UpdatedInfoContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
