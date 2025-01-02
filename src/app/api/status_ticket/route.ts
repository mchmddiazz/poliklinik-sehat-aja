import { NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function GET() {
  try {
    // Query to get count of users grouped by poliklinik_widyatama
    const [poliklinikCount] = await db.query(`
      SELECT poliklinik, COUNT(*) AS total
      FROM user
      WHERE DATE(created_at) = CURDATE()
      GROUP BY poliklinik
    `);

    const transformedData = poliklinikCount.map(data => {
      // Example: Adding a custom field or transforming the data
      return {
        poliklinik: data.poliklinik,
        date: data.created_at,
        totalPatients: data.total,
        formattedMessage: `${data.poliklinik} has ${data.total} patients`,
      };
    });

    // Return the results as a success response
    return NextResponse.json({
      success: true,
      message: 'Poliklinik counts fetched successfully',
      data: transformedData,
    });
  } catch (error) {
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
