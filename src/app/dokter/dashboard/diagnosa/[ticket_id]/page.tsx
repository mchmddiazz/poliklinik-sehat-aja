'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Swal from 'sweetalert2';

export default function DiagnosaPage() {
  const { ticket_id } = useParams<{ ticket_id: string }>();
  const [diagnosa, setDiagnosa] = useState('');
  const [obatList, setObatList] = useState([{ resepObat: '', banyakObat: '', anjuranPakai: '', keterangan: '' }]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ticket_id) {
      setLoading(false);
    } else {
      Swal.fire('Error', 'Ticket ID not found', 'error');
    }
  }, [ticket_id]);

  const handleAddObat = () => {
    setObatList([...obatList, { resepObat: '', banyakObat: '', anjuranPakai: '', keterangan: '' }]);
  };

  const handleRemoveObat = (index: number) => {
    const updatedObatList = [...obatList];
    updatedObatList.splice(index, 1);
    setObatList(updatedObatList);
  };

  const handleObatChange = (index: number, field: string, value: string) => {
    const updatedObatList = [...obatList];
    updatedObatList[index][field] = value;
    setObatList(updatedObatList);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!ticket_id || !diagnosa || obatList.some(obat => !obat.resepObat)) {
      Swal.fire('Error', 'All fields are required', 'error');
      return;
    }

    console.log(JSON.stringify({ ticket_id, diagnosa, obatList }))

    try {
      const response = await fetch('/api/diagnosa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticket_id, diagnosa, obatList }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        Swal.fire('Success', 'Diagnosis submitted successfully', 'success').then(function () {
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
            {obatList.map((obat, index) => (
              <div key={index} className="flex flex-wrap items-center mb-4">
                <div className="basis-1/2 p-1">
                  <label className="block text-sm font-medium text-gray-700">Obat</label>
                  <input
                    type="text"
                    value={obat.resepObat}
                    onChange={(e) => handleObatChange(index, 'resepObat', e.target.value)}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div className="basis-1/2 p-1">
                  <label className="block text-sm font-medium text-gray-700">Banyaknya</label>
                  <input
                    type="text"
                    value={obat.banyakObat}
                    onChange={(e) => handleObatChange(index, 'banyakObat', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="basis-1/2 p-1">
                  <label className="block text-sm font-medium text-gray-700">Anjuran Pakai</label>
                  <input
                    type="text"
                    value={obat.anjuranPakai}
                    onChange={(e) => handleObatChange(index, 'anjuranPakai', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="basis-1/2 p-1">
                  <label className="block text-sm font-medium text-gray-700">Keterangan</label>
                  <input
                    type="text"
                    value={obat.keterangan}
                    onChange={(e) => handleObatChange(index, 'keterangan', e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                {
                  index != 0 ? 
                  <button
                    type="button"
                    onClick={() => handleRemoveObat(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mt-4"
                  >
                    Remove
                  </button> : ''
                }
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddObat}
              className="mt-2 w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Add More Obat
            </button>
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
