// app/api/test-db/route.ts

import { NextResponse } from 'next/server';
import db from '../../../lib/db'; // Ensure this path matches the case-sensitive file structure

export async function GET() {
  try {
    // Test the MySQL connection by executing a simple query
    const [rows]: any = await db.query('SELECT 1 + 1 AS result');

    // Ensure the query result is valid and contains the expected data
    if (Array.isArray(rows) && rows.length > 0 && rows[0]?.result !== undefined) {
      return NextResponse.json({
        success: true,
        message: 'MySQL connection is successful',
        result: rows[0].result,
      });
    }

    // Handle unexpected result formats
    return NextResponse.json(
      {
        success: false,
        message: 'Unexpected query result format',
      },
      { status: 500 }
    );
  } catch (error: any) {
    // Log the error for debugging
    console.error('MySQL connection test error:', error);

    // Return a failure response with detailed error information
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to connect to MySQL',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
