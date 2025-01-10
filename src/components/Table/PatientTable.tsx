import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

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
  onEdit?: (patient: any) => void;
  onDelete?: (ticketId: string) => void;
}

const PatientTable: React.FC<PatientTableProps> = ({ 
  patients, 
  role,
  showRegistrationNumber = true,
  onEdit,
  onDelete
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = (nomorPendaftaran: string) => {
    if (activeMenu === nomorPendaftaran) {
      setActiveMenu(null);
    } else {
      setActiveMenu(nomorPendaftaran);
    }
  };

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
              No.
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
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
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
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            )}
            {role === 'apoteker' && (
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            )}
            <th></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {patients.map((patient, index) => (
            <tr key={patient.id || index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {index + 1}
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
                      ? 'bg-yellow-100 text-yellow-800 w-full text-center' 
                      : patient.status_ticket === 'completed'
                      ? 'bg-green-100 text-green-800 w-full text-center'
                      : patient.status_ticket === 'examined'
                      ? 'bg-blue-100 text-blue-800 w-full text-center'
                      : 'bg-gray-100 text-gray-800 w-full text-center'
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
              {role === 'admin' && (
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 relative">
                <button
                  onClick={() => toggleMenu(patient.nomor_pendaftaran)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FontAwesomeIcon icon={faEllipsisV} />
                </button>
                
                {activeMenu === patient.nomor_pendaftaran && (
                  <div ref={menuRef} className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1" role="menu">
                      <button
                        onClick={() => {
                          onEdit(patient);
                          setActiveMenu(null);
                        }}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                      >
                        <FontAwesomeIcon icon={faPen} className="mr-3" />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          onDelete(patient.nomor_pendaftaran);
                          setActiveMenu(null);
                        }}
                        className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
                      >
                        <FontAwesomeIcon icon={faTrash} className="mr-3" />
                        Delete
                      </button>
                    </div>
                  </div>
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