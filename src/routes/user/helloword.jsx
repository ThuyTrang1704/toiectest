import React from "react";
import HeaderUser from "./HeaderUser";
import FooterUser from "./FooterUser";
import { Link, useNavigate } from "react-router-dom";

const Helloword = () => {
    const navigate = useNavigate();

    return (
        <div>
            <HeaderUser />
            <div className="h-full">
                <section style={{ backgroundColor: "#0000ff" }}className=" relative">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56 relative z-10">
                        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                            CÙNG LÀM BÀI TEST TOEIC THÔI NÀO
                        </h1>
                        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                            Chào mừng bạn đến với website của chúng tôi. Chúng tôi sẽ giúp bạn làm các bài test hiệu quả
                        </p>
                        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                            <a  
                                onClick={() => navigate("/contact")}
                                className="cursor-pointer inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                            >
                                Contact with us
                                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                            <a href="#" className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
                                Read more
                            </a>
                        </div>
                    </div>
                </section>
            </div>
            <FooterUser />
        </div>
    );
};

export default Helloword;
