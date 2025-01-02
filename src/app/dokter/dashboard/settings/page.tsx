import React, { useState } from 'react';
import Link from 'next/link';

const Settings: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Dashboard Settings</h1>
      <p className="mt-4">Adjust your admin dashboard settings here.</p>

      <div className="mt-6">
        <Link href="/admin/dashboard">
          <span className="text-blue-500 underline">Back to Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export default Settings;