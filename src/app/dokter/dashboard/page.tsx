'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PatientTable from '@/components/Table/PatientTable';
import DiagnosaModal from '@/components/Modals/DiagnosaModal';

const Dashboard: React.FC = () => {
  const [patients, setPatients] = useState([]);
  const [examinedCount, setExaminedCount] = useState(0);
  const [waitingCount, setWaitingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [isDiagnosaModalOpen, setIsDiagnosaModalOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  
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

  const handleDiagnosisClick = (ticketId: string) => {
    setSelectedTicketId(ticketId);
    setIsDiagnosaModalOpen(true);
  };

  useEffect(() => {
    // Fetch today's patients for doctor
    fetch('/api/patients?role=dokter')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // Format the date before setting the state
          const formattedData = data.data.map((patient: any) => ({
            ...patient,
            tanggal_lahir: new Date(patient.tanggal_lahir).toLocaleDateString('id-ID', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })
          }));
          
          setPatients(formattedData);
          // Count patients by status
          const examined = formattedData.filter((p: any) => p.status_ticket === 'examined').length;
          const waiting = formattedData.filter((p: any) => p.status_ticket === 'waiting').length;
          const completed = formattedData.filter((p: any) => p.status_ticket === 'completed').length;
          setExaminedCount(examined);
          setWaitingCount(waiting);
          setCompletedCount(completed);
        }
      });
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Dokter Dashboard</h1>
        <p className="mt-2 text-gray-600 text-center">Selamat datang di dashboard dokter!</p>
        <p className="mt-1 text-sm text-gray-500">Data pasien hari ini</p>
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
              <h2 className="text-xl font-semibold text-gray-800">{patients.length}</h2>
              <p className="text-gray-600">Total Pasien Hari Ini</p>
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
              <p className="text-gray-600">Dalam Antrian</p>
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
              <p className="text-gray-600">Sudah Diperiksa</p>
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
              <p className="text-gray-600">Selesai</p>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100">
        <PatientTable 
          patients={patients} 
          role="dokter" 
          showRegistrationNumber={false}
          onDiagnosis={handleDiagnosisClick}
        />
      </div>

      {/* Diagnosa Modal */}
      {isDiagnosaModalOpen && selectedTicketId && (
        <DiagnosaModal
          isOpen={isDiagnosaModalOpen}
          onClose={() => setIsDiagnosaModalOpen(false)}
          ticketId={selectedTicketId}
        />
      )}
    </div>
  );
};

export default Dashboard;