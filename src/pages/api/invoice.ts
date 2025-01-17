import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { nomor_pendaftaran, harga } = req.body;

    const updateResult = await query(
      'UPDATE patients SET harga = ?, status_ticket = ?, last_update = NOW() WHERE nomor_pendaftaran = ?',
      [harga, 'invoiced', nomor_pendaftaran]
    );

    if (updateResult.affectedRows > 0) {
      res.status(200).json({ success: true, message: 'Harga berhasil ditambahkan' });
    } else {
      res.status(404).json({ success: false, message: 'Pasien tidak ditemukan' });
    }
  } catch (error) {
    console.error('Error adding invoice:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
} 