import { Layout } from 'antd'
import  { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar';
import Hearder from '../../components/header/Hearder';

const { Content } = Layout

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className='h-screen'>
      <Sidebar collapsed={collapsed}/>
      <Layout>
        <Hearder collapsed={collapsed} setCollapsed={setCollapsed}/>
        <Content
        className='bg-white shadow rounded-xl my-6 mx-4 p-6 min-h-[280px]'
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  )
}

export default Dashboard
