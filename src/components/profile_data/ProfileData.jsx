import React from "react";
import { DashboardTitle, Loading } from "../../utils";
import { Image, Typography, Modal, notification, Button, } from "antd";
import { GiCancel } from "react-icons/gi";
import { useState } from 'react';
import axios from "../../api";
import { useFetch } from "../../hooks/useFetch";
import NotificationForm from "../notification_form/NotificationForm";

const { Title, Text } = Typography;


const ProfileData = ({ profileData, loading }) => {
  const [notificationData] = useFetch("/notifications/all")
  const notificationAll = notificationData?.payload;
  const [deleteNotification, setDeleteNotification] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData,isLoading] = useFetch("/auth/profile")
  const Role = userData?.payload?.role
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };



  const sortedNotifications = notificationAll?.sort((a, b) =>
    new Date(b.announcedDate) - new Date(a.announcedDate)

  );

  const handleDeleteNotification = async () => {
    try {
      const res = await axios.delete(`/notifications/delete/${deleteNotification?._id}`);
      notification.error({
        message: 'Notification Deleted',
        description: 'Notification has been deleted.',
      });
      setTimeout(() => {
        location.reload()
      }, 500);
    } catch (error) {
      console.log(error)
    }
    setDeleteNotification(null)
  }
  return (
    <div className="my-8">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="flex items-center gap-20 just px-[100px] border-2 py-[50px] rounded-2xl bg-[#eaeaea]">
            <div>
              {profileData?.photo_url ? (
                <Image

                  className="rounded-full object-cover"
                  width={250}
                  height={250}


                  src={profileData?.photo_url}
                />
              ) : (
                <Image

                  className="rounded-full "
                  width={250}
                  height={250}

                  src="https://api-private.atlassian.com/users/9d089fc206ccd5f801b32118098c691f/avatar"
                />
              )}
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center  gap-5">
                <strong className="text-xl ">Firstname:</strong>
                <Title style={{ margin: 0, color: "dodgerblue" }} level={4}>
                  {profileData?.first_name} {profileData?.last_name}
                </Title>
              </div>
              <div className="flex items-center  gap-5">
                <strong className="text-xl ">Username:</strong>
                <Title style={{ margin: 0, color: "dodgerblue" }} level={4}>
                  {profileData?.username} {profileData?.last_name}
                </Title>
              </div>
              <div className="flex items-center  gap-5">
                <strong className="text-xl ">Role:</strong>
                <Title style={{ margin: 0, color: "dodgerblue" }} level={4}>
                  {profileData?.role} {profileData?.last_name}
                </Title>
              </div>
              <div className="flex items-center  gap-5">
                <strong className="text-xl ">Created At:</strong>
                <Title style={{ margin: 0, color: "dodgerblue" }} level={4}>
                  {new Date(profileData?.createdAt).toLocaleDateString('uz-UZ', { timeZone: 'Asia/Tashkent' })}
                </Title>
              </div>
              <div className="flex items-center  gap-5">
                <strong className="text-xl ">Updated At:</strong>
                <Title style={{ margin: 0, color: "dodgerblue" }} level={4}>
                  {new Date(profileData?.updatedAt).toLocaleDateString('uz-UZ', { timeZone: 'Asia/Tashkent' })}
                </Title>
              </div>
            </div>

          </div>
            <div style={Role === "admin" ? { display: "block" } : { display: "none" }}>
              <div className="my-8 flex items-center justify-between">
                <DashboardTitle >Notifications 🔔</DashboardTitle>
                <Button className="mr-8" size="large" type="primary" onClick={showModal}>Send Notification</Button>
              </div>
              <div>
                <div className='grid grid-cols-3 gap-4 '>
                  {
                    notificationAll?.map((item) => {
                      return (
                        <div key={item._id} style={item.active ? { backgroundColor: "#66c53b" } : { backgroundColor: "#f0f0f0" }} className='border p-7 rounded-[20px] flex items-center justify-between'>
                          <div className="flex flex-col gap-2">
                            <h2 style={item.active ? { color: "white" } : { color: "#000" }} className='  text-[22px] font-bold'>{item.message} </h2>
                            <p style={item.active ? { color: "white" } : { color: "#000" }} className=' text-[14px]  '> Announced Date:  {new Date(item?.announcedDate).toLocaleDateString('uz-UZ', { timeZone: 'Asia/Tashkent' })}</p>
                          </div>
                          <GiCancel onClick={() => setDeleteNotification(item)} className="text-3xl cursor-pointer text-white" />
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <Modal
                centered
                maskClosable={false}
                title={`Delete Notification`}
                open={Boolean(deleteNotification)}
                onOk={handleDeleteNotification}
                onCancel={() => setDeleteNotification(null)}
                okButtonProps={{
                  danger: true
                }}
              >
                <p>Are you sure you want to delete this product?</p>
              </Modal>
              <Modal
                centered
                maskClosable={false}
                footer={null}
                title="Send Notification"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}>
                <NotificationForm setIsModalOpen={setIsModalOpen} />
              </Modal>
            </div>
        </div>
      )}
    </div>
  );
};

export default ProfileData;
