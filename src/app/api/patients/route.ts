import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role');
    const all = searchParams.get('all');

    let query = `
      SELECT 
        nama, 
        jenis_kelamin, 
        tanggal_lahir, 
        usia, 
        poliklinik, 
        kartu_berobat, 
        nomor_pendaftaran,
        diagnosa,
        resep_obat, 
        status_ticket,
        created_at,
        last_update
      FROM pasien 
    `;
    
    // Only filter by date if not requesting all data
    if (all !== 'true') {
      query += ` WHERE DATE(created_at) = CURDATE()`;
    } else {
      query += ` WHERE 1=1`; // This allows us to always use AND for additional conditions
    }

    // Additional filter based on role
    if (role === 'apoteker') {
      query += " AND status_ticket = 'examined' OR status_ticket = 'invoiced'";
    } else if (role === 'dokter') {
      query += " AND (status_ticket = 'waiting' OR status_ticket = 'examined' OR status_ticket = 'completed')";
    }

    query += ' ORDER BY created_at DESC';

    const [patients] = await db.query(query);

    return NextResponse.json({
      success: true,
      data: patients,
    });
  } catch (error: any) {
    console.error('Error fetching patients:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching patients from database',
        error: error.message,
      },
      { status: 500 }
    );
  }
} 