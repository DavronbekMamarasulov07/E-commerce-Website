import React from 'react'
import { Button, notification, Space } from 'antd';

const Home = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };
  return (
    <div>
       {contextHolder}
       <Button onClick={() => openNotificationWithIcon('success')}>Success</Button>
    </div>
  )
}

export default Home
