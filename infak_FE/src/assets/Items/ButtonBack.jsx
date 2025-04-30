import React from 'react';
import { FiLogOut } from "react-icons/fi"; // Mengimpor icon logout

const Back = () => {
    <>
    <div className="flex items-center justify-between p-5 absolute">
          <button
            className="flex items-center bg-[#A9B782] text-white py-2 px-4 rounded-[4px] space-x-2"
            style={{
              background:
                "linear-gradient(to bottom, #456F47, #69895C, #A9B782)",
            }}
          >
            <FiLogOut className="text-white" /> 
            
            <span>Back</span>
          </button>
        </div>
        </>

};



export default Back;