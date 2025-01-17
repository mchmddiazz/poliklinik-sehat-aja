import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    // Query to get count of users grouped by poliklinik
    const [poliklinikCount]: any = await db.query(`
      SELECT poliklinik, COUNT(*) AS total, DATE(created_at) AS date
      FROM pasien
      WHERE DATE(created_at) = CURDATE()
      GROUP BY poliklinik
    `);

    // Ensure poliklinikCount is an array and map through it safely
    const transformedData = Array.isArray(poliklinikCount)
      ? poliklinikCount.map((data: any) => ({
          poliklinik: data.poliklinik || 'Unknown', // Fallback if poliklinik is null/undefined
          date: data.date || null, // Ensure the date is available or fallback to null
          totalPatients: data.total || 0, // Fallback if total is null/undefined
          formattedMessage: `${data.poliklinik || 'Unknown'} has ${data.total || 0} patients`,
        }))
      : [];

    // Return the results as a success response
    return NextResponse.json({
      success: true,
      message: 'Poliklinik counts fetched successfully',
      data: transformedData,
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

export async function PUT(req: Request) {
  try {
    const { nomor_pendaftaran, status_ticket } = await req.json();

    if (!nomor_pendaftaran || !status_ticket) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    // Validate status_ticket value
    const validStatuses = ['waiting', 'examined', 'invoiced', 'completed'];
    if (!validStatuses.includes(status_ticket)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid status ticket value',
        },
        { status: 400 }
      );
    }

    const [result]: any = await db.query(
      'UPDATE pasien SET status_ticket = ?, last_update = NOW() WHERE nomor_pendaftaran = ?',
      [status_ticket, nomor_pendaftaran]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Patient not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Status ticket updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating status ticket:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error updating status ticket',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
