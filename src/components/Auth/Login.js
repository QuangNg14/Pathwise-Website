'use client';
import { useState } from 'react';
import { Button, Form, Input, Card, Typography, message, Divider } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';
import './Auth.css';

const { Title, Text } = Typography;

const Login = ({ onClose, switchToSignup }) => {
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();

  const onFinish = async (values) => {
    console.log('Login form submitted with values:', values);
    
    setLoading(true);
    try {
      console.log('Attempting to login with:', values.email);
      await login(values.email, values.password);
      message.success('Login successful!');
      onClose();
    } catch (error) {
      console.error('Login error:', error);
      message.error(error.message);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      message.success('Login successful!');
      onClose();
    } catch (error) {
      message.error(error.message);
    }
    setLoading(false);
  };

  return (
    <Card className="auth-card">
      <div className="auth-header">
        <Title level={2} className="auth-title">Welcome Back</Title>
        <Text className="auth-subtitle">Sign in to your Pathwise account</Text>
      </div>

      <Form
        name="login"
        onFinish={onFinish}
        layout="vertical"
        className="auth-form"
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input 
            prefix={<UserOutlined />} 
            placeholder="Enter your email" 
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password 
            prefix={<LockOutlined />} 
            placeholder="Enter your password" 
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            className="auth-button"
            size="large"
            block
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>

      <Divider>Or</Divider>

      <Button 
        onClick={handleGoogleLogin}
        loading={loading}
        className="google-button"
        size="large"
        block
        icon={<GoogleOutlined />}
      >
        Continue with Google
      </Button>

      <div className="auth-footer">
        <Text>Don&apos;t have an account? </Text>
        <Button type="link" onClick={switchToSignup} className="auth-link">
          Sign up here
        </Button>
      </div>
    </Card>
  );
};

export default Login;
