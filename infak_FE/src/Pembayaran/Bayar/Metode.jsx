import React, { useState, useEffect } from "react";
import { FaChevronDown, FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PembayaranPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedData = location.state?.selectedData || [];
  const selectedMonths = selectedData.map(item => item.nama_bulan).join(", ") || "Bulan belum dipilih";
  const bulanId = selectedData.map(item => item.bulan_id); // bentuk array asli
  const siswa_id = sessionStorage.getItem("siswa_id");

  const [selectedZakat, setSelectedZakat] = useState("Pilih Jenis Zakat");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isZakatOpen, setIsZakatOpen] = useState(false);

  const zakatOptions = ["infaq shodaqoh", "zakat mall"];

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", "SB-Mid-client-_Gx1O1WojmA6RXwG");
    document.body.appendChild(script);
  }, []);

  const handleZakatSelect = (option) => {
    setSelectedZakat(option);
    setIsZakatOpen(false);
  };

  const handlePaymentSelect = (option) => {
    setSelectedPayment(option);
  };

  const handleBayar = async () => {
    if (!selectedZakat || !selectedPayment || !siswa_id || bulanId.length === 0) {
      alert("Mohon lengkapi semua data sebelum membayar!");
      return;
    }
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/bayar", {
        siswa_id,
        bulan_id: bulanId,
        kategori: selectedZakat,
        metode: selectedPayment,
      }, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });

      if (response.data.success && response.data.snap_token) {
        const snapToken = response.data.snap_token;

        if (window.snap) {
          window.snap.pay(snapToken, {
            onSuccess: function (result) {
              alert("Pembayaran berhasil!");
              navigate("/User/pembayaran2");
            },
            onPending: function (result) {
              alert("Pembayaran sedang diproses.");
            },
            onError: function (result) {
              alert("Terjadi kesalahan saat melakukan pembayaran.");
            },
            onClose: function () {
              alert("Anda belum menyelesaikan pembayaran.");
            },
          });
        } else {
          alert("Snap Midtrans belum dimuat. Coba lagi.");
        }
      } else {
        alert("Tidak dapat memproses pembayaran. Silakan coba lagi.");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat melakukan pembayaran.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF1] pt-12">
      <main className="container mx-auto py-12 px-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-green-600 hover:text-green-800"
        >
          <FaArrowLeft className="mr-2" /> Kembali
        </button>

        <section className="p-8 rounded-lg shadow-md mb-8 bg-white">
          <h2 className="text-2xl font-bold text-gray-800 mb-10">Pembayaran</h2>

          <div className="flex space-x-4 mb-10">
            <div className="relative w-1/2">
              <button
                className="w-full p-3 border rounded-xl bg-green-500 text-white flex justify-between items-center"
                onClick={() => setIsZakatOpen(!isZakatOpen)}
              >
                <span>{selectedZakat}</span>
                <FaChevronDown className="text-white h-5 w-5" />
              </button>
              {isZakatOpen && (
                <ul className="absolute w-full bg-white border rounded-lg shadow-lg mt-1 z-10">
                  {zakatOptions.map((option) => (
                    <li
                      key={option}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleZakatSelect(option)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="relative w-1/2">
              <input
                type="text"
                value={selectedMonths}
                readOnly
                className="w-full p-3 border rounded-xl bg-gray-200 text-gray-700"
              />
            </div>
          </div>
        </section>

        <section className="p-8 rounded-2xl shadow-lg mb-8 bg-white">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">Pilih Metode Pembayaran</h3>
          <div className="grid grid-cols-2 gap-6">
            {["QRIS", "Bank BNI"].map((method) => (
              <div
                key={method}
                className={`p-6 rounded-lg shadow-md cursor-pointer ${selectedPayment === method ? "bg-green-500 text-white" : "bg-gray-100 text-gray-800"}`}
                onClick={() => handlePaymentSelect(method)}
              >
                <p className="text-lg font-semibold text-center">{method}</p>
              </div>
            ))}
          </div>

          {selectedPayment === "Bank BNI" && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center text-gray-800">
              <p>Nomor Rekening:</p>
              <p className="font-bold text-lg">Bank Negara Indonesia (BNI) VA 9884456512209233</p>
            </div>
          )}

          <div className="text-center mt-8">
            <button
              onClick={handleBayar}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 flex justify-center items-center"
            >
              <FaShoppingCart className="mr-2" />
              Bayar
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PembayaranPage;
