// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

const ApprovalTable = () => {
  const [approvals, setApprovals] = useState([
    {
      id: 1,
      nis: "12208904", nama: "Anton Witjaksono",
      approved: false,
      details: "Pembayaran SPP bulan September",
    },
    {
      id: 2,
      nis: "12208898", nama: "Bahtiar Abdul Aziz",
      approved: false,
      details: "Pembayaran SPP bulan Oktober",
    },
    {
      id: 3,
      nis: "12208121", nama: "Kenzi Badrika",
      approved: false,
      details: "Pembayaran SPP bulan November",
    },    
  ]);

  const [selectedApproval, setSelectedApproval] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleApprovalChange = (id) => {
    setApprovals((prevApprovals) =>
      prevApprovals.map((approval) =>
        approval.id === id
          ? { ...approval, approved: !approval.approved }
          : approval
      )
    );
  };

  const openModal = (approval) => {
    setSelectedApproval(approval);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedApproval(null);
    setShowModal(false);
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Data Pembayaran</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left font-medium text-gray-600 border-b">
              No
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-600 border-b">
              Nama
            </th>
            <th className="px-6 py-3 text-left font-medium text-gray-600 border-b">
              NIS
            </th>
            <th className="px-6 py-3 text-center font-medium text-gray-600 border-b">
              Approval Status
            </th>
            <th className="px-6 py-3 text-center font-medium text-gray-600 border-b">
              Detail
            </th>
          </tr>
        </thead>
        <tbody>
          {approvals.map((approval, index) => (
            <tr key={approval.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 border-b">{index + 1}</td>
              <td className="px-6 py-4 border-b">{approval.nama}</td>
              <td className="px-6 py-4 border-b">{approval.nis}</td>
              <td className="px-6 py-4 border-b text-center">
                <button
                  onClick={() => handleApprovalChange(approval.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold focus:outline-none transition-all duration-300 ${
                    approval.approved
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                >
                  {approval.approved ? "Approved ✔️" : "Pending ❌"}
                </button>
              </td>
              <td className="px-6 py-4 border-b text-center">
                <button
                  onClick={() => openModal(approval)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all"
                >
                  View Detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
            <h3 className="text-2xl font-bold mb-4">Detail Pembayaran</h3>
            <p className="mb-4">{selectedApproval.details}</p>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovalTable;
