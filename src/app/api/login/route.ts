// API route for login
import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    const [user]: any = await db.query(
      'SELECT * FROM user WHERE username = ? AND password = ?',
      [username, password]
    );

    const check_role = user[0]

    if (user) {
      if (['admin', 'dokter', 'apoteker'].includes(check_role['role'])) {
        return NextResponse.json({
          success: true,
          role: check_role['role'],
          message: 'Login successful',
        });
      } else {
        return NextResponse.json({
          success: false,
          message: 'Unauthorized role',
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: 'Invalid credentials',
      });
    }
  } catch (error: any) {
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
