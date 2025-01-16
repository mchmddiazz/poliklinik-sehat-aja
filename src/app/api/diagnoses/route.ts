import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    // Test koneksi database
    try {
      await sql`SELECT NOW()`;
      console.log('Database connection successful');
    } catch (connError) {
      console.error('Database connection error:', connError);
      return NextResponse.json({ 
        success: false, 
        message: 'Database connection failed',
        error: connError instanceof Error ? connError.message : 'Unknown connection error'
      }, { status: 500 });
    }

    const { ticketId, diagnosis, medicines } = await request.json();
    
    // Validasi input
    if (!ticketId || !diagnosis || !medicines) {
      return NextResponse.json({ 
        success: false, 
        message: 'Missing required fields' 
      }, { status: 400 });
    }

    // Convert medicines array to string format
    const resepObatString = JSON.stringify(medicines);

    // Format current timestamp for datetime
    const currentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

    try {
      // Update diagnosa dan status ticket dengan tipe data yang sesuai
      await sql`
        UPDATE tickets 
        SET 
          diagnosa = ${diagnosis},
          resep_obat = ${resepObatString},
          status_ticket = 'examined',
          last_update = ${currentTimestamp}
        WHERE nomor_pendaftaran = ${ticketId}
        RETURNING *
      `;

      return NextResponse.json({ 
        success: true, 
        message: 'Diagnosis submitted successfully' 
      });

    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ 
        success: false, 
        message: 'Database error occurred',
        error: dbError instanceof Error ? dbError.message : 'Unknown database error'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to process request',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 