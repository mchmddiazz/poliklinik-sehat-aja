'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import PatientTable from '@/components/Table/PatientTable';
import EditPatientModal from '@/components/Modals/EditPatientModal';
import Swal from 'sweetalert2';
import AddInvoiceModal from '@/components/Modals/AddInvoiceModal';

interface Patient {
  nomor_pendaftaran: string;
  nama: string;
  tanggal_lahir: string;
  created_at: string;
  last_update: string;
  status_ticket: string;
  // tambahkan properti lain yang dibutuhkan
  [key: string]: any; // untuk properti dinamis lainnya
}

const Dashboard: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [totalPatients, setTotalPatients] = useState(0);
  const [waitingCount, setWaitingCount] = useState(0);
  const [examinedCount, setExaminedCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

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
    // Cek token saat komponen dimount
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/check-auth');
        const data = await response.json();
        
        if (!data.success || data.role !== 'administrasi') {
          router.push('/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    // Fetch all patients data (not filtered by date)
    fetch('/api/patients?role=administrasi&all=true')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // Filter patients with status 'examined' first
          const examinedPatients = data.data.filter((p: any) => p.status_ticket === 'examined');
          
          // Add debug logging
          console.log('Raw patient data:', examinedPatients[0]); // Log first patient data
          
          const patientsWithFormattedDates = examinedPatients.map((patient: any) => {
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
          
          // Update counts based on all patients (not just examined)
          setTotalPatients(data.data.length);
          const waiting = data.data.filter((p: any) => p.status_ticket === 'waiting').length;
          const examined = data.data.filter((p: any) => p.status_ticket === 'examined').length;
          const completed = data.data.filter((p: any) => p.status_ticket === 'completed').length;
          setWaitingCount(waiting);
          setExaminedCount(examined);
          setCompletedCount(completed);
        }
      });
  }, []);

  // Add these pagination helper functions
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPatients = patients.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(patients.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleAddInvoice = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsInvoiceModalOpen(true);
  };

  const refreshData = () => {
    // Re-fetch your patients data here
    fetch('/api/patients?role=administrasi&all=true')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // Your existing data processing logic
          setPatients(data.data);
        }
      });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Administrasi Dashboard</h1>
        <p className="mt-2 text-gray-600 text-center">Selamat datang di dashboard administrasi!</p>
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
      </div>

      {/* Patient Table */}
      <div className="bg-white rounded-lg shadow-md border border-gray-100">
        <PatientTable 
          patients={currentPatients.map((patient: Patient, index) => ({
            ...patient,
            nomor_urut: indexOfFirstItem + index + 1
          }))}
          role="administrasi"
          onAddInvoice={handleAddInvoice}
        />
        
        {/* Pagination Controls */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <div className="flex items-center">
            <p className="text-sm text-gray-700">
              Showing{' '}
              <span className="font-medium">{indexOfFirstItem + 1}</span>
              {' '}-{' '}
              <span className="font-medium">
                {Math.min(indexOfLastItem, patients.length)}
              </span>
              {' '}of{' '}
              <span className="font-medium">{patients.length}</span>
              {' '}results
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === index + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {selectedPatient && (
        <AddInvoiceModal
          isOpen={isInvoiceModalOpen}
          onClose={() => setIsInvoiceModalOpen(false)}
          patient={selectedPatient}
          onSuccess={refreshData}
        />
      )}
    </div>
  );
};

export default Dashboard;