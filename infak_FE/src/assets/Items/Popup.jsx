import React from "react";
import { FiCheckCircle } from "react-icons/fi"; // Mengimpor icon ceklis

function Popup({ closePopup }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 font-pt">
      <div className="bg-[#FFFDF1] w-[600px] h-auto rounded-xl p-6 relative">
        <button
          className="absolute top-5 right-7 text-[#ADB8C2] hover:text-gray-800  text-4xl"
          onClick={closePopup} // Memanggil fungsi closePopup ketika diklik
        >
          ×
        </button>

        {/* Konten Popup */}
        <div className="flex items-center justify-center mt-12">
          {" "}
          {/* Posisikan di bawah X */}
          <div>
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center bg-[#E8F4E9] rounded-[4.63mm] w-[38.11mm] h-[9.71mm]">
                <FiCheckCircle
                  className="text-[#5DCD86]"
                  style={{ width: "4.58mm", height: "4.58mm" }}
                />
                <span className="text-[#5DCD86] text-[3.77mm] ml-2">
                  Sudah Dibayar
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center mt-4">
              <h1 className=" font-bold text-[8.66mm]">Rp50.000</h1>
            </div>
            <div className=" flex items-center justify-center">
              <p className="my-1 opacity-50">
                Zakat Infaq dan Shadaqoh Bulan Juli 2024
              </p>
            </div>

            <div className=" pb-1">
              <div className="border h-auto border-black w-[535px] rounded-3xl ">
                <h1 className="font-bold text-[4.86mm] pt-6 pb-3 px-7">
                  Pembayaran
                </h1>
                <div className="flex justify-between">
                  <div className=" space-y-1 pl-12 opacity-60">
                    <p>11 September 2024</p>
                    <p>BNI VA 123456789</p>
                    <p>Berita Acara :</p>
                  </div>
                  <div className="flex items-center justify-center pr-12">
                    <h1 className="font-bold text-[4.86mm]">Rp50.000</h1>
                  </div>
                </div>
                <div className="flex items-center justify-center pb-4 pt-8">
                  <hr className=" border-black  w-[447px]" />
                </div>
                <div className="flex pl-12">
                <p>Diterima oleh Wikrama</p>
                </div>
                <div className="flex pl-12 opacity-50 pb-4">
                <p>Catatan: </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
