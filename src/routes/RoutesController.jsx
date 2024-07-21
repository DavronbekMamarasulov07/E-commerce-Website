import React from 'react'
import { useRoutes } from 'react-router-dom'
import Home from './home/Home'
import Login from './auth/login/Login'
import Register from './auth/register/Register'
import Auth from './auth/Auth'

const RoutesController = () => {
  return useRoutes([
    {
        path: "",
        element: <Home/>,
        
    },
    {
        path: "auth",
        element: <Auth/>,
        children: [
            {
                path: "",
                element: <Login/>
            },
            {
                path: "register",
                element: <Register/>
            }
        ]
    }
  ])
}

export default RoutesController
