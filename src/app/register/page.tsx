"use client";
import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Swal from "sweetalert2"
import "../assets/custom.css";

const Register = () => {

  const [formData, setFormData] = useState({
    nama: '',
    jenis_kelamin: '',
    usia: '',
    poliklinik: '',
    tanggal_lahir: '',
  });

  // State for error messages
  const [errors, setErrors] = useState({
    nama: "",
    jenis_kelamin: "",
    usia: "",
    poliklinik: "",
    tanggal_lahir: "",
  });

  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Handle non-2xx responses
        const errorResponse = await response.text();  // Capture the raw response text
        setMessage(`Error: ${errorResponse}`);
        return;
      }

      // Check if response has a valid JSON body
      const result = await response.json();

      // Check if result is an expected JSON object
      if (result && result.success !== undefined) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: result.message || "You have been successfully registered!",
        }).then(function() {
          window.location = "/";
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: result.message || "There was an error while registering.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong, please try again later.",
      });
    }
  };

  return (
    <>
      <main className="container">
        <div className="header-container">
          <Header />
        </div>
        <div className="form-register h-screen flex items-center justify-center">
          <div className="container max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-4">Registrasi pasien baru</h2>
            <form onSubmit={handleSubmit}>
              {/* Nama Input */}
              <div className="mb-4">
                <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama</label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.nama && <p className="text-red-500 text-sm mt-2">{errors.nama}</p>}
              </div>

              {/* Jenis Kelamin Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
                <div className="flex items-center my-1">
                  <input
                    id="laki-laki"
                    type="radio"
                    value="Laki-laki"
                    name="jenis_kelamin"
                    checked={formData.jenis_kelamin === "Laki-laki"}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="laki-laki" className="ms-2 text-sm font-medium text-black-900">Laki-laki</label>
                </div>
                <div className="flex items-center">
                  <input
                    id="perempuan"
                    type="radio"
                    value="Perempuan"
                    name="jenis_kelamin"
                    checked={formData.jenis_kelamin === "Perempuan"}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="perempuan" className="ms-2 text-sm font-medium text-black-900">Perempuan</label>
                </div>
                {errors.jenis_kelamin && <p className="text-red-500 text-sm mt-2">{errors.jenis_kelamin}</p>}
              </div>

              {/* Usia Input */}
              <div className="mb-4">
                <label htmlFor="usia" className="block text-sm font-medium text-gray-700">Usia</label>
                <input
                  type="number"
                  id="usia"
                  name="usia"
                  value={formData.usia}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.usia && <p className="text-red-500 text-sm mt-2">{errors.usia}</p>}
              </div>

              {/* Poliklinik Input */}
              <div className="mb-4">
                <label htmlFor="poliklinik" className="block text-sm font-medium text-gray-700">Poliklinik</label>
                <select
                  id="poliklinik"
                  name="poliklinik"
                  value={formData.poliklinik}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Poliklinik</option>
                  <option value="Umum">Umum</option>
                  <option value="Bidan">Bidan</option>
                  <option value="Anak">Anak</option>
                  <option value="Penyakit Dalam">Penyakit Dalam</option>
                </select>
                {errors.poliklinik && <p className="text-red-500 text-sm mt-2">{errors.poliklinik}</p>}
              </div>

              {/* Tanggal Lahir Input */}
              <div className="mb-4">
                <label htmlFor="tanggal_lahir" className="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
                <input
                  type="date"
                  id="tanggal_lahir"
                  name="tanggal_lahir"
                  value={formData.tanggal_lahir}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.tanggal_lahir && <p className="text-red-500 text-sm mt-2">{errors.tanggal_lahir}</p>}
              </div>

              {/* Submit Button */}
              <div className="mb-4 text-center">
                <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Submit
                </button>
              </div>
            </form>

            {/* Message after submission */}
            {message && <p className="text-center mt-4 text-sm">{message}</p>}
          </div>
        </div>
        <div className="footer-container">
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Register;
