'use client';
import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
import Cookies from 'js-cookie';

const UnauthorizedPage: React.FC = () => {
  const [homeRoute, setHomeRoute] = useState('/');

  useEffect(() => {
    // Configure js-cookie to match your cookie settings
    Cookies.withAttributes({
      path: '/',
      secure: true,
      sameSite: 'strict'
    });

    const token = Cookies.get('token');
    console.log('Token from js-cookie:', token); // Debug log
    
    if (token) {
      try {
        // Memisahkan token untuk mendapatkan role user
        const [userRole] = token.split('-');
        // Mapping role ke dashboard masing-masing
        const roleDashboards: { [key: string]: string } = {
          admin: '/admin/dashboard',
          dokter: '/dokter/dashboard',
          apoteker: '/apoteker/dashboard',
          administrasi: '/administrasi/dashboard'
        };
        
        // Set route berdasarkan role
        if (userRole && roleDashboards[userRole]) {
          setHomeRoute(roleDashboards[userRole]);
        }
      } catch (error) {
        console.error('Error parsing token:', error);
      }
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-24">
      <div className="flex items-center gap-6 text-white">
        <h1 className="text-2xl font-bold border-r border-gray-700 pr-6">403</h1>
        <p className="text-2xl">This page is forbidden.</p>
      </div>
    </main>
  );
}

export default UnauthorizedPage;