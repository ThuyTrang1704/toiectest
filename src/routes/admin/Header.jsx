import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../../lib/context/StateContextProvider";

const Header = () => {
  const navigate = useNavigate();
  const { token, setToken } = useStateContext();
  const { onOpen1 } = useStateContext();
  
  // State to control the visibility of the dropdown menu
  const [dropdownVisible, setDropdownVisible] = useState(false);
  
  // Function to toggle the dropdown menu visibility
  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  return (
    <div className="w-full h-[100px] flex items-center justify-between bg-[#27A4F2] px-6">
      <div className="navbar-header">
        <h1 className="title-header text-[36px] font-bold text-white">
          WEBSITE ADMINISTRATOR
        </h1>
      </div>
      <nav className="relative">
        <ul className="flex flex-col md:flex-row text-white font-medium space-y-4 md:space-y-0 md:space-x-10 cursor-pointer">
          {/* Avatar and dropdown menu */}
          {token !== null && (
            <li className="relative">
             <div
            onClick={toggleDropdown}
            className="cursor-pointer rounded-full w-[60px] h-[60px] bg-gray-300 flex items-center justify-center ml-4" // Adjust the margin-left as needed
          >
            <img
              src="src/assets/hinh.jpg" // Replace with actual user avatar image URL
              alt="User Avatar"
              className="rounded-full w-full h-full object-cover"
            />
          </div>

              
              {dropdownVisible && (
                <div className="absolute right-0 top-full mt-2 w-[180px] bg-white border rounded-md shadow-lg z-10">
                  <ul className="text-gray-800">
                    <li>
                      <Link
                        to="#" // Replace with actual link to profile edit page
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Chỉnh sửa thông tin cá nhân
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/login" // Redirect to login page after logout
                        onClick={() => {
                          localStorage.removeItem("token");
                          navigate("/login");
                        }}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
