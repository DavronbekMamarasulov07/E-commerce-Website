import React from 'react'
import { Layout,Menu  } from 'antd'
const { Header, Sider, Content } = Layout;
import {
    UserOutlined,
    ProductOutlined
  } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const Sidebar = ({collapsed}) => {
    return (
        <Sider trigger={null} collapsible collapsed={collapsed} className='py-7 px-2'>
            <div className="demo-logo-vertical" />
            <Menu
                theme="dark"
                mode="inline"
                items={[
                    {
                        key: '1',
                        icon: <ProductOutlined />,
                        label: <NavLink end to="/dashboard">Products</NavLink>,
                    },
                    {
                        key: '2',
                        icon: <UserOutlined />,
                        label: <NavLink to="/dashboard/users">Users</NavLink>,
                    }
                ]}
            />
        </Sider>
    )
}

export default Sidebar
