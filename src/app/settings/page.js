'use client';
import { useAuth } from '@/contexts/AuthContext';
import { Layout, Typography, Card, Form, Input, Button, message, Divider } from 'antd';
import HeaderComponent from '@/components/header/header';
import FooterComponent from '@/components/footer/Footer';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { updateProfile } from 'firebase/auth';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function SettingsPage() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!currentUser) {
      router.push('/');
    } else {
      form.setFieldsValue({
        displayName: currentUser.displayName,
        email: currentUser.email,
      });
    }
  }, [currentUser, router, form]);

  if (!currentUser) return null;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await updateProfile(currentUser, {
        displayName: values.displayName,
      });
      message.success('Profile updated successfully!');
    } catch (error) {
      console.error('Update error:', error);
      message.error(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <HeaderComponent />
      <Content className="page-padding">
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Title level={2}>Account Settings</Title>
          <Card bordered={false} className="settings-card">
            <Title level={4}>Personal Information</Title>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                displayName: currentUser.displayName,
                email: currentUser.email,
              }}
            >
              <Form.Item
                label="Display Name"
                name="displayName"
                rules={[{ required: true, message: 'Please input your display name!' }]}
              >
                <Input placeholder="Enter your name" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
              >
                <Input disabled />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Save Changes
                </Button>
              </Form.Item>
            </Form>

            <Divider />

            <Title level={4} type="danger">Danger Zone</Title>
            <Text type="secondary">Actions here cannot be undone.</Text>
            <div style={{ marginTop: 16 }}>
              <Button danger disabled>
                Delete Account
              </Button>
              <Text type="secondary" style={{ marginLeft: 16 }}>Contact support to delete your account.</Text>
            </div>
          </Card>
        </div>
      </Content>
      <FooterComponent />
    </Layout>
  );
}

