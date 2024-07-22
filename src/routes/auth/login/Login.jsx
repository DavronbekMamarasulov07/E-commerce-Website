import { Button, Checkbox, Divider, Form, Input, Typography, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../../api';
import { saveToLocalStorage } from '../../../helpers';
import { ERROR, LOADING, LOGIN_SUCCESS } from '../../../redux/actions/types';
import { useDispatch } from 'react-redux';
import { useState } from 'react'; 
import { GoogleLogin } from '@react-oauth/google';

const { Title, Text } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isToken, setIsToken] = useState(false);

  const onFinish = async (values) => {
    try {
      dispatch({ type: LOADING });
      const res = await axios.post("/auth/login", values);
      const data = res.data.payload;
      if (res.status === 200 && data.token) {
        notification.success({
          message: 'Login Successful',
          description: 'You have successfully logged in.',
        });
        dispatch({ type: LOGIN_SUCCESS, user: data.user, token: data.token });
        saveToLocalStorage('user', data.user);
        saveToLocalStorage('token', data.token);
        setTimeout(() => {
          navigate("/")

        }, 2000)
        setIsToken(true)

      } else {
        throw new Error("Something went wrong");
      }
      form.resetFields();
    } catch (error) {
      console.log(error);
      dispatch({ type: ERROR, message: error.response?.data?.message || error.message });
      notification.error({
        message: 'Login Failed',
        description: error.response?.data?.message || 'Something went wrong.',
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      form={form}
      name="basic"
      layout="vertical"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 24,
      }}
      style={{
        maxWidth: 450,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="w-full shadow flex flex-col max-w-[450px] important p-8 bg-white rounded-xl juctify-center"
    >
      <Title className='pb-8 block  ' level={1}><Link style={{ color: '#000' }} to="/">Login</Link></Title>

      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        className='mb-4'
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item className='text-center'>
        <Button disabled={isToken} type="primary" htmlType="submit" className='w-[70%] margin-auto'>
          Login
        </Button>
      </Form.Item>

      <Divider><Text>Or</Text></Divider>
      <div className='flex items-center justify-center w-full mb-5'>

        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed')
          }}
        />
      </div>

      <Text className='text-center'>Don't have an account? <Link to="/auth/register">Register</Link></Text>
    </Form>
  );
}

export default Login;
