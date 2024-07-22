import React from 'react'
import { Button, notification, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const Home = () => {

const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'Bir necha soniyalarda sizni Auth sahifasiga olib utamiz',
      description:
        'Saytimiz 1.0.0 versiyasida ishga tushdi,hozirda faqat Login va Register sahifalari  mavjud.',
      duration: 7,
      
    });
    setTimeout(() => {
      navigate('/auth')
    },8000)
  };
  return (
    <div className='h-screen w-full flex items-center justify-center'>
       {contextHolder}
       <Button onClick={() => openNotificationWithIcon('info')}>Go</Button>
    </div>
  )
}

export default Home
