import { Layout } from 'antd'
import  { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar';
import Hearder from '../../components/dashboard_header/DashboardHearder';
import {useFetch} from '../../hooks/useFetch'

const { Content } = Layout

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const [data, loading] = useFetch("/auth/profile") 
  return (
    <Layout className='h-screen'>
      <Sidebar collapsed={collapsed} userProfileData={data?.payload}  loading={loading}/>
      <Layout>
        <Hearder collapsed={collapsed} setCollapsed={setCollapsed}/>
        <Content
        className='bg-white shadow rounded-xl my-6 mx-4 p-6 min-h-[280px] overflow-scroll'
          > 
         
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  )
}

export default Dashboard
