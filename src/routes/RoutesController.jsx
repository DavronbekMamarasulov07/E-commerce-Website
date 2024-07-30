import {lazy, useEffect, useState } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import Suspense from '../utils/index.jsx'
import { useSelector } from 'react-redux'


const Login = lazy (() => import('./auth/login/Login.jsx'))
const Register = lazy    (() => import('./auth/register/Register.jsx'))
const Products = lazy (() => import('./dashboard/products/Products.jsx'))
const Users = lazy (() => import('./dashboard/users/Users.jsx'))
const Profile = lazy (() => import('./dashboard/profile/Profile.jsx'))
const Category = lazy (() => import('./category/Category.jsx'))

const Home = lazy (() => import('./home/Home.jsx'))
const Auth = lazy (() => import('./auth/Auth.jsx'))
const Dashboard = lazy (() => import('./dashboard/Dashboard.jsx'))
const Protected = lazy (() => import('./protected/Protecdet.jsx'))
const NotFound = lazy (() => import('./not-found/NotFound.jsx'))
const Notification = lazy (() => import('./notification/Notification.jsx'))
const ProductDetails = lazy (() => import('./product_details/ProductDetails.jsx'))
const LikedProducts = lazy (() => import('./dashboard/liked_products/LikedProducts.jsx'))


const RoutesController = () => {
    const authData = useSelector(state => state)
    const [role , setRole] = useState(null)


    useEffect(() => {
        if(authData && authData.token){
            setRole(JSON.parse(atob(authData?.token?.split('.')[1])).user?.role)
        }
    },[authData])


  return useRoutes([
    {
        path: "",
        element:<Suspense ><Home/></Suspense>,
        
    },
    {
        path: "auth",
        element: authData.token ? <Navigate to={`/dashboard`} /> : <Suspense ><Auth/></Suspense>,
        children: [
            {
                path: "",
                element: <Suspense ><Login/></Suspense>,
            },
            {
                path: "register",
                element:  <Suspense ><Register/></Suspense>,
            }
        ]
    },
    {
        path: "dashboard",
        element: <Suspense ><Protected/></Suspense>,
        children: [
            {
                path: "",
                element: <Suspense >
                    <Dashboard/>
                   </Suspense>,
                children: [
                    {
                        index: true,
                        path: "",
                        element:role && role === "admin" && <Suspense ><Products/></Suspense>,
                    },
                    {
                        path: "users",
                        element: role && role === "admin" && <Suspense ><Users/></Suspense>,
                    },
                    {
                        path: "profile",
                        element: <Suspense><Profile/></Suspense>,
                    },
                    {
                        path: "liked-products",
                        element: <Suspense ><LikedProducts/></Suspense>,
                    },
                    {
                        path: "notification",
                        element: <Suspense ><Notification/></Suspense>,
                    }
                ]
            },
            
        ]
    },
    {
        path:"product-details/:productId",
        element: <Suspense ><ProductDetails/></Suspense>,
    },
    {
        path: "category-list/:category",
        element: <Suspense ><Category/></Suspense>,
    },
    {

        path: "*",
        element: <Navigate to="not-found" />
    },
    {
        path: "not-found",
        element: <Suspense ><NotFound/></Suspense>,
    }
    
    
  ])
}

export default RoutesController
