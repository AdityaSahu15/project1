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
import { UpdatedInfoContext } from './UpdatedInfoContext'; 
import { useEffect } from 'react';
import ProductPage from './components/ProductPage';
import ProductDetails from './components/ProductDetails';
import PrivacyPolicy from './components/PrivacyPolicy';
import Contact from './components/Contact';
import ForgotPassword from './components/ForgotPassword';
import SearchResults from './components/SearchResults';




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
       <Route index element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/login/register' element={<Register />} />
      <Route path='/login/userInfo' element={<UserOutlet />} />
      <Route path='/orders' element={<Orders />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/products' element={<ProductPage/>}/>
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path='/privacyPolicy' element={<PrivacyPolicy/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path="/products/search" element={<SearchResults />} />

    </Route>
    
  )
);

function App() {
  const [user, setUser] = useState(undefined); // the global user state (instance of the user )
  const [field, setField] = useState(''); // after  login and registration the fields we wish to add/edit 
  const [inputValue, setInputValue] = useState(''); // the actual thing with which we want to replace the existing field value

  const[cartItems,setCartItems]=useState([]);


useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await fetch("/api/login/userInfo", {
        method: "GET",
        credentials: "include",
      });
      const result = await res.json();
      setUser(res.ok ? result : null);  // here earlier we were setting the user with result.data .... but we did not need to do that since in the login componnent we are fetching the data by .. e.g. user?.data?.fullName   issiliye dikkat aa rhi thi
    } catch {
      setUser(null);
    }
  };

  fetchUser();
}, []);

// basically on every refresh we check if we already have a user logged in like in almost most of the websites .... if user has already logged in then on refresh we must preserve that state 



 

  return (
    <UserContext.Provider value={{ user, setUser,cartItems,setCartItems }}>
      <UpdatedInfoContext.Provider value={{ field, setField, inputValue, setInputValue }}>
        <RouterProvider router={router} />
      </UpdatedInfoContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
