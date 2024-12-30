// // app/api/test-db/route.ts

// import { NextResponse } from 'next/server';
// import db from '../../../lib/db'; // Import the database connection

// export async function GET() {
//   try {
//     // Test the MySQL connection by executing a simple query
//     const [rows] = await db.query('SELECT 1 + 1 AS result');

//     // If the query runs successfully, return a success response
//     return NextResponse.json({
//       success: true,
//       message: 'MySQL connection is successful',
//       result: rows[0],
//     });
//   } catch (error) {
//     // If there's an error, return a failure response with the error message
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Failed to connect to MySQL',
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }