import React, { useState, useEffect } from 'react';
import avatar1 from '../Images/avatar1.png';
import { Link, useNavigate } from 'react-router-dom';
import  useAuth  from "../../hooks/useAuth";

const DropdownButton = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  if(!user)
  {
    return(
      <>
      <Link
        className='py-2.5 px-5 me-2 mb-2 font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200'
        to="/auth"
      >
        Login
      </Link>
    </>
    
    )
  }

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout=()=>{
    localStorage.removeItem("accessToken")
    navigate("/auth");
  }

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
          <span className="font-medium">{user.username}</span>
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
              <button onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-100 w-full text-start">
                Log Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
