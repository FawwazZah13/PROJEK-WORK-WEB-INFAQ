import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TabelSiswa = () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/siswa-ps", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response?.data || [];
        setUserData(data);
        sessionStorage.setItem("userData", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleView = (siswa) => {
    navigate("/ps/view", { state: { siswa } });
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = userData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(userData.length / itemsPerPage);

  return (
    <div className="flex flex-col bg-white">
      <div className="container mx-auto mt-8 px-4 flex-grow">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
          Tabel Siswa Rayon
        </h2>

        <div className="overflow-x-auto shadow border border-gray-200 rounded-lg">
          <table className="min-w-full bg-white text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-6 py-3 text-left border-b">No.</th>
                <th className="px-6 py-3 text-left border-b">Nama</th>
                <th className="px-6 py-3 text-left border-b">NIS</th>
                <th className="px-6 py-3 text-left border-b">Rombel</th>
                <th className="px-6 py-3 text-center border-b">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    Tidak ada data siswa
                  </td>
                </tr>
              ) : (
                currentData.map((siswa, index) => (
                  <tr key={siswa.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 border-b">{startIndex + index + 1}</td>
                    <td className="px-6 py-4 border-b">{siswa.name}</td>
                    <td className="px-6 py-4 border-b">{siswa.nis}</td>
                    <td className="px-6 py-4 border-b">{siswa.nama_rombel}</td>
                    <td className="px-6 py-4 border-b text-center">
                      <button
                        onClick={() => handleView(siswa)}
                        className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                      >
                        Lihat
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap justify-between items-center mt-6 gap-4">
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
    </div>
  );
};

export default TabelSiswa;
