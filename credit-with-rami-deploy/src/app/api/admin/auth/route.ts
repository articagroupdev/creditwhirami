import { NextRequest, NextResponse } from 'next/server';
import { authenticateAdmin } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;
    
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }
    
    const admin = authenticateAdmin(username, password);
    
    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // In production, you would create a JWT token here
    // For now, we'll return the admin info (without password)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...adminWithoutPassword } = admin;
    
    return NextResponse.json({ 
      success: true, 
      admin: adminWithoutPassword,
      message: 'Login successful' 
    });
    
  } catch (error) {
    console.error('Error authenticating admin:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
