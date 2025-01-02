import React, { useState } from 'react';
import Link from 'next/link';

const Dashboard: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-4">Welcome to the admin dashboard!</p>
      
      <div className="mt-6">
        <Link href="/admin/dashboard/settings">
          <span className="text-blue-500 underline">Go to Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;