import React from "react";
import Header from "../../../routes/admin/Header";
import Sidebar from "../../../routes/admin/Sidebar";

const MainLayoutAdmin = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full">
        <Header />
      </header>
      <main className="flex-grow w-full flex">
        <Sidebar />
        <section className="w-full min-h-[500px] p-4">{children}</section>
      </main>

      {/* Footer */}
      <footer className="bg-[#27A4F2] text-white py-6 px-4 mt-8">
        <div className="flex items-center justify-center flex-col md:flex-row px-6">
          <div className="mb-4 md:mb-0 md:mr-6">
            <img
              src="../src/assets/logo.png"
              className="w-[200px] h-auto rounded-lg shadow-md"
              alt="Logo"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold mb-4">
              LUẬN VĂN TỐT NGHIỆP XÂY DỰNG WEBSITE LUYỆN THI TOEIC
            </h1>
            <p className="mb-2">SINH VIÊN THỰC HIỆN : PHẠM THỊ THÙY TRANG</p>
            <p className="mb-2">MSSV : DH52003933</p>
            <p className="mb-2">LỚP : D20_TH05</p>
            <p className="mb-2">EMAIL : trangthuy1061@gmail.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayoutAdmin;
