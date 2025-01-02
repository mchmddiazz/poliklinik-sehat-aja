'use client';

import React, {useState} from "react";
import Link from "next/link";

const Home: React.FC = () => {
  const [poliklinikCount, setPoliklinikCount] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  
  // const [count, setCount] = useState(0);
  // const handleClick = () => {
  //   setCount(count + 1); // Increment the count by 1
  // };
  // <span className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48">{count}</span>
  // <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-fit mx-auto"
  //         onClick={handleClick}
  // >
  //   Ambil tiket
  // </button>
  return (
    <div className="py-24 h-screen flex flex-row items-center justify-center">
      <div className="basis-full ticket-item">
        <div className="ticket-wrapper flex flex-col">
          <h1 className="mb-14 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">Unit Pengobatan</h1>
          <div className="flex items-center justify-center unit-container w-2/4 m-auto">
            <div className="basis-1/4 unit-item px-3">
              <Link href="/register" className="w-full block text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Umum</Link>
            </div>
            <div className="basis-1/4 unit-item px-3">
              <Link href="/register" className="w-full block text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Bidan</Link>
            </div>
            <div className="basis-1/4 unit-item px-3">
              <Link href="/register" className="w-full block text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Anak</Link>
            </div>
            <div className="basis-1/4 unit-item px-3">
              <Link href="/register" className="w-full block text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Penyakit dalam</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;