// eslint-disable-next-line no-unused-vars
import React from "react";
// import wk3 from "../assets/img/wk3.jpg";
import duha1 from "../assets/img/duha1.jpg";
import bg3 from "../assets/img/bg3.jpg";
import wk from "../assets/img/wk.jpg"; // Import gambar wk.jpg
import fbIcon from "../assets/icons/facebook.png"; // Import ikon facebook
import igIcon from "../assets/icons/instagram.png"; // Import ikon instagram

function Dashboard3() {
  return (
    <div className="min-h-screen bg-[#FFFDF1]">
      {/* Header Section */}
      <div className="flex mb-24 pt-12 justify-center items-center">
        <h1 className="text-4xl font-bold text-left  decoration-2 font-serif">
          Tentang
        </h1>
        <hr className="border-t-2 border-black  ml-7 mt-2 w-[1153px]" />
      </div>

      {/* Main Content */}
      <main className="flex items-center mb-28 justify-evenly">
        {/* Left Image Section */}
        <div className="w-[580px] h-[491px] relative">
          <img
            src={duha1}
            alt="SMK Wikrama Bogor"
            className="rounded-[10px] shadow-2xl w-full h-full object-cover "
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-[#E9F3DC] to-transparent opacity-65"></div>
        </div>

        {/* Right Text Section */}
        <div>
          <div
            className="flex justify-center items-center relative w-[500px] h-auto ml-8 p-6 rounded-[25px] shadow-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${bg3})` }}
          >
            <div className="absolute top-[-45px] left-[222px] w-[71px] h-[71px] bg-[#A9B782] rounded-full"></div>
            <div className="absolute top-[-54px] left-[257px] w-[43px] h-[43px] bg-[#467049] rounded-full"></div>

            <p className="text-justify font-serif p-3">
            Berinfaq dan bershodaqoh adalah wujud nyata dari rasa syukur atas nikmat yang Allah berikan kepada kita. Ketika kita memberikan sebagian harta melalui infaq dan shodaqoh, sejatinya harta tersebut tidak berkurang, melainkan disimpan sebagai pahala yang abadi di sisi Allah. Melalui perbuatan ini, kita tidak hanya membantu sesama, tetapi juga membersihkan diri dari sifat kikir dan mendekatkan diri kepada-Nya. Infaq membuka jalan keberkahan harta, sementara shodaqoh menjadi sumber keberkahan hidup. Bukan soal seberapa besar yang kita berikan, namun ketulusan hati dalam memberi yang menjadi inti dari kebaikan ini.

            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#A9B782] text-white h-[261px]">
        <div className=" pt-8 pl-48 pb-6 ml-20">
          <div className="flex items-center pb-3">
            <img src={wk} alt="Logo Wikrama" className="mr-4 w-[50px] " />
            <h4 className="font-bold">SMK Wikrama Bogor</h4>
          </div>
          <hr className="border-t-1 border-white mt-2 w-[250px] " />
        </div>

        <div className="container mx-auto flex justify-evenly items-start font-serif">
          {/* Left Section - Logo and Address */}
          <div className="text-left items-start w-[300px]">
            <h4 className="font-bold">Alamat</h4>
            <p>Jl. Raya Wangun Kelurahan Sindangsari Bogor Timur 16720</p>
          </div>

          {/* Center Section - Telephone */}
          <div className="text-left w-[250px]">
            <p className="font-bold">Telepon</p>
            <p>0251-8242411 / 082221718035 (Whatsapp)</p>
          </div>

          {/* Right Section - Social Media */}
          <div className="text-left w-[250px] ">
            <p className="font-bold mb-2 ">Sosial Media</p>
            <div className=" space-x-6 justify-start">
              <a href="#" className="flex pb-2">
                <img src={fbIcon} alt="Facebook" className="h-[22px] mr-2 " />
                <span>SMK Wikrama Bogor</span>
              </a>
            </div>
            <a href="#" className="flex ">
              <img src={igIcon} alt="Instagram" className="h-[24px] mr-2  " />
              <span>@smkwikrama</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard3;
