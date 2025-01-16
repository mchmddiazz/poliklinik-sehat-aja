import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) {
    return NextResponse.json({ success: false });
  }

  const [role] = token.value.split('-');

  return NextResponse.json({
    success: true,
    role: role
  });
} 