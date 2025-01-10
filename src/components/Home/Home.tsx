'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  const [poliklinikCount, setPoliklinikCount] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPoliklinikCount = async () => {
      try {
        const response = await fetch('/api/status_ticket');
        const data = await response.json();
        if (data.success) {
          const defaultPolikliniks = [
            { poliklinik: 'Umum', totalPatients: 0 },
            { poliklinik: 'Bidan', totalPatients: 0 },
            { poliklinik: 'Anak', totalPatients: 0 },
            { poliklinik: 'Penyakit dalam', totalPatients: 0 },
          ];
          const combinedData = defaultPolikliniks.map(defaultItem => {
            const found = data.data.find((item: any) => item.poliklinik === defaultItem.poliklinik);
            return found || defaultItem;
          });
          setPoliklinikCount(combinedData);
        } else {
          setError(data.message || 'Failed to fetch data');
        }
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPoliklinikCount();
  }, []);

  return (
    <div className="py-24 h-screen flex flex-row items-center justify-center">
      <div className="basis-full ticket-item">
        <div className="ticket-wrapper flex flex-col">
          <h1 className="mb-14 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            Unit Pengobatan
          </h1>
          <div className="flex items-center justify-center unit-container w-2/4 m-auto">
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              poliklinikCount.map((item, index) => (
                <div key={index} className="basis-1/4 unit-item px-3">
                  <Link
                    href="/register"
                    className="w-full block text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    {item.poliklinik} ({item.totalPatients})
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
