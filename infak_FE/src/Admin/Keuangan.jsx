// eslint-disable-next-line no-unused-vars
import React from 'react';

const financialData = {
  weekly: [
    { day: 'Senin', income: 1000},
    { day: 'Selasa', income: 1200},
    { day: 'Rabu', income: 800},
    { day: 'Kamis', income: 1500},
    { day: 'Jumat', income: 2000},
    { day: 'Sabtu', income: 1800},
    { day: 'Minggu', income: 1600},
  ],
  monthly: [
    { month: 'Januari', income: 7000, expense: 2500, description: 'Total pengeluaran untuk gaji dan bahan baku' },
    { month: 'Februari', income: 8000, expense: 3000, description: 'Total pengeluaran untuk iklan dan transportasi' },
    // Tambahkan bulan lainnya sesuai kebutuhan
  ],
  yearly: [
    { year: 2023, income: 100000, expense: 40000, description: 'Total pengeluaran untuk semua bulan' },
  ],
};

const FinancialReport = () => {
  return (
<div className="p-6 min-h-screen">
<h1 className="text-4xl font-bold mb-8 text-gray-800">Laporan Keuangan</h1>
      
      <h2 className="text-xl font-semibold mt-4">Data Mingguan</h2>
      <table className="min-w-full border-collapse border border-gray-200 mt-2">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 p-2">Hari</th>
            <th className="border border-gray-200 p-2">Pendapatan</th>
          </tr>
        </thead>
        <tbody>
          {financialData.weekly.map((item, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="border border-gray-200 p-2">{item.day}</td>
              <td className="border border-gray-200 p-2">{item.income}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mt-4">Data Bulanan</h2>
      <table className="min-w-full border-collapse border border-gray-200 mt-2">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 p-2">Bulan</th>
            <th className="border border-gray-200 p-2">Pendapatan</th>
            <th className="border border-gray-200 p-2">Pengeluaran</th>
            <th className="border border-gray-200 p-2">Deskripsi</th>
          </tr>
        </thead>
        <tbody>
          {financialData.monthly.map((item, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="border border-gray-200 p-2">{item.month}</td>
              <td className="border border-gray-200 p-2">{item.income}</td>
              <td className="border border-gray-200 p-2">{item.expense}</td>
              <td className="border border-gray-200 p-2">{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mt-4">Data Tahunan</h2>
      <table className="min-w-full border-collapse border border-gray-200 mt-2">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 p-2">Tahun</th>
            <th className="border border-gray-200 p-2">Pendapatan</th>
            <th className="border border-gray-200 p-2">Pengeluaran</th>
          </tr>
        </thead>
        <tbody>
          {financialData.yearly.map((item, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="border border-gray-200 p-2">{item.year}</td>
              <td className="border border-gray-200 p-2">{item.income}</td>
              <td className="border border-gray-200 p-2">{item.expense}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinancialReport;
