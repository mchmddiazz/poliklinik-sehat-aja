'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginData = { username, password };
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      if (data.success) {
        switch (data.role) {
          case 'admin':
            router.push('/admin/dashboard');
            break;
          case 'dokter':
            router.push('/dokter/dashboard');
            break;
          case 'apoteker':
            router.push('/apoteker/dashboard');
            break;
          case 'administrasi':
            router.push('/administrasi/dashboard');
            break;
          default:
            alert('Username or password is invalid, please check again')
        }
      } else {
        alert('Login failed: ' + data.message);
      }
    } catch (err) {
      alert('Error logging in. Please try again.');
    }
  };

  return (
    <div className='container-login'>
      <div className="h-screen flex items-center justify-center">
        <form className="w-1/3 bg-white p-8 rounded shadow-md" onSubmit={handleLogin}>
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
