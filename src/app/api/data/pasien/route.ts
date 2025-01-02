import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    // Query to get count of users grouped by poliklinik
    const [dataPoliklinik]: any = await db.query(`
      SELECT * FROM pasien
    `);

    // Return the results as a success response
    return NextResponse.json({
      success: true,
      message: 'Poliklinik counts fetched successfully',
      data: dataPoliklinik,
    });
  } catch (error: any) {
    // Log error and send response
    console.error('Error fetching data:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching data from database',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
