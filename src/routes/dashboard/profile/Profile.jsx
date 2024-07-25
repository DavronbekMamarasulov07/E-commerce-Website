import { Button, Modal,Typography } from "antd"
import ProfileData from "../../../components/profile_data/ProfileData"
import { useFetch } from "../../../hooks/useFetch"
import { DashboardTitle } from "../../../utils"
import { useState } from "react"
import ProfileForm from "../../../components/profile_form/ProfileForm"

const { Title } = Typography
const Profile = () => {
  const [data, loading] = useFetch("/auth/profile")
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);

  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleUpdateUser = () => {
    setIsModalOpen(true);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <DashboardTitle>Profile 🧑🏻‍💻</DashboardTitle>
        <Button size="large" disabled={true} onClick={handleUpdateUser} type="primary">Update Profile</Button>
      </div>
      <ProfileData handleUpdateUser={handleUpdateUser} profileData={data?.payload} loading={loading} />
      <Modal
        centered
        maskClosable={false}
        footer={null}
        title={<Title level={2}>Update Profile </Title>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <ProfileForm />
      </Modal>
    </div>
  )
}

export default Profile
