import React from 'react'
import { Outlet } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';

const Auth = () => {
  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Outlet />
      </GoogleOAuthProvider>
    </div>
  )
}

export default Auth
