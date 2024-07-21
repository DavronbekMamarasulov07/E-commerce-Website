import React from 'react'
import { Outlet } from 'react-router-dom'

const Auth = () => {
  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <Outlet />
    </div>
  )
}

export default Auth
