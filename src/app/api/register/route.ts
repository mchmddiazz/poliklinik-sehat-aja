import { NextResponse } from 'next/server';
import db from '@/lib/db'; // Ensure the path matches the actual case-sensitive file structure

// Helper function to generate a unique ID with a prefix and ensure it's unique
const generateUniqueId = async (
  prefix: string,
  table: string,
  column: string
): Promise<string> => {
  let uniqueId = '';
  let isUnique = false;

  while (!isUnique) {
    const randomPart = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number
    const timestampPart = Date.now().toString().slice(-6); // Last 6 digits of the current timestamp
    uniqueId = `${prefix}${randomPart}-${timestampPart}`;

    // Query the database to check for uniqueness
    const [rows]: any = await db.query(
      `SELECT 1 AS exists_flag FROM ?? WHERE ?? = ?`,
      [table, column, uniqueId]
    );

    // Ensure rows is an array to avoid type issues
    if (Array.isArray(rows) && rows.length === 0) {
      isUnique = true;
    }
  }

  return uniqueId;
};

// API route to handle registration
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, jenis_kelamin, usia, poliklinik, tanggal_lahir } = body;

    // Validate input fields
    if (!nama || !jenis_kelamin || !usia || !poliklinik || !tanggal_lahir) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Generate unique identifiers
    const kartu_berobat = await generateUniqueId('PSA-', 'user', 'kartu_berobat');
    const nomor_pendaftaran = await generateUniqueId('A-', 'user', 'nomor_pendaftaran');

    // SQL query to insert data
    const sql = `
      INSERT INTO pasien 
      (nama, jenis_kelamin, usia, poliklinik, tanggal_lahir, status_ticket, kartu_berobat, nomor_pendaftaran, created_at, last_update)
      VALUES (?, ?, ?, ?, ?, 'waiting', ?, ?, NOW(), NOW())`;
    const values = [
      nama,
      jenis_kelamin,
      usia,
      poliklinik,
      tanggal_lahir,
      kartu_berobat,
      nomor_pendaftaran,
    ];

    // Execute the query
    const [result]: any = await db.query(sql, values);

    return NextResponse.json({
      success: true,
      message: 'Registration successful',
      data: result,
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error inserting data into the database',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
