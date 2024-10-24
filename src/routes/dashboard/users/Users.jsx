import { Button, Modal, notification } from "antd";
import TableComponent from "../../../components/table/Table";
import { DashboardTitle } from "../../../utils";
import { useState } from "react";
import axios from "../../../api";

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 8,
    },
  });

  const [userToPromote, setUserToPromote] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);

    try {
      const res = await axios.post("admin/add-admin", {
        username: userToPromote.username, 
      });
      
      notification.success({
        message: 'User Promoted',
        description: 'User has been promoted.',
      });

      setTimeout(() => {
        location.reload();
      }, 200);
    } catch (error) {
      console.log(error);
      notification.error({
        message: 'Error',
        description: 'Failed to promote user.',
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeUserPromotion = (user) => {
    setUserToPromote(user);
    showModal();
  };

  const columns = [
    {
      title: 'No.',
      key: "id",
      render: (text, record, index) =>
        tableParams.pagination.pageSize * (tableParams.pagination.current - 1) + (index + 1),
      width: '10%',
    },
    {
      key: "First_name",
      title: 'Firstname',
      dataIndex: 'first_name',
      sorter: true,
    },
    {
      key: "Last_name",
      title: 'Username',
      dataIndex: 'username',
      sorter: true,
    },
    {
      key: "Role",
      title: 'Role',
      dataIndex: 'role',
      sorter: true,
    },
    {
      key: "Created_at",
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (data) => new Date(data).toLocaleDateString('uz-UZ', { timeZone: 'Asia/Tashkent' }),
      sorter: true,
    },
    {
      key: "Action",
      title: 'Action',
      render: (user) => (
        <Button type="primary" onClick={() => handleChangeUserPromotion(user)}>Promote</Button>
      ),
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <DashboardTitle>Users 👤</DashboardTitle>
      </div>
      <TableComponent
        columns={columns}
        tableParams={tableParams}
        setTableParams={setTableParams}
        url="/admin/registered-users"
      />
      <Modal
        maskClosable={false}
        title="Promote User"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to promote {userToPromote?.username}?</p>
      </Modal>
    </div>
  );
};

export default Users;
