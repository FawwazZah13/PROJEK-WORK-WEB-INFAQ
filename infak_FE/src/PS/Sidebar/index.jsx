// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo from "../../assets/icons/Logo.png";
import { BiHomeAlt, BiGridAlt, BiLogOut, BiMenu, BiX } from "react-icons/bi";
import "../index.css";
import axios from "axios";

export default function Sidebar() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State untuk sidebar
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", path: "/PS", icon: <BiHomeAlt /> },
    { name: "Pembayaran", path: "/PS/pembayaran", icon: <BiGridAlt /> },
  ];

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
    <div className="flex bg-white h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-white border-r border-gray-200 transition-all duration-300 ease-in-out h-full flex flex-col`}
      >
        {/* Logo and Menu Button */}
        <div className="flex items-center justify-between px-4 py-6">
          <div className="flex items-center space-x-3">
            <img
              src={Logo}
              alt="Logo"
              className={`w-10 h-10 transition-all ${
                isSidebarOpen ? "block" : "hidden"
              }`}
            />
            {isSidebarOpen && <span className="text-gray-700">Infaq Shodaqoh</span>}
          </div>
          <button
            className="text-gray-600 text-xl focus:outline-none"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <BiMenu /> : <BiMenu />}
          </button>
        </div>

        {/* Menu Items */}
        <ul className="space-y-4 px-4">
          {menu.map((val, index) => (
            <Link to={val.path} key={index}>
              <li
                onClick={() => setActiveMenu(val.name)}
                className={`flex items-center text-gray-600 cursor-pointer pl-4 py-2 rounded-lg transition-colors ${
                  activeMenu === val.name
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-100"
                }`}
              >
                <div className="text-lg">{val.icon}</div>
                {isSidebarOpen && <span className="ml-3">{val.name}</span>}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 bg-white">
        {/* Navbar */}
        <div className="flex justify-end items-center pb-4 border-b border-gray-200">
          <button
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors duration-200"
            onClick={handleLogout}
          >
            <BiLogOut className="mr-2 text-lg" />
            Logout
          </button>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
