// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

const Table = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState({});
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [selectedDate, setSelectedDate] = useState(""); // State for selected date

  const data = [
    { nis: "12208904", nama: "Anton Witjaksono", rayon: "Rayon Cisarua 6", rombel: "PPLG XII-1", tanggal: "2024-09-10" },
    { nis: "12208898", nama: "Bahtiar Abdul Aziz", rayon: "Rayon Cicurug 4", rombel: "PPLG XII-1", tanggal: "2024-09-11" },
    { nis: "12208121", nama: "Kenzi Badrika", rayon: "Rayon Cibedug 3", rombel: "PPLG XII-1", tanggal: "2024-09-9" },
    // Tambahkan lebih banyak data di sini
  ];

  const months = [
    "Juli", "Januari", "Agustus", "Februari", "September", "Maret", 
    "Oktober", "April", "November", "Mei", "Desember", "Juni"
  ];

  const handleDetailClick = (item) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedItem(null);
  };

  const handleCheckboxChange = (month) => {
    setSelectedMonths((prev) => ({
      ...prev,
      [month]: !prev[month],
    }));
  };

  // Filter the data based on search term and selected date
  const filteredData = data.filter((item) => {
    const matchesSearchTerm =
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nis.includes(searchTerm);
    const matchesDate = selectedDate ? item.tanggal === selectedDate : true;
    return matchesSearchTerm && matchesDate;
  });

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Data Siswa</h1>

      {/* Search and Date Filters */}
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          className="border px-4 py-2 rounded-lg w-1/2"
          placeholder="Cari Nama atau NIS"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="date"
          className="border px-4 py-2 rounded-lg"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left font-medium text-gray-600 border-b">Nama</th>
            <th className="px-6 py-3 text-left font-medium text-gray-600 border-b">NIS</th>
            <th className="px-6 py-3 text-left font-medium text-gray-600 border-b">Rayon</th>
            <th className="px-6 py-3 text-left font-medium text-gray-600 border-b">Rombel</th>
            <th className="px-6 py-3 text-left font-medium text-gray-600 border-b">Tanggal</th>
            <th className="px-6 py-3 text-left font-medium text-gray-600 border-b">Detail</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 border-b">{item.nama}</td>
              <td className="px-6 py-4 border-b">{item.nis}</td>
              <td className="px-6 py-4 border-b">{item.rayon}</td>
              <td className="px-6 py-4 border-b">{item.rombel}</td>
              <td className="px-6 py-4 border-b">{item.tanggal}</td>
              <td className="px-6 py-4 border-b">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => handleDetailClick(item)}
                >
                  Detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-[600px]">
            <h2 className="text-lg font-bold mb-4">Detail Siswa</h2>
            {selectedItem && (
              <div className="grid grid-cols-2 gap-x-12 mb-4">
                {/* Left Column: Nama and NIS */}
                <div>
                  <div className="flex">
                    <p className="w-20"><strong>Nama</strong></p>
                    <p>:</p>
                    <p className="ml-1">{selectedItem.nama}</p>
                  </div>
                  <div className="flex mt-2">
                    <p className="w-20"><strong>NIS</strong></p>
                    <p>:</p>
                    <p className="ml-1">{selectedItem.nis}</p>
                  </div>
                </div>

                {/* Right Column: Rayon and Rombel */}
                <div>
                  <div className="flex">
                    <p className="w-20"><strong>Rayon</strong></p>
                    <p>:</p>
                    <p className="ml-1">{selectedItem.rayon}</p>
                  </div>
                  <div className="flex mt-2">
                    <p className="w-20"><strong>Rombel</strong></p>
                    <p>:</p>
                    <p className="ml-1">{selectedItem.rombel}</p>
                  </div>
                </div>
              </div>
            )}

            <h3 className="mt-4 font-bold">Pilih Bulan:</h3>
            <table className="min-w-full bg-gray-100 border border-gray-300 rounded-lg mt-2">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="py-2 px-4 border-b text-center">Semester 1</th>
                  <th className="py-2 px-4 border-b text-center">Pilih</th>
                  <th className="py-2 px-4 border-b text-center">Semester 2</th>
                  <th className="py-2 px-4 border-b text-center">Pilih</th>
                </tr>
              </thead>
              <tbody>
                {months.map((month, index) => {
                  if (index % 2 === 0) {
                    return (
                      <tr key={month}>
                        <td className="py-2 px-4 border-b text-center">{month}</td>
                        <td className="py-2 px-4 border-b text-center">
                          <input
                            type="checkbox"
                            checked={!!selectedMonths[month]}
                            onChange={() => handleCheckboxChange(month)}
                          />
                        </td>
                        {months[index + 1] && (
                          <>
                            <td className="py-2 px-4 border-b text-center">
                              {months[index + 1]}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                              <input
                                type="checkbox"
                                checked={!!selectedMonths[months[index + 1]]}
                                onChange={() => handleCheckboxChange(months[index + 1])}
                              />
                            </td>
                          </>
                        )}
                      </tr>
                    );
                  }
                  return null; // Skip odd indices
                })}
              </tbody>
            </table>
            <div className="flex justify-between mt-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={closeModal}
              >
                Tutup
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded"
                onClick={() => {
                  // Add your apply logic here
                  console.log("Apply clicked");
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
