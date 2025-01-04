'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Swal from 'sweetalert2';

export default function DiagnosaPage() {
  const params = useParams<{ ticket_id: string }>();
  const ticket_id = params?.ticket_id || '';
  const [diagnosa, setDiagnosa] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ticket_id) {
      setLoading(false);
    }
  }, [ticket_id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/diagnosa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ticket_id,
          diagnosa,
        }),
      });

      const result = await response.json();

      if (result.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Diagnosis submitted successfully',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: result.message || 'Failed to submit diagnosis',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to submit diagnosis',
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">
        Diagnose Patient - Ticket ID: {ticket_id}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="diagnosa" className="block text-sm font-medium text-gray-700">
            Diagnosis
          </label>
          <textarea
            id="diagnosa"
            value={diagnosa}
            onChange={(e) => setDiagnosa(e.target.value)}
            rows={4}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Submit Diagnosis
        </button>
      </form>
    </div>
  );
}
