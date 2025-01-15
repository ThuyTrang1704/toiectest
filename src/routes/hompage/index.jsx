import React, { useEffect, useState } from "react";
import { navBar } from "../../lib/utils";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import toeicImage from "../../assets/logo.png";

const Homepage = () => {
  const [state, setState] = useState("1");
  const [showSidebar, setShowSidebar] = useState(false); // Quản lý việc hiển thị sidebar
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage?.getItem("token")) {
      const decodedToken = jwtDecode(localStorage.getItem("token"));
      const userRole = decodedToken.roles[0].authority;
      setState(""); // Setting state when the user role is identified
    }
  }, [state]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar); // Toggle sidebar khi nhấn nút đăng nhập
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-600 via-blue-400 to-blue-400">
      {/* Header Section */}
      <div className="text-center mt-8 mb-12 px-4 py-8">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-4">
          CHÀO MỪNG ĐẾN VỚI NỀN TẢNG LUYỆN THI TOEIC
        </h1>
        <p className="text-lg sm:text-xl text-white mb-6">
          CHUẨN BỊ CHO KỲ THI TOEIC CỦA BẠN VỚI CÁC TÀI LIỆU TOÀN DIỆN, ĐỀ THI THỬ, VÀ CÔNG CỤ THEO DÕI TIẾN ĐỘ.
        </p>
      </div>

      {/* Nút Đăng Nhập góc trên bên phải */}
      <div className="absolute top-8 right-8 z-10">
        <button
          onClick={toggleSidebar} // Khi nhấn nút sẽ toggle sidebar
          className="py-3 px-6 bg-indigo-700 text-white rounded-full shadow-xl hover:bg-indigo-600 transition duration-300 transform hover:scale-105"
        >
          Đăng Nhập
        </button>
      </div>

      {/* Main Content: Left Sidebar + Right Content with Info Cards */}
      <div className="flex flex-col md:flex-row items-start justify-center gap-8 px-4 md:px-8 py-12 min-h-screen">
        {/* Left Sidebar with Navigation */}
        {showSidebar && ( // Hiển thị khi showSidebar là true
          <div className="w-full md:w-[30%] bg-white shadow-lg rounded-xl p-8 flex flex-col items-center space-y-4">
            <img
              src={toeicImage}
              alt="TOEIC"
              className="w-48 mb-6 rounded-full shadow-xl transform transition duration-300 hover:scale-105"
            />
            <h2 className="text-3xl font-semibold mb-6 text-center" style={{ fontFamily: "Times New Roman, serif" }}>
              XÂY DỰNG WEBSITE LUYỆN THI TOEIC
            </h2>
            <ul className="space-y-4 w-full">
              {navBar.map((item, index) => (
                <li key={index} className="w-full">
                  <Link
                    to={item.link ? item.link : ""}
                    className="block w-full py-3 text-center text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition duration-300 transform hover:scale-105"
                  >
                    {item.nameItem}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Right Side: Information Section */}
        <div className="w-full md:w-[65%] space-y-8">
          <div className="bg-white py-16 px-8 text-center shadow-lg rounded-xl mb-8 mx-auto max-w-7xl">
            <h3 className="text-3xl font-semibold mb-6">LUYỆN THI TOEIC DỄ DÀNG VỚI CHÚNG TÔI</h3>
            <p className="text-lg sm:text-xl text-gray-700 mb-6">
              Với nền tảng của chúng tôi, bạn sẽ có quyền truy cập vào tất cả các công cụ và tài liệu cần thiết để chuẩn bị hiệu quả cho kỳ thi TOEIC.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-indigo-100 p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold mb-4">Đề Thi Thử</h4>
                <p className="text-gray-700">
                  Mô phỏng trải nghiệm kỳ thi TOEIC với các đề thi thử có thời gian, giúp bạn làm quen với cấu trúc bài thi.
                </p>
              </div>
              <div className="bg-indigo-100 p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold mb-4">Hướng Dẫn Học Tập</h4>
                <p className="text-gray-700">
                  Các tài liệu học tập toàn diện và mẹo giúp bạn cải thiện điểm số ở cả phần nghe và đọc.
                </p>
              </div>
              <div className="bg-indigo-100 p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold mb-4">Theo Dõi Tiến Độ</h4>
                <p className="text-gray-700">
                  Theo dõi điểm số các bài thi thử và xem tiến độ học tập của bạn để cải thiện những phần yếu.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="bg-gradient-to-r from-indigo-500 via-indigo-400 to-indigo-300 text-white text-center py-12 px-8 rounded-xl shadow-xl">
            <h3 className="text-3xl font-semibold mb-4">SẴN SÀNG BẮT ĐẦU HÀNH TRÌNH TOEIC CỦA BẠN?</h3>
            <p className="text-lg sm:text-xl mb-6">
              Tham gia cùng hàng ngàn học viên đã chuẩn bị thành công cho kỳ thi TOEIC. Bắt đầu ngay hôm nay và theo dõi tiến độ của bạn!
            </p>
            
            {/* Thông tin về cấu trúc thi TOEIC */}
            <div className="space-y-6 mb-6 text-left max-w-4xl mx-auto">
              <h4 className="text-2xl font-semibold text-indigo-200">CẤU TRÚC KỲ THI TOEIC</h4>
              <p className="text-lg">
                Kỳ thi TOEIC bao gồm hai phần chính: Nghe và Đọc. Nó được thiết kế để đánh giá khả năng sử dụng tiếng Anh của bạn trong các tình huống công việc và đời sống hàng ngày.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-indigo-500 p-6 rounded-lg shadow-md">
                  <h5 className="text-xl font-semibold mb-2">Kỹ Năng Nghe Hiểu (Phần 1 - 4)</h5>
                  <ul className="list-disc pl-6">
                    <li><strong>Phần 1:</strong> Hình ảnh (10 câu hỏi)</li>
                    <li><strong>Phần 2:</strong> Câu hỏi - Trả lời (30 câu hỏi)</li>
                    <li><strong>Phần 3:</strong> Hội thoại (30 câu hỏi)</li>
                    <li><strong>Phần 4:</strong> Bài nói (30 câu hỏi)</li>
                  </ul>
                </div>
                <div className="bg-indigo-500 p-6 rounded-lg shadow-md">
                  <h5 className="text-xl font-semibold mb-2">Kỹ Năng Đọc Hiểu (Phần 5 - 7)</h5>
                  <ul className="list-disc pl-6">
                    <li><strong>Phần 5:</strong> Câu thiếu (30 câu hỏi)</li>
                    <li><strong>Phần 6:</strong> Hoàn thành đoạn văn (16 câu hỏi)</li>
                    <li><strong>Phần 7:</strong> Đọc hiểu (54 câu hỏi)</li>
                  </ul>
                </div>
              </div>
            </div>

            <Link
              to="/login"
              className="py-3 px-6 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-500 transition duration-300 transform hover:scale-105"
            >
              BẮT ĐẦU LUYỆN TẬP NGAY
            </Link>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default Homepage;
