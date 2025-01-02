import { NextResponse } from 'next/server';
import db from '../../../lib/db';

// Helper function to generate a unique ID with a prefix and ensure it's unique
const generateUniqueId = async (prefix: string, table: string, column: string): Promise<string> => {
  let uniqueId = '';
  let isUnique = false;

  // Loop until we find a unique ID
  while (!isUnique) {
    // Generate a random 6-digit number combined with current timestamp for better randomness
    const randomPart = Math.floor(1000 + Math.random() * 9000); // Random number part
    const timestampPart = Date.now().toString().slice(-6); // Last 6 digits of the current timestamp
    uniqueId = `${prefix}${randomPart}-${timestampPart}`;

    // Check if the generated ID already exists in the database
    const [rows] = await db.query(`SELECT 1 FROM ${table} WHERE ${column} = ?`, [uniqueId]);

    // If no rows are returned, it means the ID is unique
    if (rows.length === 0) {
      isUnique = true;
    }
  }

  return uniqueId;
};

// API route to handle registration
export async function POST(req: Request) {
  try {
    const { nama, jenis_kelamin, usia, poliklinik, tanggal_lahir } = await req.json();

    if (!nama || !jenis_kelamin || !usia || !poliklinik || !tanggal_lahir) {
      return NextResponse.json(
        {
          success: false,
          message: 'All fields are required',
        },
        { status: 400 }
      );
    }

    // Generate unique kartu_berobat with 'PSA-' prefix and nomor_pendaftaran with 'A-' prefix
    const kartu_berobat = await generateUniqueId('PSA-', 'user', 'kartu_berobat');
    const nomor_pendaftaran = await generateUniqueId('A-', 'user', 'nomor_pendaftaran');

    // SQL query to insert data
    const sql = `
      INSERT INTO user (nama, jenis_kelamin, usia, poliklinik, tanggal_lahir, status_ticket, kartu_berobat, nomor_pendaftaran, created_at, last_update)
      VALUES (?, ?, ?, ?, ?, 'waiting', ?, ?, NOW(), NOW())`;
    const values = [nama, jenis_kelamin, usia, poliklinik, tanggal_lahir, kartu_berobat, nomor_pendaftaran];

    // Execute the query
    const [result] = await db.query(sql, values);

    // Success response
    return NextResponse.json({
      success: true,
      message: 'Registration successful',
      data: result,
    });
  } catch (error) {
    // Log error and send response
    console.error('Registration error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error inserting data into database',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
