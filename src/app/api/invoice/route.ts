import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { harga, nomor_pendaftaran } = await req.json();

    if ( !harga || !nomor_pendaftaran) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields: harga and nomor_pendaftaran',
        },
        { status: 400 }
      );
    }

    // Convert obatList into JSON string to store in the database
    // const resep_obat = JSON.stringify(obatList);

    // MySQL query to update the pasien table
    const query = `
      UPDATE pasien
      SET harga = ?, status_ticket = 'invoiced'
      WHERE nomor_pendaftaran = ?;
    `;
    const values = [harga, nomor_pendaftaran];

    // Execute the query
    const [result] = await db.query(query, values);

    // Periksa hasil query dengan cara yang benar
    const affectedRows = (result as any)?.affectedRows || 0;

    if (affectedRows === 0) {
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
      message: 'Price submitted successfully',
    });
  } catch (error: any) {
    console.error('Invoice error:', error);
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
