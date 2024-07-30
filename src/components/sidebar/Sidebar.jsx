import { IoMdNotifications } from "react-icons/io"; 
import { AiFillBook, AiOutlineDropbox } from "react-icons/ai"; 
import { BsFillDoorOpenFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";
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
import { AiFillHeart } from "react-icons/ai";
import { useFetch } from "../../hooks/useFetch";
import "./Sidebar.css";

const Sidebar = ({ collapsed, userProfileData, loading }) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState("You will be signed out");
    const [trigger, setTrigger] = useState(false);
    const [count, setCount] = useState(0);
    const role = userProfileData?.role

    const [notificationData] = useFetch("/notifications/all", trigger);

    useEffect(() => {
        if (notificationData) {
            setCount(notificationData?.payload?.length);
        }
        setTrigger(!trigger);
    }, [notificationData]);

    
    const handleOk = () => {
        setModalText("Signed out successfully");

        setConfirmLoading(true);
        setOpen(false);
        setConfirmLoading(false);
        dispatch({ type: SIGN_OUT });
        navigate("/auth");

        notification.success({
            message: "Signed out successfully",
            description: "You have been signed out successfully.",
        });

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
                <NavLink to="/dashboard/profile" className="mb-6">
                    <div className="flex items-center gap-5 p-3  ">
                        <Badge className="h-10 w-10" count={count} overflowCount={10}>
                            {loading ? (
                                <Skeleton.Avatar active size={50} />
                            ) : (

                                userProfileData?.photo_url
                                    ?

                                    <Avatar size={50} src={userProfileData?.photo_url} className="rounded-full object-contain" />
                                    :
                                    <Avatar size={50} src="https://api-private.atlassian.com/users/9d089fc206ccd5f801b32118098c691f/avatar" />

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
                </NavLink>
                <div className="flex flex-col justify-between flex-1 h-auto">
                    <Menu
                        selectable={false}
                        theme="dark"
                        mode="inline"
                        items={role === "admin" ? [
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
                            {
                                key: "3",
                                icon: <AiFillHeart />,
                                label: <NavLink to="/dashboard/liked-products">Liked Products</NavLink>,
                            },
                            {
                                key: "4",
                                icon: <IoMdNotifications />,
                                label: <NavLink to="/dashboard/notification">Notification</NavLink>,
                            }
                        ] :
                            [
                                {
                                    key: "1",
                                    icon: <AiFillHeart />,
                                    label: <NavLink end to="/dashboard/liked-products">Liked Products</NavLink>,
                                }
                            ]

                        }
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
                        <span>
                            <BsFillDoorOpenFill />
                        </span>
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
