import { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";

function Riwayat() {
  const [dataBulan, setDataBulan] = useState([]);
  const [isOpen, setIsOpen] = useState({});
  const [popupData, setPopupData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nominal, setNominal] = useState(0); // Nominal dari /api/siswa

  const bulanMap = {
    1: "Januari",
    2: "Februari",
    3: "Maret",
    4: "April",
    5: "Mei",
    6: "Juni",
    7: "Juli",
    8: "Agustus",
    9: "September",
    10: "Oktober",
    11: "November",
    12: "Desember",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");

        if (!token) {
          console.error("Token tidak ditemukan");
          return;
        }

        // Ambil nominal dari /api/siswa
        const siswaResponse = await axios.get("http://localhost:8000/api/siswa", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const nominalValue = siswaResponse.data?.data?.nominal || "0";
        setNominal(nominalValue);

        // Ambil data pembayaran
        const pembayaranResponse = await axios.get("http://localhost:8000/api/data-bayar", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetchedData = pembayaranResponse.data?.data || [];

        // Buat array semua bulan dari 1-12
        const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);

        const bayarPerBulan = {};
        fetchedData.forEach((item) => {
          const bulanIds = JSON.parse(item.bulan_id);
          bulanIds.forEach((bulanId) => {
            bayarPerBulan[bulanId] = {
              status: item.status_pay === "paid" ? "Sudah Dibayar" : "Belum Dibayar",
              paymentDate: item.tanggal_bayar,
              bankInfo: item.bank_info,
              notes: item.notes,
            };
          });
        });

        const formattedData = [
          {
            year: "TP 2024/2025",
            data: allMonths.map((bulanId) => {
              const data = bayarPerBulan[bulanId];
              return {
                month: bulanMap[bulanId],
                amount: `Rp.${Number(nominalValue).toLocaleString("id-ID")}`,
                status: data ? data.status : "Belum Dibayar",
                details: {
                  paymentDate: data?.paymentDate
                    ? new Date(data.paymentDate).toLocaleDateString("id-ID")
                    : "-",
                  bankInfo: data?.bankInfo || "-",
                  notes: data?.notes || "-",
                },
              };
            }),
          },
        ];

        setDataBulan(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleDropdown = (year) => {
    setIsOpen((prev) => ({
      ...prev,
      [year]: !prev[year],
    }));
  };

  const openModal = (data) => {
    setPopupData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target.id === "modal-overlay") {
      closeModal();
    }
  };

  return (
    <div className="ml-12 mr-12">
      <p className="font-pt-serif font-bold">Kartu Zakat Infaq dan Shodaqoh</p>
      <br />

      {dataBulan.map((yearData, index) => (
        <div key={index} className="mb-4">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleDropdown(yearData.year)}
          >
            <p className="font-serif font-bold text-lg">{yearData.year}</p>
            {isOpen[yearData.year] ? (
              <FaChevronUp className="text-gray-500" />
            ) : (
              <FaChevronDown className="text-gray-500" />
            )}
          </div>
          <hr className="border-gray-300 my-2" />
          {isOpen[yearData.year] && (
            <div className="overflow-x-auto mt-2">
              <table className="min-w-full bg-[#FFFDF1] border border-gray-200 rounded-lg">
                <thead className="bg-[#A9B782]">
                  <tr>
                    <th className="py-2 px-4 text-left text-white">Bulan</th>
                    <th className="py-2 px-4 text-left text-white">Nominal Tagihan</th>
                    <th className="py-2 px-4 text-left text-white">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {yearData.data.map((data, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                      onClick={() => openModal(data)}
                    >
                      <td className="py-2 px-4">{data.month}</td>
                      <td className="py-2 px-4">{data.amount}</td>
                      <td className="py-2 px-4">
                        <span
                          className={`font-semibold px-2 py-1 rounded-full ${
                            data.status === "Sudah Dibayar"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {data.status}
                          {data.status === "Sudah Dibayar" && (
                            <FaCheckCircle className="inline ml-2 text-green-700" />
                          )}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}

      {isModalOpen && (
        <div
          id="modal-overlay"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleOverlayClick}
        >
          <div className="bg-[#FFFDF1] rounded-lg p-6 w-full max-w-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 text-3xl font-bold p-2"
            >
              &times;
            </button>
            <div className="text-center">
              <span
                className={`inline-block font-semibold px-4 py-2 rounded-full mb-4 ${
                  popupData.status === "Sudah Dibayar"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {popupData.status}
                {popupData.status === "Sudah Dibayar" && (
                  <FaCheckCircle className="inline ml-2 text-green-700" />
                )}
              </span>
              <h2 className="text-3xl font-bold">{popupData.amount}</h2>
              <p className="text-lg text-gray-700 mt-2">
                Zakat Infaq dan Shadaqoh Bulan {popupData.month} 2024
              </p>
            </div>
            <div className="mt-4 border border-gray-300 p-4 rounded-md">
              <h3 className="font-bold text-xl">Pembayaran</h3>
              <div className="ml-2">
                <p className="text-lg text-gray-600 mt-2">
                  Tanggal Pembayaran: {popupData.details?.paymentDate || "-"}
                </p>
                <p className="text-lg text-gray-600">
                  Berita Acara: Infaq dan Shodaqoh
                </p>
              </div>
              <div className="border-t border-gray-300 mt-4"></div>
              <p className="text-xl text-gray-500 mt-2 ml-2">Diterima oleh Wikrama</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Riwayat;
