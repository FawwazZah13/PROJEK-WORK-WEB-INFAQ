import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.css";

const View = () => {
  const location = useLocation();
  const siswa = location.state?.siswa;
  const navigate = useNavigate();

  const [dataBulan, setDataBulan] = useState([]);
  const [dataBayar, setDataBayar] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('token'); // Mengambil token dari localStorage
        const headers = {
          Authorization: `Bearer ${token}`, // Menambahkan token pada header Authorization
        };

        const [bulanRes, bayarRes] = await Promise.all([
          axios.get("http://localhost:8000/api/bulan", { headers }), // Menggunakan token untuk request
          axios.get("http://localhost:8000/api/data-bayar", { headers }), // Menggunakan token untuk request
        ]);

        setDataBulan(bulanRes.data?.data || []);
        setDataBayar(bayarRes.data?.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Cek apakah siswa sudah bayar pada bulan tertentu
  const checkStatusBayar = (bulanId) => {
    return dataBayar.some((bayar) => {
      const bulanIds = JSON.parse(bayar.bulan_id || "[]");
      return (
        bayar.siswa_id === siswa.id &&
        bayar.status_pay === "paid" &&
        bulanIds.includes(bulanId)
      );
    });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = dataBulan.slice(startIndex, endIndex);
  const totalPages = Math.ceil(dataBulan.length / itemsPerPage);

  return (
    <div className="flex flex-col bg-white">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 text-black hover:text-gray-500 transition-all duration-300"
      >
        Kembali
      </button>

      <h2 className="text-3xl font-bold mb-6 text-gray-800">{siswa?.name}</h2>

      <div className="overflow-x-auto shadow border border-gray-200 rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left font-medium text-gray-600 border-b">No.</th>
              <th className="px-6 py-3 text-left font-medium text-gray-600 border-b">Bulan</th>
              <th className="px-6 py-3 text-center font-medium text-gray-600 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                  Tidak ada data bulan
                </td>
              </tr>
            ) : (
              currentData.map((bulan, index) => {
                const sudahBayar = checkStatusBayar(bulan.id);
                return (
                  <tr key={bulan.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 border-b">{startIndex + index + 1}</td>
                    <td className="px-6 py-4 border-b">{bulan.nama_bulan}</td>
                    <td className="px-6 py-4 border-b text-center">
                      <button
                        className={`px-4 py-2 rounded-full text-sm font-semibold focus:outline-none transition-all duration-300 ${
                          sudahBayar
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-red-400 text-white hover:bg-red-600"
                        }`}
                      >
                        {sudahBayar ? "Sudah Bayar ✔️" : "Belum Bayar ❌"}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          &lt; Sebelumnya
        </button>

        <span className="text-gray-600">
          Halaman {currentPage} dari {totalPages}
        </span>

        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Selanjutnya &gt;
        </button>
      </div>
    </div>
  );
};

export default View;
