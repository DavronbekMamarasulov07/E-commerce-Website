import { Carousel, Skeleton } from "antd";
import { useFetch } from "../../hooks/useFetch";
import "./Not.css";

const NotificationMessage = () => {
    const [notificationData, isLoading] = useFetch("/notifications/all");

    

    const contentStyle = {
        height: "100%",
        fontSize: "16px",
        textAlign: "center",
        background: "transparent",
    };

    return (
        <div className="bg-black flex items-center justify-center h-[40px]">
            {isLoading ? (
                <div className="w-full mx-auto">
                    <Skeleton.Input
                        active
                        className=" flex h-[40px] w-full max-w-[500px]"
                    />
                </div>
            ) : (
                <Carousel
                    arrows
                    autoplay
                    className="mx-auto max-w-[500px] overflow-hidden"
                    autoplaySpeed={3000}
                    infinite={true}
                    effect="fade"
                >
                        {notificationData.payload?.map((item) => (
                        <div className="p-2 text-center" key={item._id}>
                            <p style={contentStyle } className="text-red-600">{item.message}</p>
                        </div>
                    ))}
                </Carousel>
            )}
        </div>
    );
};

export default NotificationMessage;

