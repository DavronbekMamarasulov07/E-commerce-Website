import { BsFillDoorOpenFill } from "react-icons/bs";
import React, { useState } from "react";
import {
    Avatar,
    Badge,
    Button,
    Layout,
    Menu,
    Modal,
    Skeleton,
    Typography,
    notification,
} from "antd";
const { Sider } = Layout;
const { Text } = Typography;
import { UserOutlined, ProductOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SIGN_OUT } from "../../redux/actions/types";
import "./Sidebar.css";

const Sidebar = ({ collapsed, userProfileData, loading }) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState("You will be signed out");


    const handleOk = () => {
        setModalText("Signed out successfully");

        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            dispatch({ type: SIGN_OUT });
            navigate("/auth");

            notification.success({
                message: 'Signed out successfully',
                description: 'You have been signed out successfully.',
            });
        }, 1500);
    };

    const handleCancel = () => {
        console.log("Clicked cancel button");
        setOpen(false);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSingOut = () => {
        setOpen(true);
        
    };
    return (
        <>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                className="pt-1 pb-7 px-2 "
            >
                <div className="flex items-center gap-5 p-3  ">
                    <Badge size="large" count={3}>
                        {loading ? (
                            <Skeleton.Avatar active size={40} />
                        ) : (
                            <Avatar
                                src={userProfileData?.avatar}
                                className="bg-green-900"
                                size={40}
                            >
                                {userProfileData?.first_name[0]}
                            </Avatar>
                        )}
                    </Badge>
                    <Text className="text-white  flex flex-col mt-1 gap-1 whitespace-nowrap overflow-hidden">
                        {loading ? (
                            <Skeleton.Input
                                className=" max-w-[100px] leading-normal h-6 bg-blue-900"
                                active
                                size="small"
                            />
                        ) : (
                            <span className="text-[16px] font-bold">
                                {userProfileData?.first_name}
                            </span>
                        )}
                        {loading ? (
                            <Skeleton.Input
                                className=" max-w-[60px] h-3 bg-blue-900"
                                active
                                size="small"
                            />
                        ) : (
                            <span className="text-[12px] font-bold">
                                {userProfileData?.role}
                            </span>
                        )}
                    </Text>
                </div>
                <div className="flex flex-col justify-between flex-1 h-auto">
                    <Menu
                        theme="dark"
                        mode="inline"
                        items={[
                            {
                                key: "1",
                                icon: <ProductOutlined />,
                                label: (
                                    <NavLink end to="/dashboard">
                                        Products
                                    </NavLink>
                                ),
                            },
                            {
                                key: "2",
                                icon: <UserOutlined />,
                                label: <NavLink to="/dashboard/users">Users</NavLink>,
                            },
                        ]}
                    />
                    <Button
                        className="mt-auto mx-2 whitespace-normal"
                        danger
                        type="primary"
                        onClick={handleSingOut}
                    >

                        {!collapsed && (
                            <span className="text-[12px] whitespace-nowrap">Sign Out </span>
                        )}
                        <span><BsFillDoorOpenFill /></span>
                    </Button>
                </div>
            </Sider>
            <Modal
                maskClosable={false}
                title="Sign Out"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
            </Modal>
        </>
    );
};

export default Sidebar;
