import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("siswa_id");
  const token = sessionStorage.getItem("token");

  const [userData, setUserData] = useState({
    nis: "",
    name: "",
    rayon: "",
    nama_rombel: "",
    no_tlp: "",
    nominal: "",
    email: "",
    user_id: "",
    rayon_name: ""
  });

  useEffect(() => {
    const fetchSiswa = async () => {
      try {
        if (!userId) return;

        const response = await axios.get(
          `http://127.0.0.1:8000/api/siswa-profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const siswa = response.data?.data;

        if (siswa) {
          setUserData({
            nis: siswa.nis || "",
            name: siswa.name || "",
            rayon: siswa.rayon_id?.rayon || "",
            nama_rombel: siswa.nama_rombel || "",
            no_tlp: siswa.no_tlp || "",
            nominal: siswa.nominal || "",
            email: siswa.email || "",
            user_id: siswa.user?.id || "",
            rayon_name: siswa.rayon_id?.name || "",
          });
        }
      } catch (error) {
        console.error("Gagal mengambil data siswa:", error);
      }
    };

    if (userId && token) {
      fetchSiswa();
    }
  }, [userId, token]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/siswa/${userId}`,
        {
          no_tlp: userData.no_tlp,
          nominal: userData.nominal,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Data berhasil diperbarui!");
    } catch (error) {
      alert("Gagal memperbarui data");
    }
  };

  return (
    <div className="min-h-screen bg-customGreen p-6 font-poppins">
      <div className="max-w-xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 bg-gray-300 hover:bg-gray-400 text-sm text-black py-1 px-3 rounded"
        >
          ← Kembali
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Profil Siswa</h2>

        <div className="bg-white p-6 rounded-lg shadow-md space-y-3">
          <div><strong>NIS:</strong> {userData.nis}</div>
          <div><strong>Nama:</strong> {userData.name}</div>
          <div><strong>Rayon:</strong> {userData.rayon}</div>
          <div><strong>Pembimbing Rayon:</strong> {userData.rayon_name}</div>
          <div><strong>Rombel:</strong> {userData.nama_rombel}</div>
          <div><strong>Email:</strong> {userData.email}</div>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">No Telepon:</label>
              <input
                type="text"
                name="no_tlp"
                value={userData.no_tlp}
                onChange={handleChange}
                placeholder="Masukkan No Telepon"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Nominal:</label>
              <input
                type="text"
                name="nominal"
                value={userData.nominal}
                onChange={handleChange}
                placeholder="Masukkan Nominal"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Simpan Perubahan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
