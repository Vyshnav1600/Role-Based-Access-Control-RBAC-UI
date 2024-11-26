import React, { useState } from "react";
import { Input, Button, Form, Typography, Alert, Spin } from "antd";

const { Title, Text } = Typography;

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    const validCredentials = {
      username: "admin",
      password: "admin",
    };

    if (
      credentials.username === validCredentials.username &&
      credentials.password === validCredentials.password
    ) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onLogin();
      }, 1000);
    } else {
      setErrorMessage("Invalid username or password.");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: 400,
          padding: 24,
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Title level={3} style={{ textAlign: "center" }}>
          Welcome Back!
        </Title>
        <Text
          type="secondary"
          style={{ display: "block", textAlign: "center", marginBottom: 16 }}
        >
          Sign in to continue
        </Text>
        {errorMessage && (
          <Alert
            message={errorMessage}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}
        <Form layout="vertical">
          <Form.Item label="Username">
            <Input
              placeholder="Enter your username"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              onKeyDown={handleKeyDown}
            />
          </Form.Item>
          <Form.Item label="Password">
            <Input.Password
              placeholder="Enter your password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              onKeyDown={handleKeyDown}
            />
          </Form.Item>
          <Button type="primary" block onClick={handleLogin}>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
