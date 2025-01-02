'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const Dashboard: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch('/api/logout', {
      method: 'POST',
    });

    const data = await response.json();
    if (data.success) {
      router.push('/login');
    } else {
      alert('Failed to logout.');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-4">Welcome to the admin dashboard!</p>
      
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
