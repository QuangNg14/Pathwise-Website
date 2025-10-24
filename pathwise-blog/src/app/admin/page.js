"use client";
import { useState, useEffect } from 'react';
import { Layout, Button, Card, Statistic, Row, Col, message, Spin, Alert } from 'antd';
import { SyncOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const { Content } = Layout;

export default function AdminSyncPage() {
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSync = async () => {
    setSyncing(true);
    setSyncResult(null);
    
    try {
      const response = await fetch('/api/facebook/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ limit: 20 }),
      });

      const data = await response.json();

      if (data.success) {
        setSyncResult(data);
        message.success('Sync completed successfully!');
        // Refresh stats
        fetchStats();
      } else {
        message.error('Sync failed: ' + data.error);
      }
    } catch (error) {
      console.error('Sync error:', error);
      message.error('Failed to sync posts: ' + error.message);
    } finally {
      setSyncing(false);
    }
  };

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/facebook/sync');
      const data = await response.json();
      
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      message.error('Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats on component mount
  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Header current="admin" />
      <Content style={{ padding: '50px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <Card title="Facebook Group Posts Sync" style={{ marginBottom: '20px' }}>
          <Alert
            message="Admin Panel - Pathwise Blog"
            description="Use this page to sync posts from your Facebook Group to the blog. Posts will be uploaded to Cloudinary and stored in MongoDB."
            type="info"
            showIcon
            style={{ marginBottom: '20px' }}
          />

          <Row gutter={16} style={{ marginBottom: '20px' }}>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Total Posts in Database"
                  value={stats?.totalPosts || 0}
                  prefix={<CheckCircleOutlined />}
                  loading={loading}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Latest Post"
                  value={stats?.latestPost ? new Date(stats.latestPost.createdTime).toLocaleDateString() : 'N/A'}
                  loading={loading}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Button
                  type="primary"
                  icon={<SyncOutlined spin={syncing} />}
                  onClick={handleSync}
                  loading={syncing}
                  size="large"
                  style={{ width: '100%' }}
                  disabled={syncing}
                >
                  {syncing ? 'Syncing...' : 'Sync Now'}
                </Button>
              </Card>
            </Col>
          </Row>

          {syncResult && (
            <Card title="Sync Results" style={{ marginTop: '20px' }}>
              <Row gutter={16}>
                <Col span={6}>
                  <Statistic
                    title="Total Processed"
                    value={syncResult.stats.total}
                    valueStyle={{ color: '#1890ff' }}
                  />
                </Col>
                <Col span={6}>
                  <Statistic
                    title="Synced"
                    value={syncResult.stats.synced}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<CheckCircleOutlined />}
                  />
                </Col>
                <Col span={6}>
                  <Statistic
                    title="Skipped (Duplicates)"
                    value={syncResult.stats.skipped}
                    valueStyle={{ color: '#faad14' }}
                  />
                </Col>
                <Col span={6}>
                  <Statistic
                    title="Errors"
                    value={syncResult.stats.errors}
                    valueStyle={{ color: '#cf1322' }}
                    prefix={<CloseCircleOutlined />}
                  />
                </Col>
              </Row>
            </Card>
          )}
        </Card>

        <Card title="Instructions">
          <ol style={{ lineHeight: '2' }}>
            <li><strong>Click "Sync Now"</strong> to fetch the latest 20 posts from your Facebook Group</li>
            <li>Posts will be automatically:
              <ul>
                <li>Fetched from Facebook Group (ID: 756561709660282)</li>
                <li>Images uploaded to Cloudinary</li>
                <li>Stored in MongoDB (pathwise database, posts collection)</li>
                <li>Displayed on the blog page</li>
              </ul>
            </li>
            <li>Duplicate posts will be skipped automatically</li>
            <li>Original blog posts will remain and be displayed alongside Facebook posts</li>
          </ol>
        </Card>
      </Content>
      <Footer />
    </Layout>
  );
}

