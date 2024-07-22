import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Protecdet = () => {
  const authData = useSelector(state => state)
  if (!authData.token) {
    return <Navigate to="/auth"/>
  }
  else{
    return (<Outlet/>)
  }
}

export default Protecdet
