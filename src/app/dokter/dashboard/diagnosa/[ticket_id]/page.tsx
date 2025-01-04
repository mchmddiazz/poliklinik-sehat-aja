'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Swal from 'sweetalert2';

export default function DiagnosaPage() {
  const { ticket_id } = useParams<{ ticket_id: string }>();
  const [diagnosa, setDiagnosa] = useState('');
  const [resepObat, setResepObat] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ticket_id) {
      setLoading(false);
    } else {
      Swal.fire('Error', 'Ticket ID not found', 'error');
    }
  }, [ticket_id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!ticket_id || !diagnosa || !resepObat) {
      Swal.fire('Error', 'All fields are required', 'error');
      return;
    }

    // console.log(JSON.stringify({ ticket_id, diagnosa, resep_obat: resepObat }))
    

    try {
      const response = await fetch('/api/diagnosa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticket_id, diagnosa, resep_obat: resepObat }),
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        Swal.fire('Success', 'Diagnosis submitted successfully', 'success').then(function() {
          window.location.href = '/dokter/dashboard';
        });
      } else {
        Swal.fire('Error', result.message || 'Failed to submit diagnosis', 'error');
      }
    } catch (error: any) {
      Swal.fire('Error', 'Failed to connect to server', 'error');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto p-8">
        <div className="mb-8 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-gray-800">Diagnosis</h1>
          <p className="mt-2 text-gray-600">Ticket ID: {ticket_id}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="diagnosa" className="block text-sm font-medium text-gray-700">
              Diagnosis
            </label>
            <textarea
              id="diagnosa"
              value={diagnosa}
              onChange={(e) => setDiagnosa(e.target.value)}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="resep_obat" className="block text-sm font-medium text-gray-700">
              Prescription
            </label>
            <textarea
              id="resep_obat"
              value={resepObat}
              onChange={(e) => setResepObat(e.target.value)}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}