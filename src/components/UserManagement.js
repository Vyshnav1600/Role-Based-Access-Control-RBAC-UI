import React, { useState } from "react";
import {
  Table,
  Button,
  Input,
  Select,
  Tag,
  Modal,
  Form,
  Popconfirm,
  message,
} from "antd";

const { Option } = Select;

const UserManagement = ({ roles, users, setUsers }) => {
  const [newUser, setNewUser] = useState({
    id: null,
    name: "",
    email: "",
    role: "",
    status: "Active", // Default status
  });
  const [isEditing, setIsEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [form] = Form.useForm(); // Ant Design Form for validation

  const resetForm = () => {
    setNewUser({
      id: null,
      name: "",
      email: "",
      role: "",
      status: "Active",
    });
    form.resetFields(); // Clear form fields
    setIsEditing(false);
  };

  const handleAddOrEditUser = () => {
    form
      .validateFields()
      .then(() => {
        if (isEditing) {
          // Update existing user
          setUsers((prev) =>
            prev.map((user) => (user.id === newUser.id ? newUser : user))
          );
        } else {
          // Add new user
          setUsers((prev) => [...prev, { ...newUser, id: prev.length + 1 }]);
        }
        resetForm();
        setModalVisible(false);
      })
      .catch((info) => {
        console.error("Validation failed:", info);
      });
  };

  const handleEditUser = (user) => {
    setNewUser(user); // Set current user details to the form
    setIsEditing(true);
    setModalVisible(true);
    form.setFieldsValue(user); // Populate form with existing user data
  };

  const handleAddUser = () => {
    resetForm(); // Reset form state for adding a new user
    setModalVisible(true);
    form.setFieldsValue({
      name: "",
      email: "",
      role: "",
      status: "Active",
    }); // Explicitly reset form fields for new user
  };

  const handleDeleteUser = (id) => {
    const userToDelete = users.find((user) => user.id === id);

    if (userToDelete.status === "Active") {
      message.warning("Cannot delete an active user.", 3);
      return;
    }

    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const handleToggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active",
            }
          : user
      )
    );
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      render: (_, user) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button onClick={() => handleEditUser(user)}>Edit</Button>
          <Button
            style={{
              backgroundColor: user.status === "Active" ? "green" : "red",
              color: "white",
              border: "none",
            }}
            onClick={() => handleToggleStatus(user.id)}
          >
            {user.status === "Active" ? "Set Inactive" : "Set Active"}
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDeleteUser(user.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" block onClick={handleAddUser}>
        Add User
      </Button>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        scroll={{ x: 600 }}
      />
      <Modal
        title={isEditing ? "Edit User" : "Add User"}
        visible={modalVisible}
        onOk={handleAddOrEditUser}
        onCancel={() => {
          resetForm();
          setModalVisible(false);
        }}
        width="90%"
        style={{ maxWidth: 500 }}
      >
        <Form
          form={form}
          layout="vertical"
          onValuesChange={(changedValues) =>
            setNewUser((prev) => ({
              ...prev,
              ...changedValues,
            }))
          }
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Name is required!" }]}
          >
            <Input placeholder="Enter user's name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email is required!" },
              { type: "email", message: "Invalid email format!" },
            ]}
          >
            <Input placeholder="Enter user's email" />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Role is required!" }]}
          >
            <Select placeholder="Select a role">
              {roles.map((role) => (
                <Option key={role.id} value={role.name}>
                  {role.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Select>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserManagement;
