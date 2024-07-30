import { MdOutlineDelete } from "react-icons/md";
import { MdSend } from "react-icons/md";
import { useEffect, useState } from "react";
import { Button, Form, Input, notification , Modal} from "antd";
import axios from "../../api";
import { DashboardTitle } from "../../utils";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Space, Switch } from 'antd';
import "./Notification.css"






const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
};
const NotificationComponent = () => {

    const [listNotification, setListNotification] = useState([]);
    const [deleteNotification, setDeleteNotification] = useState(null);
    const [form] = Form.useForm();
    






    const RenderingNotification = async () => {
        try {
            const res = await axios.get("/notifications/all");
            setListNotification(res.data.payload);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        RenderingNotification();
    }, []);

    

    const onFinish = async (values) => {
        const notificationMessage = values.message.trim();
        

        if (notificationMessage.length >= 5 ){
            try {
                const res = await axios.post("/notifications/create", {
                    message: notificationMessage,
                });
                await RenderingNotification();
                notification.success({
                    message: "Success",
                    description: `Notification has been created.`,
                })
                form.resetFields();
            } catch (error) {
                notification.error({
                    message: "Error",
                    description: `Something went wrong.`,
                })

            }
        }
        else{
            notification.error({
                message: "Error",
                description: `Do not leave the message field empty or less than 5 characters.`,
            })
        }
    };


      const handledeleteNotification = async () => {
        try {
          const res = await axios.delete(`/notifications/delete/${deleteNotification._id}`);
          notification.success({
              message: "Success",
              description: `Notification has been deleted.`,
            })
            RenderingNotification();

        } catch (error) {
          console.log(error);
        }
        setDeleteNotification(null);
      };

    return (
        <div>
            <Form
                form={form}
                layout="vertical"
                name="basic"
                style={{
                    width: "100%",

                    display: "flex",
                    alignItems: "end",
                    justifyContent: "start",
                    gap: "10px",
                    padding: "10px",
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Notification message"
                    name="message"
                    className="w-2/3 search_input"
                    rules={[
                        {
                            required: true,
                            message: "Please input your notification!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        span: 24,
                    }}
                    className="w-1/3"
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-[130px] text-[18px]"
                    >
                        <MdSend /> Send
                    </Button>
                </Form.Item>
            </Form>
            <div>
                <DashboardTitle> Notifications 🔔</DashboardTitle>
                <div>
                    {
                        listNotification.map((item, index) => {
                            return (
                                <div key={index} className="border p-3 mb-3 rounded-xl flex justify-between items-center gap-7">
                                    <p className="text-[18px]">{item.message}</p>
                                    <div>
                                        <Switch
                                            checkedChildren={<CheckOutlined />}
                                            unCheckedChildren={<CloseOutlined />}
                                            defaultChecked
                                        />
                                        <Button danger type="primary" className="text-[18px]" onClick={() => setDeleteNotification(item)}><MdOutlineDelete /> Delete</Button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <Modal
                    centered
                    maskClosable={false}
                    title={`Delete Notification`}
                    open={Boolean(deleteNotification)}
                    onOk={handledeleteNotification}
                    onCancel={() => setDeleteNotification(null)}
                    okButtonProps={{
                        danger: true
                    }}
                >
                    Are you really going to delete this notification?
                </Modal>
            </div>
        </div>
    );
};
export default NotificationComponent;
