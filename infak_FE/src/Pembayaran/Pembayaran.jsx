// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TabelApp from "./Riwayat/TabelApp";
import Riwayat from "./Riwayat/Riwayat";
import Navbar from "../assets/Items/navbar";
import Tagihan from "./Bayar/Tagihan"; // Import Tagihan
import { FiLogOut } from "react-icons/fi";

function Pembayaran() {
  const [activeTab, setActiveTab] = useState("tabel");
  const [userName, setUserName] = useState("");
  const [userNIS, setUserNIS] = useState("");
  const [userRayon, setUserRayon] = useState("");
  const [userPS, setUserPS] = useState("");
  const [userRombel, setUserRombel] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // Mendapatkan path saat ini

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      const { name, nis, rayon_id, nama_rombel } = JSON.parse(storedUserData);
      setUserName(name);
      setUserRombel(nama_rombel);
      setUserRayon(rayon_id.rayon);
      setUserPS(rayon_id.name);
      setUserNIS(nis);
    }
  }, []);

  const handleTabClick = (tab) => setActiveTab(tab);

  const handleBackClick = () => navigate("/user/dashboard");

  // Kondisi untuk menampilkan konten berdasarkan path
  if (location.pathname === "/user/pembayaran") {
    return (
      <div className="w-full bg-[#FFFDF1] min-h-screen pt-12">
        <Navbar />
        <div className="px-28 py-14">
        <h2 className="text-center text-2xl font-bold pt-3">
           Website Pembayaran Zakat Infaq & Shadaqoh
        </h2>
        <div className="flex flex-col space-y-2 px-12 pt-10">
          <div className="text-left space-y-1">
            <div className="flex">
              <p className="font-pt-serrif font-semibold w-60">NIS</p>
              <p className="font-pt-serrif font-semibold flex-1">: {userNIS}</p>
            </div>
            <div className="flex">
              <p className="font-pt-serrif font-semibold w-60">Nama</p>
              <p className="font-pt-serrif font-semibold flex-1">: {userName}</p>
            </div>
            <div className="flex">
              <p className="font-pt-serrif font-semibold w-60">Rombel</p>
              <p className="font-pt-serrif font-semibold flex-1">: {userRombel}</p>
            </div>
            <div className="flex">
              <p className="font-pt-serrif font-semibold w-60">Rayon</p>
              <p className="font-pt-serrif font-semibold flex-1">: {userRayon}</p>
            </div>
            <div className="flex">
              <p className="font-pt-serrif font-semibold w-60">Pembimbing Rayon</p>
              <p className="font-pt-serrif font-semibold flex-1">: {userPS}</p>
            </div>
          </div>
        </div>
          <div className="flex flex-col space-y-2 p-12 pt-8">
            <Tagihan /> {/* Menampilkan isi dari Tagihan */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FFFDF1] min-h-screen pt-12">
      <Navbar />
      <div className="px-28 py-14">
        <h2 className="text-center text-2xl font-bold pt-3">
          Bukti App Zakat Infaq & Shadaqoh
        </h2>
        <div className="flex flex-col space-y-2 p-12 pt-10">
          <div className="text-left space-y-1">
            <div className="flex">
              <p className="font-pt-serrif font-semibold w-60">NIS</p>
              <p className="font-pt-serrif font-semibold flex-1">: {userNIS}</p>
            </div>
            <div className="flex">
              <p className="font-pt-serrif font-semibold w-60">Nama</p>
              <p className="font-pt-serrif font-semibold flex-1">: {userName}</p>
            </div>
            <div className="flex">
              <p className="font-pt-serrif font-semibold w-60">Rombel</p>
              <p className="font-pt-serrif font-semibold flex-1">: {userRombel}</p>
            </div>
            <div className="flex">
              <p className="font-pt-serrif font-semibold w-60">Rayon</p>
              <p className="font-pt-serrif font-semibold flex-1">: {userRayon}</p>
            </div>
            <div className="flex">
              <p className="font-pt-serrif font-semibold w-60">Pembimbing Rayon</p>
              <p className="font-pt-serrif font-semibold flex-1">: {userPS}</p>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-4 mb-6 ml-12">
          {["tabel", "riwayat"].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 rounded flex items-center space-x-2 ${
                activeTab === tab ? "bg-[#A9B782] text-white" : "text-white opacity-70"
              }`}
              style={{
                background:
                  activeTab === tab
                    ? "linear-gradient(to bottom, #456F47, #69895C, #A9B782)"
                    : "linear-gradient(to bottom, #456F47, #69895C, #A9B782)",
              }}
              onClick={() => handleTabClick(tab)}
            >
              <span>{tab === "tabel" ? "Tabel App" : "Riwayat App"}</span>
            </button>
          ))}
        </div>
        {activeTab === "tabel" && <TabelApp />}
        {activeTab === "riwayat" && <Riwayat />}
      </div>
    </div>
  );
}

export default Pembayaran;
