// API route for login
import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { serialize } from 'cookie';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    
    // First, get the user without checking password
    const [user]: any = await db.query(
      'SELECT * FROM user WHERE username = ?',
      [username]
    );

    const check_role = user[0];

    if (!check_role) {
      return NextResponse.json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Compare the password with hashed password
    const passwordMatch = await bcrypt.compare(password, check_role.password);

    if (!passwordMatch) {
      return NextResponse.json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check role after successful password verification
    if (['admin', 'dokter', 'apoteker', 'administrasi'].includes(check_role['role'])) {
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
        message: 'Unauthorized role',
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
