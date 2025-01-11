import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { db_conn } from '@/db/config';

// Handler untuk PUT request (update)
export async function PUT(
  request: Request,
  context : { params: { nomorPendaftaran: string } }
) {
  let connection;
  try {
    const params  = await context.params;
    const { nomorPendaftaran } = params;
    const {
      nama,
      tanggal_lahir,
      usia,
      jenis_kelamin,
      poliklinik,
    } = await request.json(); 

    connection = await mysql.createConnection(db_conn);

    // Update data pasien
    await connection.execute(
      `UPDATE pasien 
       SET 
        nama = ?,
        tanggal_lahir = ?,
        usia = ?,
        jenis_kelamin = ?,
        poliklinik = ?,
        last_update = CURRENT_TIMESTAMP
       WHERE nomor_pendaftaran = ?`,
      [nama, tanggal_lahir, usia, jenis_kelamin, poliklinik, nomorPendaftaran]
    );

    return NextResponse.json({
      success: true,
      message: 'Data pasien berhasil diperbarui',
    });
  } catch (error) {
    console.error('Error updating patient:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Terjadi kesalahan saat memperbarui data pasien',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Handler untuk DELETE request
export async function DELETE(
  request: Request,
  context: { params: { nomorPendaftaran: string } }
) {
  let connection;
  try {
    const params  = await context.params;
    const { nomorPendaftaran } = params;
    
    connection = await mysql.createConnection(db_conn);

    // Hapus data pasien
    const [result]: any = await connection.execute(
      'DELETE FROM pasien WHERE nomor_pendaftaran = ?',
      [nomorPendaftaran]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({
        success: false,
        message: 'Data pasien tidak ditemukan',
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Data pasien berhasil dihapus',
    });

  } catch (error) {
    console.error('Error deleting patient:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Terjadi kesalahan saat menghapus data pasien',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
} 