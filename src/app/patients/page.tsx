'use client';

import React, { useEffect, useState } from 'react';
import PatientTable from '@/components/Table/PatientTable';

interface Patient {
  nama: string;
  jenis_kelamin: string;
  tanggal_lahir: string;
  usia: number;
  poliklinik: string;
  kartu_berobat: string;
  nomor_pendaftaran: string;
  status_ticket: string;
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('/api/patients');
        const result = await response.json();
        
        if (result.success) {
          setPatients(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('Failed to fetch patient data');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Daftar Pasien</h1>
      <PatientTable patients={patients} />
    </div>
  );
} 