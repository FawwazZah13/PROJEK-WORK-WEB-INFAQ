// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Chart from "react-apexcharts";

export default function Home() {
  const [chartData] = useState({
    series: [
      {
        name: "Inflation",
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 95, 100], // Data untuk 12 bulan
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        toolbar: {
          show: true, // Menyembunyikan toolbar ApexCharts
        },
      },
      colors: ["#4F46E5"], // Warna batang
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top", // Menampilkan label di atas bar
          },
          columnWidth: "65%", // Lebar kolom
          borderRadius: 4, // Membuat ujung bar sedikit melengkung
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "%"; // Menambahkan simbol % pada label data
        },
        offsetY: -20,
        style: {
          fontSize: "15px",
          colors: ["#333"],
        },
      },
      xaxis: {
        categories: [
          "Juli",
          "Januari",
          "Agustus",
          "Februari",
          "September",
          "Maret",
          "Oktober",
          "April",
          "November",
          "Mei",
          "Desember",
          "Juni",
        ], // 12 bulan dalam setahun
        position: "bottom", // Menampilkan label bulan di bawah
        labels: {
          offsetY: 0, // Mengatur jarak label dari sumbu x
          style: {
            fontSize: "16px",
            colors: ["#333"],
          },
        },
        axisBorder: {
          show: true,
          color: "#78909C", // Warna garis sumbu x
        },
        axisTicks: {
          show: true,
          color: "#78909C", // Warna tanda sumbu x
        },
      },
      yaxis: {
        show: true,
        labels: {
          formatter: function (val) {
            return val + "%"; // Menambahkan % pada label y-axis
          },
          style: {
            fontSize: "16px",
            colors: ["#4F46E5"],
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      grid: {
        strokeDashArray: 4, // Garis grid putus-putus
        borderColor: "#ECEFF1", // Warna garis grid
      },
    },
  });

  return (
    <div className="">
      <div className="p-6 min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Donations Card */}
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-700">
              Total Donasi
            </h2>
            <p className="text-4xl font-bold text-indigo-600 mt-4">
              Rp 10,000,000
            </p>
            <p className="text-gray-500 mt-4">Jumlah total yang disumbangkan</p>
          </div>

          {/* Recent Donations Card */}
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-700">
              Rayon yang Sudah Bayar
            </h2>
            <ul className="mt-4 space-y-1 max-h-24 overflow-y-auto">
              <li className="flex justify-between items-center text-gray-600">
                <span>Rayon Cisarua 6</span>
                <span className="text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </li>
              <li className="flex justify-between items-center text-gray-600">
                <span>Rayon Cicurug 5</span>
                <span className="text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </li>
              <li className="flex justify-between items-center text-gray-600">
                <span>Rayon Tajur 4</span>
                <span className="text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </li>
              <li className="flex justify-between items-center text-gray-600">
                <span>Rayon Sukasari 5</span>
                <span className="text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </li>
            </ul>
          </div>

          {/* Upcoming Events Card */}
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-700">
              Rayon yang Belum Bayar
            </h2>
            <ul className="mt-4 space-y-1 max-h-24 overflow-y-auto">
              <li className="flex justify-between items-center text-gray-600">
                <span>Rayon Ciawi 1</span>
                <span className="text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </li>
              <li className="flex justify-between items-center text-gray-600">
                <span>Rayon Cisarua 2</span>
                <span className="text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </li>
              <li className="flex justify-between items-center text-gray-600">
                <span>Rayon Cibedug 2</span>
                <span className="text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </li>
              <li className="flex justify-between items-center text-gray-600">
                <span>Rayon Cicurug 10</span>
                <span className="text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Donations Chart */}
        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 mt-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            Grafik Pembayaran
          </h2>
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
}
