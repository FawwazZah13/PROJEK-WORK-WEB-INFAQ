// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

export default function Home() {
  const [rayon, setRayon] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/by/rayon', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
    .then(response => {
      if (response.data.success) {
        setRayon(response.data.data); // Simpan data rayon
      }
    })
    .catch(err => {
      setError('Gagal mengambil data rayon');
      console.error('Rayon fetch error:', err);
    });
  }, []);

  return (
    <div className="p-4 sm:p-6 mb-8">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-2 text-center sm:text-left">
        Dashboard
      </h1>

      {/* Tampilkan nama rayon */}
      {rayon ? (
       <h1 className="text-2xl sm:text-3xl font-bold text-center text-indigo-600 mb-9 mt-9">
       Selamat datang <span className="font-semibold">{rayon.name}</span>
     </h1>
     
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <p className="text-center text-gray-500 mb-4">Loading data rayon...</p>
      )}

      {/* Kontainer untuk scroll horizontal */}
      <div className="overflow-x-auto">
        <div className="whitespace-nowrap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1 */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg flex flex-col justify-between max-w-full inline-block">
            <h2 className="text-lg sm:text-xl font-medium text-gray-700">
              Total Yang Terkumpul
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-indigo-600 mt-2 sm:mt-4">
              Rp 10,000,000
            </p>
            <div className="mt-2 sm:mt-4">
              <p className="text-gray-500 text-sm sm:text-base">
                Total amount donated over the past year.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg flex flex-col justify-between max-w-full inline-block">
            <h2 className="text-lg sm:text-xl font-medium text-gray-700">
              Recent Donations
            </h2>
            <ul className="mt-3 sm:mt-4 space-y-2">
              <li className="flex justify-between text-gray-600 text-sm sm:text-base">
                <span>John donated</span>
                <span>Rp 1,000,000</span>
              </li>
              <li className="flex justify-between text-gray-600 text-sm sm:text-base">
                <span>Jane donated</span>
                <span>Rp 500,000</span>
              </li>
              <li className="flex justify-between text-gray-600 text-sm sm:text-base">
                <span>Michael donated</span>
                <span>Rp 750,000</span>
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg flex flex-col justify-between max-w-full inline-block">
            <h2 className="text-lg sm:text-xl font-medium text-gray-700">
              Upcoming Events
            </h2>
            <div className="mt-3 sm:mt-4 space-y-2">
              <div className="flex items-center text-gray-600 text-sm sm:text-base">
                <div className="h-3 w-3 sm:h-4 sm:w-4 border border-gray-200 mr-3 sm:mr-4 rounded-full bg-indigo-200" />
                Charity Walk - 5th Sep
              </div>
              <div className="flex items-center text-gray-600 text-sm sm:text-base">
                <div className="h-3 w-3 sm:h-4 sm:w-4 border border-gray-200 mr-3 sm:mr-4 rounded-full bg-indigo-200" />
                Fundraising Gala - 20th Sep
              </div>
              <div className="flex items-center text-gray-600 text-sm sm:text-base">
                <div className="h-3 w-3 sm:h-4 sm:w-4 border border-gray-200 mr-3 sm:mr-4 rounded-full bg-indigo-200" />
                Community Service - 15th Oct
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

