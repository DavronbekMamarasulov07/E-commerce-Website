import { Carousel } from "antd";
import { useFetch } from "../../hooks/useFetch";
import "./Not.css"


const NotificationMessage = () => {
    const [notificationData, setNotificationData] = useFetch("/notifications/all")
    const messages = notificationData.payload

    const contentStyle = {
        height: '100%',
        color: 'red',
        fontSize : "16px",
        textAlign: 'center',
        background: 'transparent',
          };

    return (
        <div className="bg-black">
            <Carousel arrows autoplay className="max-w-[500px] mx-auto overflow-hidden" autoplaySpeed={3000} infinite={true} effect="fade">
                {
                    messages?.map((item) =>
                        <div  className="text-center  p-2" key={item._id}>
                            <p  style={contentStyle}>{item.message}</p>
                        </div>
                    )

                }
            </Carousel>
        </div>
    )
}

export default NotificationMessage
