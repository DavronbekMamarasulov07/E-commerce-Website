import React from "react";
import {  Loading } from "../../utils";
import { Image, Typography } from "antd";
import moment from "moment";
const { Title } = Typography;


const ProfileData = ({ profileData, loading }) => {
  

  
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
                  {moment(profileData?.createdAt).locale("uz").format("LLLL")}
                </Title>
              </div>
              <div className="flex items-center  gap-5">
                <strong className="text-xl ">Updated At:</strong>
                <Title style={{ margin: 0, color: "dodgerblue" }} level={4}>
                    {moment(profileData?.updatedAt).locale("uz").format("LLLL")}
                </Title>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileData;
