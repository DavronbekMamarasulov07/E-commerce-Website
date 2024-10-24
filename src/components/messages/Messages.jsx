import { Carousel } from 'antd';
import axios from '../../api';
import { useEffect, useState } from 'react';
import { notification } from 'antd';
import  Container  from '../container/Container';
import "./Messages.css";


const Messages = () => {
    const [notificationsList, setNotificationsList] = useState([]);

    const fetchNotifications = async () => {
        try {
            const res = await axios.get("/notifications/all");
            setNotificationsList(res.data.payload);
        } catch (error) {
            console.log(error);
            notification.error({
                message: "Xato",
                description: "Yangiliklarni yuklashda xatolik yuz berdi!",
            });
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);


    const contentStyle = {
        margin: '0 auto',
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
    };
    
  return (
          <div className='w-full bg-black  '>
      <Container>
              <Carousel autoplay arrows effect="fade" infinite={true} className='w-full max-w-[500px] mx-auto overflow-auto'>
                  {notificationsList.map((notification) => (
                      <div
                          key={notification._id}
                          style={contentStyle}
                          className=''
                          
                      >
                          <p className="text-center carousel-bottom text-white py-2">{notification.message}</p>
                      </div>
                  ))}
              </Carousel>
      </Container>
          </div>
  )
}

export default Messages
