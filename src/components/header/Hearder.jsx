import React from "react";
import { Button, Layout} from 'antd';
const { Header } = Layout;import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
}from '@ant-design/icons';
import {  useNavigate } from "react-router-dom";

const HearderComponent = ({ collapsed, setCollapsed }) => {

  const navigate = useNavigate();
  return (
    <Header
      style={{
        padding: 0,
        background: "#fff",
      }}
    >
      <div className="flex justify-between items-center pr-12">
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
      <Button onClick={() => navigate("/")} danger type="primary" >Home 🏠</Button>
      </div>
    </Header>
  );
};

export default HearderComponent;
