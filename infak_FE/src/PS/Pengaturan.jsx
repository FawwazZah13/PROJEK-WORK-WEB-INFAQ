  import ProfilePic from '../assets/ProfilePic.png';
  // eslint-disable-next-line no-unused-vars
  import React from "react";
  import './index.css';

  const ProfilPengguna = () => {
    return (
      <div className="relative max-w-1xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <div className="flex items-start mb-6">
          <div className="w-32 h-32">
            <img
              src={ProfilePic}
              className="w-full h-full object-cover rounded-full"
              alt="Profile"
            />
          </div>
          <div className="ml-8">
            <h2 className="text-3xl font-bold mb-4">Kenzi Bandrek</h2>
            <div className="grid grid-cols-[auto,auto,1fr] gap-x-4 text-lg">
              <p className="font-medium text-gray-600">Username</p>
              <p className="font-medium text-gray-600">:</p>
              <p className="text-gray-600">nama_pengguna</p>

              <p className="font-medium text-gray-600">Email</p>
              <p className="font-medium text-gray-600">:</p>
              <p className="text-gray-600">nama@example.com</p>

              <p className="font-medium text-gray-600">Telepon</p>
              <p className="font-medium text-gray-600">:</p>
              <p className="text-gray-600">+62 123-4567-890</p>

              <p className="font-medium text-gray-600">Password</p>
              <p className="font-medium text-gray-600">:</p>
              <p className="text-gray-600">********</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 flex space-x-4">
          <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
            Ubah Profil
          </button>
          <button className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>
    );
  };

  export default ProfilPengguna;
