'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import PatientTable from '@/components/Table/PatientTable';

const Dashboard: React.FC = () => {
  const [patients, setPatients] = useState([]);
  const [totalPatients, setTotalPatients] = useState(0);
  const [waitingCount, setWaitingCount] = useState(0);
  const [examinedCount, setExaminedCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const router = useRouter();
  const handleLogout = async () => {
    const response = await fetch('/api/logout', {
      method: 'POST',
    });

    const data = await response.json();
    if (data.success) {
      router.push('/login');
    } else {
      alert('Failed to logout.');
    }
  };

  useEffect(() => {
    // Fetch all patients data (not filtered by date)
    fetch('/api/patients?role=admin&all=true')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // Add debug logging
          console.log('Raw patient data:', data.data[0]); // Log first patient data
          
          const patientsWithFormattedDates = data.data.map((patient: any) => {
            try {
              return {
                ...patient,
                tanggal_lahir: patient.tanggal_lahir ? new Date(patient.tanggal_lahir).toLocaleDateString('id-ID', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                }) : '-',
                created_at: patient.created_at ? new Date(patient.created_at).toLocaleDateString('id-ID', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                }) : '-',
                last_update: patient.last_update ? new Date(patient.last_update).toLocaleDateString('id-ID', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                }) : '-'
              };
            } catch (error) {
              console.error('Error formatting patient dates:', error, patient);
              return patient;
            }
          });
          
          console.log('Formatted patient data:', patientsWithFormattedDates[0]); // Log formatted data
          
          setPatients(patientsWithFormattedDates);
          setTotalPatients(data.data.length);
          
          // Count patients by status
          const waiting = data.data.filter((p: any) => p.status_ticket === 'waiting').length;
          const examined = data.data.filter((p: any) => p.status_ticket === 'examined').length;
          const completed = data.data.filter((p: any) => p.status_ticket === 'completed').length;
          setWaitingCount(waiting);
          setExaminedCount(examined);
          setCompletedCount(completed);
        }
      });
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600 text-center">Selamat datang di dashboard admin!</p>
        <p className="mt-1 text-sm text-gray-500">Overview data keseluruhan sistem</p>
        <Link className="my-2" href="javascript:void(0);" onClick={handleLogout}>Logout</Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-800">{totalPatients}</h2>
              <p className="text-gray-600">Total Pasien</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-800">{waitingCount}</h2>
              <p className="text-gray-600">Total Pasien Menunggu</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-800">{examinedCount}</h2>
              <p className="text-gray-600">Total Pasien Diperiksa</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-800">{completedCount}</h2>
              <p className="text-gray-600">Total Pasien Selesai</p>
            </div>
          </div>
        </div>

        {/* <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <Link href="/admin/dashboard/settings" className="flex items-center">
            <div className="p-3 bg-gray-100 rounded-full">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-semibold text-gray-800">Settings</h2>
              <p className="text-gray-600">Pengaturan Sistem</p>
            </div>
          </Link>
        </div> */}
      </div>

      {/* Patient Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100">
        <PatientTable patients={patients} role="admin" />
      </div>
    </div>
  );
};

export default Dashboard;