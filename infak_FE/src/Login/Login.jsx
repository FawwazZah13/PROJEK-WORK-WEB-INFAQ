import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import masjid from "../assets/img/masjid.jpg";
import logoWikrama from "../assets/img/logoWikrama.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPassword = localStorage.getItem("rememberedPassword");

    if (rememberedEmail && rememberedPassword) {
      setEmail(rememberedEmail);
      setPassword(rememberedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });
  
      console.log(response.data); // Debugging
  
      if (response.data.token) {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("role", response.data.data.role);
  
        // Ambil siswa_id setelah login
        if (response.data.data.role === "Siswa") {
          try {
            const siswaResponse = await axios.get(
              "http://127.0.0.1:8000/api/siswa",
              {
                headers: { Authorization: `Bearer ${response.data.token}` },
              }
            );
  
            console.log(siswaResponse.data); // Debugging
  
            if (siswaResponse.data.success) {
              sessionStorage.setItem("siswa_id", siswaResponse.data.data.id);
            }
          } catch (siswaError) {
            console.error("Gagal mengambil data siswa:", siswaError);
          }
        }
  
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
          localStorage.setItem("rememberedPassword", password);
        } else {
          localStorage.removeItem("rememberedEmail");
          localStorage.removeItem("rememberedPassword");
        }
  
        const userRole = response.data.data.role;
        if (userRole === "Admin") {
          navigate("/Admin/");
        } else if (userRole === "Siswa") {
          navigate("/User/dashboard");
        } else if (userRole === "PS") {
          navigate("/PS/");
        } else {
          setError("Role tidak dikenali.");
        }
      } else {
        setError("Login gagal: token tidak diterima.");
      }
    } catch (err) {
      console.error(err);
      setError("Email atau password salah.");
    }
  };
  

  return (
    <div className="min-h-screen overflow-hidden flex items-center justify-center bg-[#FFFDF1] lg:bg-none" style={{ fontFamily: "PT Serif", fontWeight: "400", fontStyle: "normal" }}>
      <div className="flex flex-col lg:flex-row w-full h-full relative">
        {/* Struktur HTML yang sama seperti sebelumnya */}
        <div className="hidden lg:block lg:w-[475px] h-full relative">
          <img
            src={masjid}
            alt="Gambar Samping"
            className="w-full h-[100vh] object-cover object-[29%] rounded-none lg:rounded-tl-none lg:rounded-tr-[45px] lg:rounded-br-[45px] lg:rounded-bl-none"
          />
          <div
            className="absolute top-0 right-0 bottom-0 lg:w-[200px] rounded-none lg:rounded-tl-none lg:rounded-tr-[45px] lg:rounded-br-[45px] lg:rounded-bl-none"
            style={{
              background: "linear-gradient(to right, rgba(0, 0, 0, 0), #AFAFAF)",
            }}
          ></div>
        </div>

        <div
          className="lg:hidden absolute inset-0 bg-cover bg-center h-screen"
          style={{ backgroundImage: `url(${masjid})` }}
        ></div>
        <div className="relative flex flex-col justify-center items-center lg:items-start w-full lg:max-w-7xl p-6 lg:p-16 h-screen">
        <div className="absolute top-6 right-6 flex items-center">
            <img
              src={logoWikrama}
              alt="Logo Wikrama"
              className="h-[40px] w-[40px] mr-2 hidden lg:block"
            />
            <span
              className="text-[8.3px] font-semibold lg:text-[14px] text-white lg:text-black lg:pr-11 pr-0"
              style={{ fontFamily: "Poppins" }}
            >
              SMK WIKRAMA BOGOR
            </span>
            <img
              src={logoWikrama}
              alt="Logo Wikrama"
              className="h-[24px] w-[24px] ml-2 block lg:hidden lg:pr-0 mr-2"
            />
          </div>

          <div className="lg:w-full flex flex-col lg:flex-row items-start justify-between">
            <div className="hidden lg:block mr-16">
              <p className="mb-4" style={{ fontSize: "20px" }}>
                Selamat Datang
              </p>
              <h1 className="font-bold mb-10" style={{ fontSize: "49px" }}>
                Website Bukti Pembayaran Zakat Infaq & Shadaqoh
              </h1>
            </div>

            <div
              className="p-8 lg:p-0 lg:bg-transparent backdrop-blur-sm rounded-[20px] max-w-xl"
              style={{ backgroundColor: "rgba(255, 253, 241, 0.8)" }}
            >
          <div className="w-full">
            <form onSubmit={handleSubmit} className="lg:space-y-6 space-y-5">
              {/* Input email */}
              <div>
                <label htmlFor="email" className="block lg:text-base text-[12.06px] font-medium text-black mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none w-[261.68px] h-[35.57px] lg:w-[434px] lg:h-[59px] px-4 py-2 border border-gray-300 lg:rounded-[20px] rounded-[12.06px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 bg-[#A9B782]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Input password */}
              <div className="relative">
                <label htmlFor="password" className="block lg:text-base text-[12.06px] font-medium text-black mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="appearance-none w-[261.68px] h-[35.57px] lg:w-[434px] lg:h-[59px] px-4 py-2 border border-gray-300 lg:rounded-[20px] rounded-[12.06px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 bg-[#A9B782]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-700 pt-[22px] pr-[2px] lg:pt-7"
                >
                  {showPassword ? <FaEye className="lg:w-[30px]" /> : <FaEyeSlash className="lg:w-[32px]" />}
                </button>
              </div>

              {/* Error Message */}
              {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

              {/* Ingat Saya Checkbox */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-[14.47px] w-[14.47px] lg:w-5 lg:h-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember_me" className="ml-2 block text-[9.65px] lg:text-base text-gray-900">
                    Ingat saya
                  </label>
                </div>
                <div className="text-[9.65px] lg:text-base">
                  <a href="#" className="font-medium text-[#46704A] hover:text-green-600 pr-4">
                    Lupa Password?
                  </a>
                </div>
              </div>

              {/* Button Login */}
              <div>
                <button type="submit" className="lg:text-base text-[12.06px] w-[261.68px] h-[35.57px] lg:w-[434px] lg:h-[59px] flex items-center justify-center border border-transparent lg:rounded-[20px] rounded-[12.06px] shadow-sm text-sm font-medium text-white bg-gradient-to-b from-[#467048] to-[#AAB883] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-bold">
                  Login
                </button>
              </div>
            </form>
          </div></div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
