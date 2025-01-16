'use client';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

interface DiagnosaModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketId: string;
}

interface MedicineEntry {
  resepObat: string;
  banyakObat: string;
  anjuranPakai: string;
  keterangan: string;
}

const DiagnosaModal: React.FC<DiagnosaModalProps> = ({ isOpen, onClose, ticketId }) => {
  const [diagnosis, setDiagnosis] = useState('');
  const [medicines, setMedicines] = useState<MedicineEntry[]>([{
    resepObat: '',
    banyakObat: '',
    anjuranPakai: '',
    keterangan: ''
  }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddMedicine = () => {
    setMedicines([...medicines, {
      resepObat: '',
      banyakObat: '',
      anjuranPakai: '',
      keterangan: ''
    }]);
  };

  const handleMedicineChange = (index: number, field: keyof MedicineEntry, value: string) => {
    const newMedicines = [...medicines];
    newMedicines[index][field] = value;
    setMedicines(newMedicines);
  };

  const handleRemoveMedicine = (index: number) => {
    const newMedicines = medicines.filter((_, i) => i !== index);
    setMedicines(newMedicines);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      if (!ticketId || !diagnosis || medicines.some(m => !m.resepObat)) {
        await Swal.fire({
          icon: 'error',
          title: 'Validasi Error',
          text: 'Semua field wajib diisi (kecuali keterangan)',
        });
        return;
      }

      Swal.fire({
        title: 'Memproses...',
        text: 'Mohon tunggu sebentar',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch('/api/diagnosa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ticket_id: ticketId,
          diagnosa: diagnosis,
          obatList: medicines.map(m => ({
            resepObat: m.resepObat,
            banyakObat: m.banyakObat,
            anjuranPakai: m.anjuranPakai,
            keterangan: m.keterangan
          }))
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (response.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Diagnosis berhasil disimpan',
          timer: 1500,
          showConfirmButton: false
        });
        onClose();
        window.location.href = '/dokter/dashboard';
      } else {
        throw new Error(data.message || `Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error submitting diagnosis:', error);
      
      const errorMessage = error instanceof Error && error.name === 'AbortError' 
        ? 'Waktu request terlalu lama. Silakan coba lagi.'
        : error instanceof Error 
          ? error.message 
          : 'Terjadi kesalahan saat mengirim diagnosis. Silakan coba lagi.';

      await Swal.fire({
        icon: 'error',
        title: 'Terjadi Kesalahan',
        text: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Diagnosis</h2>
          <div className="text-gray-600">Ticket ID: {ticketId}</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Diagnosis</label>
            <textarea
              className="w-full border rounded-lg p-2"
              rows={4}
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              required
            />
          </div>

          <div className="space-y-4">
            {medicines.map((medicine, index) => (
              <div key={index} className="relative mb-4 p-4 border rounded-lg bg-gray-50">
                <div className="absolute top-2 right-2">
                  {medicines.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMedicine(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Hapus Obat"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Obat
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded-lg p-2"
                      value={medicine.resepObat}
                      onChange={(e) => handleMedicineChange(index, 'resepObat', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Banyaknya
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded-lg p-2"
                      value={medicine.banyakObat}
                      onChange={(e) => handleMedicineChange(index, 'banyakObat', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Anjuran Pakai
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded-lg p-2"
                      value={medicine.anjuranPakai}
                      onChange={(e) => handleMedicineChange(index, 'anjuranPakai', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Keterangan
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded-lg p-2"
                      value={medicine.keterangan}
                      onChange={(e) => handleMedicineChange(index, 'keterangan', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddMedicine}
            className="w-full bg-green-500 text-white py-2 rounded-lg mb-4 hover:bg-green-600 flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Tambah Obat
          </button>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
            >
              {isSubmitting ? 'Memproses...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DiagnosaModal; 