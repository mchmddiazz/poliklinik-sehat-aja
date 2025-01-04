import React from 'react';
import Swal from 'sweetalert2';
import Link from 'next/link';

interface Patient {
  nama: string;
  jenis_kelamin: string;
  tanggal_lahir: string;
  usia: number;
  poliklinik: string;
  kartu_berobat: string;
  nomor_pendaftaran: string;
  status_ticket: string;
  created_at: string;
  last_update: string;
}

interface PatientTableProps {
  patients: any[];
  role?: string;
  showRegistrationNumber?: boolean;
}

const PatientTable: React.FC<PatientTableProps> = ({ 
  patients, 
  role,
  showRegistrationNumber = true
}) => {
  const handleComplete = async (nomor_pendaftaran: string) => {
    try {
      const response = await fetch('/api/status_ticket', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nomor_pendaftaran,
          status_ticket: 'completed',
        }),
      });

      const result = await response.json();

      if (result.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Status ticket updated successfully',
        }).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: result.message || 'Failed to update status ticket',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update status ticket',
      });
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {showRegistrationNumber ? 'No. Pendaftaran' : 'No'}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nama
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Jenis Kelamin
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tanggal Lahir
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Usia
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Poliklinik
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Kartu Berobat
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nomor Pendaftaran
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status Ticket
            </th>
            {role === 'admin' && (
              <>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dibuat Pada
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Terakhir Diperbarui
                </th>
              </>
            )}
            {role === 'dokter' && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            )}
            {role === 'apoteker' && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {patients.map((patient, index) => (
            <tr key={patient.id || index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {showRegistrationNumber ? patient.nomor_pendaftaran : index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {patient.nama}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {patient.jenis_kelamin}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {patient.tanggal_lahir}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {patient.usia}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {patient.poliklinik}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {patient.kartu_berobat}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {patient.nomor_pendaftaran}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="flex justify-center">
                  <span className={`px-2 py-1 rounded ${
                    patient.status_ticket === 'waiting' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : patient.status_ticket === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : patient.status_ticket === 'examined'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {patient.status_ticket}
                  </span>
                </div>
              </td>
              {role === 'dokter' && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {patient.status_ticket === 'waiting' && (
                    <Link href={`/dokter/dashboard/diagnosa/${patient.nomor_pendaftaran}`}>
                      <span className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors'>
                        Action
                      </span>
                    </Link>
                  )}
                </td>
              )}
              {role === 'admin' && (
                <>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.created_at}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.last_update}
                  </td>
                </>
              )}
              {role === 'apoteker' && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {patient.status_ticket !== 'completed' && (
                    <button
                      onClick={() => handleComplete(patient.nomor_pendaftaran)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Complete
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable; 