import React from 'react'
import { NavLink } from 'react-router-dom'
import cart from '../photos/cart.png';
import login from '../photos/login.jpeg';
import logo from '../photos/logo.jpeg';

function Navbar() {
    return (
        <div className='navbar bg-blue-300 text-black p-4 text-xl flex justify-evenly'>

            <img src={logo} alt="logo" style={{ width: '30px', height: 'auto' }} className='rounded-2xl' />

            <NavLink to="/home" className='hover:font-semibold'>
                Home
            </NavLink>

            <form  >
                <input
                    type="text"
                    placeholder="Search..."
                    className='border border-black rounded px-2'
                />
            </form>


            <div className='flex gap-x-2 cursor-pointer'>
                <img src={login} alt="login" style={{ width: '30px', height: 'auto' }}  className='rounded-2xl'/>
                <NavLink to='/login' className='hover:font-semibold'>
                    User
                </NavLink>

            </div>


            <NavLink to='/orders' className='hover:font-semibold'>
                Orders
            </NavLink>

            <div className='flex cursor-pointer '>
                <NavLink to='/cart' className='hover:font-semibold'>
                    Cart
                </NavLink >
                <img src={cart} alt="cart" style={{ width: '30px', height: 'auto' }} />
            </div>



        </div>
    )
}

export default Navbar