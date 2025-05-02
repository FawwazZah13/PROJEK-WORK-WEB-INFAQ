import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

export default function Home() {
  const [rayon, setRayon] = useState(null);
  const [totalInfaq, setTotalInfaq] = useState(null);
  const [donasiTerbaru, setDonasiTerbaru] = useState([]);
  const [error, setError] = useState(null);

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    // Ambil data rayon
    axios.get('http://127.0.0.1:8000/api/by/rayon', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      if (response.data.success) {
        const rayonData = response.data.data;
        setRayon(rayonData);
  
        console.log('Rayon Data:', rayonData); // Log data rayon untuk pemeriksaan
  
        // Ambil data bayar setelah rayon tersedia
        axios.get('http://127.0.0.1:8000/api/data-bayar', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          if (res.data.success) {
            console.log('Data Bayar:', res.data.data); // Log data bayar untuk pemeriksaan
  
            // Filter data sesuai rayon
            const filtered = res.data.data.filter(item => item.siswas.rayon_id === rayonData.id);
            console.log('Filtered Donasi:', filtered); // Log data yang telah difilter
  
            setDonasiTerbaru(filtered.slice(0, 5)); // hanya ambil 5 data terbaru
          }
        })
        .catch(err => {
          setError('Gagal mengambil data donasi');
          console.error('Data bayar fetch error:', err);
        });
  
      }
    })
    .catch(err => {
      setError('Gagal mengambil data rayon');
      console.error('Rayon fetch error:', err);
    });
  
    // Ambil total infaq
    axios.get('http://127.0.0.1:8000/api/jumlah-infaq', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      if (response.data.success) {
        setTotalInfaq(response.data.total_infaq);
      }
    })
    .catch(err => {
      setError('Gagal mengambil total infaq');
      console.error('Infaq fetch error:', err);
    });
  }, [token]);
  

  return (
    <div className="p-6 sm:p-10 mb-10">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center sm:text-left">
        Dashboard
      </h1>

      {rayon ? (
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-700 mb-10 mt-6">
          Selamat datang, <span className="font-extrabold">{rayon.name}</span>
        </h2>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <p className="text-center text-gray-500 mb-4">Loading data rayon...</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card: Total Infaq */}
        <div className="bg-white p-10 rounded-2xl shadow-2xl flex flex-col justify-between min-h-[250px]">
          <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            Total Yang Terkumpul
          </h3>
          <p className="text-4xl sm:text-5xl font-bold text-indigo-600 mt-4">
            {totalInfaq !== null ? `Rp ${totalInfaq.toLocaleString()}` : 'Loading...'}
          </p>
          <p className="text-gray-500 text-base sm:text-lg mt-4">
            Total infaq terkumpul dari rayon Anda.
          </p>
        </div>

        {/* Card: Donasi Terbaru */}
        <div className="bg-white p-10 rounded-2xl shadow-2xl flex flex-col justify-between min-h-[250px]">
          <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            Donasi Terbaru
          </h3>
          {donasiTerbaru.length > 0 ? (
            <ul className="mt-4 space-y-3 text-gray-700 text-base sm:text-lg">
              {donasiTerbaru.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.siswas.name ? item.siswas.name : 'Unknown'}</span>
                  <span>Rp {Number(item.siswas.nominal).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-4">Belum ada donasi.</p>
          )}
        </div>
      </div>
    </div>
  );
}
