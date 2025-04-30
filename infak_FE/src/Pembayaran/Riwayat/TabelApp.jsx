import React, { useEffect, useState } from "react";
import axios from "axios";

function TabelApp() {
  const [data, setData] = useState([]);
  const [selectedFile, setSelectedFile] = useState({});
  const [loadingIndex, setLoadingIndex] = useState(null);

  const fetchData = async () => {
    try {
      const token = sessionStorage.getItem("token");
  
      // Ambil user login
      const userRes = await axios.get("http://localhost:8000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const nisUserLogin = userRes.data.data.nis;
  
      // Ambil data bulan, pembayaran, dan bukti
      const [bulanRes, bayarRes, buktiRes] = await Promise.all([
        axios.get("http://localhost:8000/api/bulan", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8000/api/data-bayar", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8000/api/bukti", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
  
      const bulanData = bulanRes.data.data;
      const pembayaranData = bayarRes.data.data;
      const buktiData = buktiRes.data.data;
  
      // Filter pembayaran sesuai user login
      const pembayaranSiswa = pembayaranData.filter(
        (p) => p.siswa_id?.nis === nisUserLogin
      );
  
      const combinedData = bulanData.map((bulan) => {
        const pembayaran = pembayaranSiswa.find((p) => {
          let bulanIds = [];
          if (typeof p.bulan_id === "string") {
            try {
              bulanIds = JSON.parse(p.bulan_id);
            } catch (e) {
              bulanIds = [];
            }
          } else if (Array.isArray(p.bulan_id)) {
            bulanIds = p.bulan_id;
          }
          return bulanIds.includes(bulan.id);
        });
  
        // Cari bukti berdasarkan id_bayar dari pembayaran
        const bukti = pembayaran ? buktiData.find((b) => b.id_bayar === pembayaran.id) : null;
  
        // Cek apakah pembayaran memiliki file upload atau tidak
        const uploadExists = bukti && bukti.upload_pembayaran;  // Mengambil upload_pembayaran dari bukti
  
        // Status hanya tercentang jika upload_pembayaran ada, dan jika bukti sudah lengkap
        const status = uploadExists && 
          (bukti &&
            bukti.paraf !== "❌" &&
            bukti.ttd_ortu !== "❌" &&
            bukti.penerima !== "-") 
          ? "✅" 
          : "❌";
  
        return {
          id: bulan.id,
          nama_bulan: bulan.nama_bulan,
          tanggal_bayar: pembayaran ? pembayaran.tanggal_bayar : "-",
          penerima: bukti?.penerima || "-",
          paraf: bukti?.paraf === "✅" ? "✅" : "❌",
          ttd_ortu: bukti?.ttd_ortu === "✅" ? "✅" : "❌",
          status: status,  // status berdasarkan upload dan bukti
          sudahUpload: uploadExists || false, // Set nilai default jika undefined
          id_bayar: pembayaran ? pembayaran.id : null,
          upload_pembayaran: bukti ? bukti.upload_pembayaran : null, // Ambil dari bukti
        };
      });
  
      setData(combinedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  const handleFileChange = (e, index) => {
    setSelectedFile({
      ...selectedFile,
      [index]: e.target.files[0],
    });
  };

  const handleUpload = async (index) => {
    const file = selectedFile[index];
    if (!file) {
      alert("Pilih file terlebih dahulu!");
      return;
    }

    const id_bayar = data[index].id_bayar;
    if (!id_bayar) {
      alert("ID bayar tidak ditemukan!");
      return;
    }

    setLoadingIndex(index);
    try {
      const token = sessionStorage.getItem("token");
      const formData = new FormData();
      formData.append("upload_pembayaran", file);

      await axios.post(
        `http://localhost:8000/api/upload-pembayaran/${id_bayar}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Setelah upload berhasil, lakukan refresh data
      alert("Upload berhasil!");
      fetchData(); // Reload data setelah upload
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Gagal upload pembayaran.");
    }
    setLoadingIndex(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full flex justify-center md:px-10 lg:px-12">
      <div className="overflow-x-auto w-full">
        <table className="min-w-[640px] md:w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-[#A9B782]">
            <tr>
              <th className="py-2 px-4 text-white border">Bulan</th>
              <th className="py-2 px-4 text-white border">Tanggal Bayar</th>
              <th className="py-2 px-4 text-white border">Penerima</th>
              <th className="py-2 px-4 text-white border">Paraf</th>
              <th className="py-2 px-4 text-white border">Tanda Tangan Ortu</th>
              <th className="py-2 px-4 text-white border">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-[#FFFDF1]">
            {data.map((item, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="py-2 px-4 border">{item.nama_bulan}</td>
                <td className="py-2 px-4 border">{item.tanggal_bayar}</td>
                <td className="py-2 px-4 border">{item.penerima}</td>
                <td className="py-2 px-4 border text-center">{item.paraf}</td>
                <td className="py-2 px-4 border text-center">{item.ttd_ortu}</td>
                <td className="py-2 px-4 border text-center">
                  {/* Menampilkan ceklis setelah upload berhasil */}
                  {item.status === "✅" ? (
                    "✅"
                  ) : (
                    <div className="flex flex-col gap-1 items-center">
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleFileChange(e, index)}
                        className="text-sm"
                      />
                      <button
                        onClick={() => handleUpload(index)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        disabled={loadingIndex === index}
                      >
                        {loadingIndex === index ? "Uploading..." : "Upload"}
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TabelApp;
