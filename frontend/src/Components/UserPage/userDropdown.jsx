import React, { useState } from 'react';
import avatar1 from '../Images/avatar1.png';
import avatar3 from '../Images/avatar3.png';
import { Link } from 'react-router-dom';


const DropdownButton = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative inline-block">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className={`font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center`}
        type="button"
        onClick={toggleDropdown}
      >
       <div className="flex items-center space-x-4">
        <img className="w-7 h-7 rounded-full" src={avatar1} alt="Author Avatar" />
        <span className="font-medium">Lokesh Naga Sai</span>
      </div>
      </button>

      {isDropdownOpen && (
        <div
          id="dropdown"
          className="absolute z-10 top-full right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
        >
          <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
            <li>
            <Link to="/userprofile" className="block px-4 py-2 hover:bg-gray-100">
              Profile
            </Link>
            </li>
            <li>
              <Link to="/auth" className="block px-4 py-2 hover:bg-gray-100">
                Log Out
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
