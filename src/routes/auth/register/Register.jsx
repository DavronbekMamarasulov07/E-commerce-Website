import { Button, Checkbox, Divider, Form, Input, Typography, message, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../../api';
import { useDispatch, useSelector } from 'react-redux';
import { ERROR, LOADING, REGISTER_SUCCESS } from '../../../redux/actions/types';
import { GoogleLogin } from '@react-oauth/google';
import TelegramLoginButton from 'telegram-login-button'
import { useEffect } from 'react';



const { Title, Text } = Typography;


const Register = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const authData = useSelector(state => state)


  const onFinish = async (values) => {
    try {
      dispatch({ type: LOADING })
      const res = await axios.post("/auth", values);
      const data = res.data.payload
      if (res.status === 200 && data.token) {
        notification.success({
          message: 'Registration Successful',
          description: 'You have successfully registered.',
        });
        dispatch({ type: REGISTER_SUCCESS, user: data.user, token: data.token });
        setTimeout(() => {
          navigate("/auth")

        }, 2000)
      }
      else {
        throw new Error({ message: "Something went wrong" })
      }
      form.resetFields();

    } catch (error) {
      console.log(error);
      dispatch({ type: ERROR, message: error.res.data.message || error })
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
      <Title className='pb-8 block  ' level={1}><Link style={{ color: '#000' }} to="/">Register</Link></Title>
      <Form.Item
        label="Firstname"
        name="first_name"
        rules={[
          {
            required: true,
            message: "Please input your firstname!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        className='mb-4'
        defaultValue="Password"
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

      <Form.Item
        className='text-center'
      >
        <Button loading={authData.loading} disabled={authData.loading} type="primary " htmlType="submit" className='w-[70%] margin-auto'>
          Register
        </Button>
      </Form.Item>
      <Divider><Text>Or</Text></Divider>
      <div className='flex items-center justify-center w-full mb-5 gap-2 flex-col'>
        <GoogleLogin
          onSuccess={async credentialResponse => {
            const decodedData = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
            const user = {
              first_name: decodedData.given_name,
              username: decodedData.email,
              password: decodedData.sub,
            }
            try {
              dispatch({ type: LOADING })
              const res = axios.post("/auth", user);
              const data = res.data.payload;
              if (res.status === 200 && data.token) {
                notification.success({
                  message: 'Login Successful',
                  description: 'You have successfully logged in.',
                });
                dispatch({ type: REGISTER_SUCCESS, user: data.user, token: data.token });
                setTimeout(() => {
                  navigate("/dashboard")
                }, 2000)
              }
              else {
                throw new Error("Something went wrong");
              }
            } catch (error) {
              console.log(error);
              dispatch({ type: ERROR, message: error.response?.data?.message || error.message });
              notification.error({
                message: 'Login Failed',
                description: error.response?.data?.message || 'Something went wrong.',
              });
            }
            
            
          }}

          
          onError={() => {
            console.log('Login Failed')
          }}
        />
        <TelegramLoginButton
          botName="commerse_auth_bot"
          dataOnauth={(user) => console.log(user)}
        />
      </div>
      <Text className='text-center'>Already have an account? <Link to="/auth">Login</Link></Text>
    </Form>
  )
}

export default Register
