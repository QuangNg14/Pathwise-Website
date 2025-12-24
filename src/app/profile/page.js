'use client';
import { useAuth } from '@/contexts/AuthContext';
import { Layout, Typography, Card, Descriptions, Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import HeaderComponent from '@/components/header/header';
import FooterComponent from '@/components/footer/Footer';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

