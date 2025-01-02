// API route for login
import { NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    const [user]: any = await db.query(
      'SELECT * FROM user WHERE username = ? AND password = ?',
      [username, password]
    );

    if (user) {
      return NextResponse.json({
        success: true,
        role: user.role,
        message: 'Login successful',
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Invalid credentials',
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Error processing login',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
