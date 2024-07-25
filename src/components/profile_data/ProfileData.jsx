import React from "react";
import { Loading } from "../../utils";
import { Avatar, Typography } from "antd";

const { Title, Text } = Typography;

const ProfileData = ({ profileData, loading }) => {
  return (
    <div className="my-8">
      {loading ? (
        <Loading />
      ) : (
        <div className="flex items-center gap-20 just px-[100px] border-2 py-[50px] rounded-2xl bg-[#eaeaea]">
          <div>
            {profileData?.photo_url ? (
              <Avatar
                size={250}
                src={profileData?.photo_url}
                className="rounded-full"
              />
            ) : (
              <Avatar size={250} src="https://api-private.atlassian.com/users/9d089fc206ccd5f801b32118098c691f/avatar" className="border-2" />
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
                {profileData?.createdAt} {profileData?.last_name}
              </Title>
            </div>
            <div className="flex items-center  gap-5">
              <strong className="text-xl ">Updated At:</strong>
              <Title style={{ margin: 0, color: "dodgerblue" }} level={4}>
                {profileData?.updatedAt} {profileData?.last_name}
              </Title>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileData;
