import React, { useState } from 'react';
import Swal from 'sweetalert2';

interface Obat {
  resepObat: string;
  banyakObat: number;
  anjuranPakai: string;
}

interface Medicine {
  resepObat: string;
  banyakObat: number;
  anjuranPakai: string;
  harga: string;
}

interface AddInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: {
    nomor_pendaftaran: string;
    diagnosa: string;
    resep_obat: string;
  };
  onSuccess: () => void;
}

const AddInvoiceModal: React.FC<AddInvoiceModalProps> = ({
  isOpen,
  onClose,
  patient,
  onSuccess
}) => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [totalHarga, setTotalHarga] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Parse resep obat when modal opens
  React.useEffect(() => {
    try {
      const parsedMedicines = JSON.parse(patient.resep_obat).map((obat: Obat) => ({
        ...obat,
        harga: ''
      }));
      setMedicines(parsedMedicines);
    } catch (e) {
      console.error("Failed to parse resep_obat:", e);
    }
  }, [patient.resep_obat]);

  const handleHargaChange = (index: number, value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    const updatedMedicines = [...medicines];
    updatedMedicines[index].harga = numericValue;
    setMedicines(updatedMedicines);

    // Calculate total
    const total = updatedMedicines.reduce((sum, medicine) => {
      return sum + (parseInt(medicine.harga || '0', 10));
    }, 0);
    setTotalHarga(total.toString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          harga: totalHarga,
          nomor_pendaftaran: patient.nomor_pendaftaran
        }),
      });

      const data = await response.json();

      if (data.success) {
        await Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Harga berhasil ditambahkan',
          timer: 1500,
          showConfirmButton: false
        });
        onSuccess();
        onClose();
      } else {
        throw new Error(data.message || 'Gagal menambahkan harga');
      }
    } catch (error) {
      console.error('Error adding invoice:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Terjadi Kesalahan',
        text: error instanceof Error ? error.message : 'Gagal menambahkan harga',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatRupiah = (angka: string) => {
    const number = parseInt(angka || '0', 10);
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(number);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Input Harga</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Diagnosa:</h3>
          <p className="text-gray-700">{patient.diagnosa}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {medicines.map((medicine, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Obat
                    </label>
                    <input
                      type="text"
                      value={medicine.resepObat}
                      className="w-full border rounded-lg p-2 bg-gray-100"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Jumlah
                    </label>
                    <input
                      type="text"
                      value={medicine.banyakObat}
                      className="w-full border rounded-lg p-2 bg-gray-100"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Harga
                    </label>
                    <input
                      type="text"
                      value={medicine.harga}
                      onChange={(e) => handleHargaChange(index, e.target.value)}
                      className="w-full border rounded-lg p-2"
                      placeholder="Masukkan harga"
                      required
                    />
                    {medicine.harga && (
                      <p className="mt-1 text-sm text-gray-600">
                        {formatRupiah(medicine.harga)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 border rounded-lg bg-blue-50">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total Harga:</span>
              <span className="text-xl font-bold text-blue-600">
                {formatRupiah(totalHarga)}
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              disabled={isLoading}
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={isLoading}
            >
              {isLoading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInvoiceModal; 