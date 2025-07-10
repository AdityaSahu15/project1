import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
function Layout() {
  return (
    <>
  <Toaster
  position="top-center"
  toastOptions={{
     duration: 2000,
    // Default style for all toasts
    style: {
      background: '#f9f9f9', // Off-white background
      color: '#333',          // Default text color
      fontWeight: '500',
      marginTop: '4rem',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
    },
    // Success toast style
    success: {
      style: {
        color: '#059669', // Green text
      },
      iconTheme: {
        primary: '#10b981',
        secondary: '#f0fdf4',
      },
    },
    // Error toast style
    error: {
      style: {
        color: '#ef4444', // Red text
      },
      iconTheme: {
        primary: '#ef4444',
        secondary: '#fee2e2',
      },
    },
  }}
/>


      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout