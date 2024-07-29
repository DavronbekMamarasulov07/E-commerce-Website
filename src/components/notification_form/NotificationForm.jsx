import { Button, Form, Input,  notification } from 'antd';
import axios from '../../api';
import { useFetch } from '../../hooks/useFetch';

const NotificationForm = ( {setIsModalOpen}) => {
    const [userData, isLoading] = useFetch("/auth/profile")
    const userRole = userData?.payload?.role



    const onFinish = async (values) => {
        try {
            const res = await axios.post("/notifications/create", values);
            notification.success({
                message: 'Success',
                description: 'Notification has been sent.',
            });
            setIsModalOpen(false)
            setTimeout(() => {
                location.reload()
            },500)
        } catch (error) {
            console.error(error);
            notification.error({
                message: 'Error',
                description: 'Failed to send notification.',
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.error('Failed:', errorInfo);
    };
  return (
   
      <Form
              layout='vertical'
              name="basic"
              style={{ width: '100%' }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="message"
                rules={[
                  {
                    required: true,
                    message: 'Please input your notification!',
                  },
                ]}
              >
                <Input.TextArea autoSize={{
                  minRows: 5,
                  maxRows: 8,
                }} />
              </Form.Item>

              <Form.Item
                wrapperCol={{ span: 16 }}
              >
                <Button loading={isLoading} disabled={isLoading} type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>

  )
}

export default NotificationForm
