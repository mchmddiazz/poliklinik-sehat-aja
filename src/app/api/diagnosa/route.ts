import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { ticket_id, diagnosa, resep_obat } = await req.json();

    if (!ticket_id || !diagnosa || !resep_obat) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing ticket ID, diagnosis, or prescription',
        },
        { status: 400 }
      );
    }

    // MySQL query to update the pasien table
    const query = `
      UPDATE pasien
      SET diagnosa = ?, resep_obat = ?, last_update = ?, status_ticket = 'examined'
      WHERE nomor_pendaftaran = ?;
    `;
    const values = [diagnosa, resep_obat, new Date(), ticket_id];

    // Execute the query
    const [result] = await db.query(query, values);
    

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'No records updated. Invalid ticket ID.',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Diagnosis and prescription submitted successfully',
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
