import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bg from "../../assets/img/bg.png";
import StatusBlmBayar from "../../assets/Items/Status/StatusBlmBayar";
import Menunggak from "../../assets/Items/Status/Menunggak";

function Tagihan() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [unpaidMonths, setUnpaidMonths] = useState([]);
  const [nominal, setNominal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) throw new Error("Token tidak ditemukan. Silakan login kembali.");

        const userResponse = await axios.get("http://127.0.0.1:8000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = userResponse.data.data;
        if (!userData || !userData.role) throw new Error("Data user tidak valid.");
        if (userData.role !== "Siswa") throw new Error("Anda bukan siswa.");
        sessionStorage.setItem("role", userData.role);

        // Fetch data siswa
        const siswaResponse = await axios.get("http://127.0.0.1:8000/api/siswa", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const siswaData = siswaResponse.data.data;
        if (!siswaData || !siswaData.nis) throw new Error("Data siswa tidak ditemukan.");
        sessionStorage.setItem("nis", siswaData.nis);
        setNominal(siswaData.nominal);

        // Fetch data tagihan
        const tagihanResponse = await axios.get(
          `http://127.0.0.1:8000/api/bulan-belum-bayar/${siswaData.nis}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUnpaidMonths(tagihanResponse.data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleBayarSekarang = useCallback(() => {
    if (selectedItems.length === 0) return;
  
    const selectedData = unpaidMonths
      .filter((item) => selectedItems.includes(item.id))
      .map((item) => ({
        bulan_id: item.id, // ID bulan yang dipilih
        nama_bulan: item.nama_bulan, // Nama bulan yang diambil dari API
      }));
  
    console.log("Data yang dikirim ke halaman pembayaran:", selectedData);
  
    navigate("/User/pembayaran2", { state: { selectedData } });
  }, [selectedItems, unpaidMonths, navigate]);
  
  

  const handleSelectItem = useCallback((itemId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(itemId)
        ? prevSelected.filter((id) => id !== itemId)
        : [...prevSelected, itemId]
    );
  }, []);

  return (
    <div className="w-full bg-[#FFFDF1] p-6">
      <h2 className="text-xl font-bold mb-4">Tagihan Belum Dibayar</h2>
      {loading && <p>Memuat data...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {selectedItems.length > 0 && (
        <div className="flex justify-end pt-2">
          <button
            onClick={handleBayarSekarang}
            className="bg-[#A9B782] text-white py-2 px-4 rounded"
          >
            Bayar Sekarang
          </button>
        </div>
      )}
      <hr className="my-4 border-t-2 border-gray-300" />

      {unpaidMonths.length === 0 && !loading && (
        <p className="text-center text-gray-500">Tidak ada tagihan yang belum dibayar.</p>
      )}

      {unpaidMonths.map((item) => (
        <div
          key={item.id}
          className={`flex items-center ml-12 mr-12 mt-5 cursor-pointer transition-all duration-300 ease-in-out ${
            selectedItems.includes(item.id) ? "opacity-100 scale-105" : "opacity-80 scale-100"
          }`}
          onClick={() => handleSelectItem(item.id)}
        >
          <div
            className="p-4 rounded shadow-xl w-full flex justify-between items-center"
            style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
          >
            <div className="flex flex-col ml-4">
              <div className="flex space-x-2 mb-1">
                <StatusBlmBayar />
                <Menunggak />
              </div>
              <p className="font-bold text-black text-sm">
                Zakat Infaq dan Shadaqoh Bulan {item.nama_bulan} {new Date().getFullYear()}
              </p>
              <p className="text-gray-700 text-xs">
                No. Rekening: <span className="font-bold">1078742696</span>
              </p>
              <p className="text-gray-700 text-xs">
                Nama Rekening: <span className="font-bold">SMK Wikrama Bogor</span>
              </p>
              <p className="text-gray-700 text-xs">
                Bank: <span className="font-bold">Bank Syariah Indonesia (BSI)</span>
              </p>
            </div>
            <div className="flex justify-center w-[150px] h-[40px]">
            <span className="bg-[#A9B782] text-black py-1 px-4 rounded text-sm flex items-center justify-center font-semibold">
  {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(nominal)}
</span>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tagihan;
