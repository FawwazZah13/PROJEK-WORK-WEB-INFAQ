import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/icons/Logo.png";
import PP from "../../assets/icons/PP.png";
import { BiHomeAlt, BiListUl, BiChevronDown, BiChevronUp } from "react-icons/bi";
import { PiWallet } from "react-icons/pi";
import Dashboard from "../Home";
import Pembayaran from "../Pembayaran";
import DataPembayaran from "../DataPembayaran";
import Keuangan from "../Keuangan";
import axios from "axios";

export default function SidebarAdmin() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const menu = [
    { name: "Dashboard", icon: <BiHomeAlt /> },
    { name: "Pembayaran", icon: <BiListUl /> },
    { name: "Data Siswa", icon: <BiListUl /> },
    { name: "Keuangan", icon: <PiWallet /> },
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case "Dashboard":
        return <Dashboard />;
      case "Pembayaran":
        return <Pembayaran />;
      case "Data Siswa":
        return <DataPembayaran />;
      case "Keuangan":
        return <Keuangan />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getFormattedDate = () => {
    const today = new Date();
    const options = { day: "numeric", month: "long", year: "numeric" };
    return today.toLocaleDateString("id-ID", options);
  };

  const handleLogout = async () => {
    const token = sessionStorage.getItem("token");

    try {
      await axios.post("http://127.0.0.1:8000/api/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userData");
      window.location.href = "/";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-slate-50 p-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="w-10 h-10 mr-2" />
          <span className="text-lg font-semibold">Infaq Shodaqoh</span>
        </div>
        <div className="flex items-center">
          <div className="mr-8 text-gray-600 font-semibold">{getFormattedDate()}</div>
          <div className="flex items-center mr-2 cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            {isDropdownOpen ? <BiChevronUp className="text-gray-600 w-5 h-5" /> : <BiChevronDown className="text-gray-600 w-5 h-5" />}
          </div>
          <div className="relative" ref={dropdownRef}>
            <img src={PP} alt="Profile" className="w-10 h-10 rounded-full cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)} />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden z-50">
                <div className="flex items-center p-4">
                  <img src={PP} alt="Profile" className="w-12 h-12 rounded-full mr-3" />
                  <div>
                    <div className="font-semibold text-gray-800">John Doe</div>
                    <div className="text-gray-600">admin@example.com</div>
                  </div>
                </div>
                <div className="border-t border-gray-200"></div>
                <div className="flex flex-col p-4">
                  <button className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-slate-100 flex flex-1">
        <div className="h-full border-r border-gray-200 px-9 py-8 space-y-4">
          <div className="mb-8 text-blue-600 font-semibold text-lg">Menu</div>
          <ul className="space-y-4">
            {menu.map((val, index) => (
              <li
                key={index}
                onClick={() => setActiveMenu(val.name)}
                className={`flex items-center cursor-pointer px-4 py-2 rounded-lg transition-colors duration-200 ${
                  activeMenu === val.name ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <div className="mr-3">{val.icon}</div>
                <div>{val.name}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 p-8 bg-white">{renderContent()}</div>
      </div>
    </div>
  );
}
