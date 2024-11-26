import React, { useState } from "react";
import Login from "./components/Login";
import UserManagement from "./components/UserManagement";
import RoleManagement from "./components/RoleManagement";
import { Layout, Button, Row, Col } from "antd";

const { Header, Content, Footer } = Layout;

function App() {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Admin",
      permissions: ["Read", "Write", "Delete"],
      status: "Active",
    },
    { id: 2, name: "Editor", permissions: ["Read", "Write"], status: "Active" },
    { id: 3, name: "Viewer", permissions: ["Read"], status: "Active" },
  ]);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      role: "Editor",
      status: "Inactive",
    },
  ]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {isLoggedIn ? (
        <>
          <Header
            style={{
              backgroundColor: "#ADD8E6",
              color: "#000",
              padding: "0 20px",
            }}
          >
            <Row justify="space-between" align="middle" wrap>
              <Col xs={24} sm={12} md={16}>
                <h1
                  style={{
                    margin: 0,
                    fontSize: "1.5rem",
                    textAlign: "center",
                    wordWrap: "break-word",
                  }}
                >
                  RBAC Management Dashboard
                </h1>
              </Col>
              <Col xs={24} sm={12} md={8} style={{ textAlign: "right" }}>
                <Button danger onClick={handleLogout}>
                  Logout
                </Button>
              </Col>
            </Row>
          </Header>
          <Content style={{ padding: 24 }}>
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={24} md={12}>
                <UserManagement
                  roles={roles}
                  users={users}
                  setUsers={setUsers}
                />
              </Col>
              <Col xs={24} sm={24} md={12}>
                <RoleManagement
                  roles={roles}
                  setRoles={setRoles}
                  users={users}
                />
              </Col>
            </Row>
          </Content>
          <Footer
            style={{
              backgroundColor: "#ADD8E6",
              color: "#000",
              textAlign: "center",
            }}
          >
            © 2024 RBAC Management System. All Rights Reserved.
          </Footer>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </Layout>
  );
}

export default App;
