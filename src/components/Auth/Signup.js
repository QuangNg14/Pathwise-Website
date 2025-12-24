'use client';
import { useState } from 'react';
import { Button, Form, Input, Card, Typography, message, Divider } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';
import './Auth.css';

const { Title, Text } = Typography;

const Signup = ({ onClose, switchToLogin }) => {
  const [loading, setLoading] = useState(false);
  const { signup, loginWithGoogle } = useAuth();

  const onFinish = async (values) => {
    console.log('Signup form submitted with values:', values);
    
    if (values.password !== values.confirmPassword) {
      message.error('Passwords do not match!');
      return;
    }

    setLoading(true);
    try {
      console.log('Attempting to signup with:', values.email);
      await signup(values.email, values.password);
      message.success('Account created successfully!');
      onClose();
    } catch (error) {
      console.error('Signup error:', error);
      message.error(error.message);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      message.success('Account created successfully!');
      onClose();
    } catch (error) {
      message.error(error.message);
    }
    setLoading(false);
  };

  return (
    <Card className="auth-card">
      <div className="auth-header">
        <Title level={2} className="auth-title">Join Pathwise</Title>
        <Text className="auth-subtitle">Create your account to get started</Text>
      </div>

      <Form
        name="signup"
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
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Password must be at least 6 characters!' }
          ]}
        >
          <Input.Password 
            prefix={<LockOutlined />} 
            placeholder="Create a password" 
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          rules={[{ required: true, message: 'Please confirm your password!' }]}
        >
          <Input.Password 
            prefix={<LockOutlined />} 
            placeholder="Confirm your password" 
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
            Create Account
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
        <Text>Already have an account? </Text>
        <Button type="link" onClick={switchToLogin} className="auth-link">
          Sign in here
        </Button>
      </div>
    </Card>
  );
};

export default Signup;
