import { NextResponse } from 'next/server';
import { serialize } from 'cookie';
import db from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    const [user]: any = await db.query(
      'SELECT * FROM user WHERE username = ? AND password = ?',
      [username, password]
    );

    const check_role = user[0];

    if (user) {
      if (['admin', 'dokter', 'apoteker'].includes(check_role['role'])) {
        const token = `${check_role['role']}-${new Date().getTime()}`;

        const response = NextResponse.json({
          success: true,
          role: check_role['role'],
          message: 'Login successful',
        });

        response.headers.set(
          'Set-Cookie',
          serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24, // 1 day
          })
        );

        return response;
      } else {
        return NextResponse.json({
          success: false,
          role: check_role['role'],
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
