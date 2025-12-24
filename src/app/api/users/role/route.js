import { NextResponse } from 'next/server';
import { getUserRole } from '@/lib/rbac';

// GET - Get user role by ID
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const role = await getUserRole(userId);

    return NextResponse.json({
      success: true,
      role
    });
  } catch (error) {
    console.error('Error fetching user role:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

