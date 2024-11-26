import React, { useState } from "react";
import {
  Table,
  Button,
  Input,
  Checkbox,
  Modal,
  Tag,
  Form,
  Popconfirm,
  Select,
  message,
} from "antd";

const { Option } = Select;

const RoleManagement = ({ roles, setRoles, users }) => {
  const [newRole, setNewRole] = useState({
    id: null,
    name: "",
    permissions: [],
    status: "Inactive",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [permissions] = useState(["Read", "Write", "Delete"]);
  const [modalVisible, setModalVisible] = useState(false);

  const [form] = Form.useForm();

  const resetForm = () => {
    setNewRole({
      id: null,
      name: "",
      permissions: [],
      status: "Inactive",
    });
    form.resetFields();
    setIsEditing(false);
  };

  const handleAddOrEditRole = () => {
    form
      .validateFields()
      .then(() => {
        const existingRole = roles.find(
          (role) => role.name.toLowerCase() === newRole.name.toLowerCase()
        );

        if (existingRole && (!isEditing || existingRole.id !== newRole.id)) {
          message.warning("This role name already exists!", 3);
          return;
        }

        if (isEditing) {
          setRoles((prev) =>
            prev.map((role) => (role.id === newRole.id ? newRole : role))
          );
        } else {
          setRoles((prev) => [...prev, { ...newRole, id: prev.length + 1 }]);
        }
        resetForm();
        setModalVisible(false);
      })
      .catch((info) => {
        console.error("Validation failed:", info);
      });
  };

  const handleEditRole = (role) => {
    setNewRole(role);
    setIsEditing(true);
    setModalVisible(true);
    form.setFieldsValue(role);
  };

  const handleAddRole = () => {
    resetForm();
    setModalVisible(true);
    form.setFieldsValue({
      name: "",
      permissions: [],
      status: "Inactive",
    });
  };

  const handleDeleteRole = (id) => {
    const roleToDelete = roles.find((role) => role.id === id);

    if (roleToDelete.status === "Active") {
      message.warning("Cannot delete an active role.", 3);
      return;
    }

    const isRoleInUse = users.some((user) => user.role === roleToDelete.name);
    if (isRoleInUse) {
      message.warning("Cannot delete a role that is assigned to a user.", 3);
      return;
    }

    setRoles((prev) => prev.filter((role) => role.id !== id));
  };

  const handleToggleStatus = (id) => {
    setRoles((prev) =>
      prev.map((role) =>
        role.id === id
          ? {
              ...role,
              status: role.status === "Active" ? "Inactive" : "Active",
            }
          : role
      )
    );
  };

  const columns = [
    {
      title: "Role",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Permissions",
      dataIndex: "permissions",
      render: (permissions) =>
        permissions.map((perm) => <Tag key={perm}>{perm}</Tag>),
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
      render: (_, role) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button onClick={() => handleEditRole(role)}>Edit</Button>
          <Popconfirm
            title="Are you sure you want to delete this role?"
            onConfirm={() => handleDeleteRole(role.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
          <Button
            style={{
              backgroundColor: role.status === "Active" ? "green" : "red",
              color: "white",
              border: "none",
            }}
            onClick={() => handleToggleStatus(role.id)}
          >
            {role.status === "Active" ? "Set Inactive" : "Set Active"}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" block onClick={handleAddRole}>
        Add Role
      </Button>
      <Table
        columns={columns}
        dataSource={roles}
        rowKey="id"
        scroll={{ x: 600 }}
      />
      <Modal
        title={isEditing ? "Edit Role" : "Add Role"}
        visible={modalVisible}
        onOk={handleAddOrEditRole}
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
            setNewRole((prev) => ({
              ...prev,
              ...changedValues,
            }))
          }
        >
          <Form.Item
            label="Role Name"
            name="name"
            rules={[{ required: true, message: "Role name is required!" }]}
          >
            <Input placeholder="Enter role name" />
          </Form.Item>
          <Form.Item
            label="Permissions"
            name="permissions"
            rules={[
              {
                required: true,
                message: "At least one permission is required!",
              },
            ]}
          >
            <Checkbox.Group
              options={permissions}
              value={newRole.permissions}
              onChange={(checkedValues) =>
                setNewRole((prev) => ({
                  ...prev,
                  permissions: checkedValues,
                }))
              }
            />
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

export default RoleManagement;
