import { NextResponse } from 'next/server';
import { setUserRole } from '@/lib/rbac';

// POST - Set user role
export async function POST(request) {
  try {
    const { userId, role, additionalData } = await request.json();

    if (!userId || !role) {
      return NextResponse.json(
        { error: 'User ID and role are required' },
        { status: 400 }
      );
    }

    await setUserRole(userId, role, additionalData);

    return NextResponse.json({
      success: true,
      message: 'User role updated successfully'
    });
  } catch (error) {
    console.error('Error setting user role:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

