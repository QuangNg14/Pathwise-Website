import { NextResponse } from 'next/server';
import { getAllUsers } from '@/lib/rbac';

// GET - Get all users
export async function GET() {
  try {
    const users = await getAllUsers();

    return NextResponse.json({
      success: true,
      users
    });
  } catch (error) {
    console.error('Error fetching all users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

