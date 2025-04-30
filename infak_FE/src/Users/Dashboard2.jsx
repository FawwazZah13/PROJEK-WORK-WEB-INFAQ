// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import coin from "../assets/img/coin.jpg";
import bg from "../assets/img/bg.png";
import { TiCreditCard } from "react-icons/ti";

const Dashboard2 = () => {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(false);

  const handleCardClick = () => {
    navigate("/user/riwayat");
  };

  const handleImageClick = () => {
    navigate("/user/pembayaran"); // Navigates to the Tagihan component
  };

  useEffect(() => {
    const observerCard = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsCardVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );

    const observerImage = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsImageVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) observerCard.observe(cardRef.current);
    if (imageRef.current) observerImage.observe(imageRef.current);

    return () => {
      if (cardRef.current) observerCard.unobserve(cardRef.current);
      if (imageRef.current) observerImage.unobserve(imageRef.current);
    };
  }, []);

  return (
    <div
      className="min-h-screen bg-[#FFFDF1] flex flex-col items-center justify-center px-10"
      style={{ fontFamily: "'PT Serif', serif" }}
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center text-black">
        Zakat Infaq dan Shadaqoh
      </h1>
      <div className="flex justify-between md:flex-row items-center">
        {/* Card Section */}
        <div
          ref={cardRef}
          onClick={handleCardClick}
          className={`relative bg-[#A9B782] w-[473px] h-[281px] rounded-lg shadow-lg flex flex-col justify-center items-center p-4 my-2 transition-transform duration-[1000ms] ease-in-out transform ${
            isCardVisible ? "translate-x-0" : "-translate-x-20"
          } hover:scale-105`}
          style={{ borderRadius: "20px", margin: "60px", cursor: "pointer" }}
        >
          <div
            className="absolute bottom-0 left-0 w-full h-1/4"
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: "cover",
              borderRadius: "0 0 20px 20px",
            }}
          ></div>
          <div
            className="absolute top-0 left-0 w-full h-3/4 bg-[#A9B782] rounded-t-lg flex flex-col shadow-lg justify-center items-center"
            style={{ borderRadius: "20px 20px 0 0" }}
          >
            <div className="flex items-center gap-2 text-white pb-4">
              <div className="bg-white w-[46px] h-[46px] rounded-full flex justify-center items-center pb-[3px] pl-[2px]">
                <TiCreditCard className="text-black text-xl w-[30px] h-[30px]" />
              </div>
              <div className="w-[270px] mt-9">
                <p className="text-xl font-semibold mb-2">
                  Zakat Infaq & Shadaqoh
                </p>
                <p className="text-[15px] text-white">
                  Tagihan, Riwayat Pembayaran, dan Kartu Bayaran
                </p>
              </div>
            </div>
          </div>
          <p className="absolute bottom-2 right-2 text-right text-gray-600 text-sm">
            Riwayat tagihan? Klik di sini!
          </p>
        </div>

        {/* Image Section */}
        <div
          ref={imageRef}
          onClick={handleImageClick}
          className={`relative w-[473px] h-[281px] rounded-lg shadow-lg overflow-hidden my-2 transition-transform duration-[1000ms] ease-in-out transform ${
            isImageVisible ? "translate-x-0" : "translate-x-20"
          } hover:scale-105 cursor-pointer`}
          style={{ borderRadius: "20px", margin: "60px" }}
        >
          <div
            className="absolute bottom-0 left-0 w-full h-1/4"
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: "cover",
              borderRadius: "0 0 20px 20px",
            }}
          ></div>
          <img
            src={coin}
            alt="Zakat Image"
            className="w-full h-full object-cover"
            style={{ borderRadius: "20px" }}
          />
          <p className="absolute bottom-2 right-2 text-right text-gray-600 text-sm">
            Bayar tagihan? Klik di sini!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard2;
