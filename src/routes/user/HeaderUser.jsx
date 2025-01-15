import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useStateContext } from "../../lib/context/StateContextProvider";

const HeaderUser = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { token, setToken } = useStateContext();
    const { onOpen1 } = useStateContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const getLinkClass = (path) => {
        return location.pathname === path 
            ? 'text-black bg-white border rounded p-2' 
            : 'hover:text-black hover:bg-gray-200 border rounded p-2';
    };

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            localStorage.removeItem("token");
            setToken(null); // Update context state if needed
            navigate('/'); // Redirect after logout
        }
    };

    return (
        <div className="w-full h-[100px] flex items-center justify-between bg-[#27A4F2] px-4">
            <div className="navbar-header">
                <h1 className="title-header text-[36px] font-bold text-white">
                    <Link to={"/helloword"}>
                        STUDY TOEIC
                    </Link>
                </h1>
            </div>
            <button
                className="text-white md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16m-7 6h7"
                    ></path>
                </svg>
            </button>
            {!isMenuOpen && (
                <nav className={`md:flex md:items-center md:justify-center ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
                    <ul className="flex flex-col md:flex-row text-white font-medium space-y-4 md:space-y-0 md:space-x-10 cursor-pointer">
                        <li className={getLinkClass("/mainStart")}>
                            <Link to={"/mainStart"} className="p-2">
                                Exam Test
                            </Link>
                        </li>
                        <li className={getLinkClass("/ExamPage")}>
                            <Link to={"/ExamPage"} className="p-2">
                                Excercise
                            </Link>
                        </li>
                        <li className={getLinkClass("/profile")}>
                            <Link to={"/profile"} className="p-2">
                                Profile
                            </Link>
                        </li>
                        <li className={getLinkClass("/Calculate")}>
                            <Link to={"/Calculate"}>
                                Calculate Toeic score
                            </Link>
                        </li>
                        <li className={getLinkClass("/")}>
                            {token !== null ? (
                                <Link
                                    className="p-2"
                                    to={"/"}
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Link>
                            ) : (
                                ""
                            )}
                        </li>
                    </ul>
                </nav>
            )}
            {isMenuOpen && (
                <div className="absolute top-[100px] left-0 w-full bg-[#252b2d] md:hidden">
                    <ul className="flex flex-col text-white font-medium space-y-4 p-4">
                        <li className={getLinkClass("/ExamPage")}>
                            <Link to={"/ExamPage"}>
                                Excercise
                            </Link>
                        </li>
                        <li className={getLinkClass("/helloword")}>
                            <Link to={"/helloword"}>
                                Exam Test
                            </Link>
                        </li>
                        <li className={getLinkClass("/profile")}>
                            <Link to={"/profile"}>
                                Profile
                            </Link>
                        </li>
                        <li className={getLinkClass("/Calculate")}>
                            <Link to={"/Calculate"}>
                                Calculate Toeic score
                            </Link>
                        </li>
                        <li className={getLinkClass("/")}>
                            {token !== null ? (
                                <Link
                                    to={"/"}
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Link>
                            ) : (
                                ""
                            )}
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default HeaderUser;