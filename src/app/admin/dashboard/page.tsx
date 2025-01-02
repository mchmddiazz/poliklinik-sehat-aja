'use client';

import React, { useState, useEffect } from 'react';
import Header from '../../../components/AdminHeader/Header';



const Dashboard: React.FC = () => {
  const [DataPoliklinik, setDataPoliklinik] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataPasien = async () => {
      try {
        const response = await fetch('/api/data/pasien');
        const data = await response.json();
        if (data.success) {
          setDataPoliklinik(data.data);  // Assuming 'data.data' holds the array from DB
        } else {
          setError(data.message || 'Failed to fetch data');
        }
      } catch (err: any) {
        setError('Error fetching data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataPasien();
  }, []);

  // Format date helper function
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="container">
      <Header />
      <div className="p-8">
        <h1 className="text-3xl font-bold">{'Data Pasien'}</h1>
        <p className="mt-4">Welcome to the admin dashboard!</p>
        
        <div className="mt-6">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">Kartu Berobat</th>
                  <th className="border border-gray-300 px-4 py-2">Nama</th>
                  <th className="border border-gray-300 px-4 py-2">Tanggal Lahir</th>
                  <th className="border border-gray-300 px-4 py-2">Usia</th>
                  <th className="border border-gray-300 px-4 py-2">Poliklinik</th>
                  <th className="border border-gray-300 px-4 py-2">Nomor Pendaftaran</th>
                  <th className="border border-gray-300 px-4 py-2">Diagnosa</th>
                  <th className="border border-gray-300 px-4 py-2">Resep Obat</th>
                </tr>
              </thead>
              <tbody>
                {DataPoliklinik.map((item, index) => {
                  const formattedDate = item.tanggal_lahir
                    ? formatDate(item.tanggal_lahir)
                    : 'NULL';
                  return (
                    <tr
                      key={index}
                      className="odd:bg-white even:bg-gray-50 hover:bg-gray-200"
                    >
                      <td className="border border-gray-300 px-4 py-2">
                        {item.kartu_berobat}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">{item.nama}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        {formattedDate}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">{item.usia}</td>
                      <td className="border border-gray-300 px-4 py-2">{item.poliklinik}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.nomor_pendaftaran}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.diagnosa || 'NULL'}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.resep_obat || 'NULL'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
