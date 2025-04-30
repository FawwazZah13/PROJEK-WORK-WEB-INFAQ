import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaChevronDown, FaUserCircle, FaKey, FaSignOutAlt } from "react-icons/fa";
import wk from "../img/wk.jpg";
import axios from "axios";
import { FiHome } from "react-icons/fi";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [userName, setUserName] = useState("");
    const dropdownRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserData = sessionStorage.getItem("userData");
        if (storedUserData) {
            const { name } = JSON.parse(storedUserData);
            setUserName(name);
        }
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

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

    const isDashboard = location.pathname === "/User/dashboard";
    const navbarClass = isDashboard
        ? "sticky top-0 "
        : "fixed top-0  w-full"


    return (
        // <header className="header flex justify-between items-center px-4 shadow-lg">
        <header className={`header flex justify-between items-center px-4 shadow-lg ${navbarClass}`} style={{ zIndex: 10 }}>
            <div className="flex items-center">
                {location.pathname === "/User/dashboard" ? (
                    <>
                        <img src={wk} alt="Logo" className="logo-image w-11 h-11" />
                        <h5 className="ml-3 font-semibold font-poppins">SMK WIKRAMA BOGOR</h5>
                    </>
                ) : (
                    <div className="flex items-center justify-center">
                        <button onClick={() => navigate("/User/dashboard")} className="text-white text-[15px]">
                            <FiHome className="text-[22px]" />
                        </button>
                        <div className="px-3">| </div>
                        <button onClick={() => navigate(-1)} className="text-white text-[16px] mt-1">
                            <span className="font-pt">{location.state?.from || "Halaman Sebelumnya"}</span>
                        </button>
                    </div>
                )}
            </div>
            <div className="relative flex items-center space-x-2" ref={dropdownRef}>
                <div className="icon-background">
                    <FaUser style={{ color: "#ADB8C2" }} />
                </div>
                <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={toggleDropdown}
                >
                    <div className="user-info text-black-800 font-pt">{userName}</div>
                    <FaChevronDown className="text-black-600" />
                </div>
                {isOpen && (
                    <div className="dropdown-menu absolute right-0 mt-2 bg-[#faf8ef] border border-gray-200 rounded-lg shadow-lg w-48">
                        <ul className="p-2">
                            {/* <li className="p-2 flex items-center hover:bg-gray-100 cursor-pointer">
                                <FaUserCircle className="mr-2" />
                                Ganti Foto Profil
                            </li>
                            <li className="p-2 flex items-center hover:bg-gray-100 cursor-pointer">
                                <FaKey className="mr-2" />
                                Ganti Password
                            </li> */}
                           <li className="p-2 flex items-center hover:bg-gray-100 cursor-pointer" onClick={() => navigate("/User/profile")}>
    <FaUserCircle className="mr-2" />
    Profile
</li>


                            <li
                                className="p-2 flex items-center hover:bg-gray-100 cursor-pointer"
                                onClick={handleLogout}
                            >
                                <FaSignOutAlt className="mr-2" />
                                Logout
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Navbar;
