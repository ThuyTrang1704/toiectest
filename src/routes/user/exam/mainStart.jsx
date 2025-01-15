import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate từ react-router-dom
import HeaderUser from "../HeaderUser";
import FooterUser from "../FooterUser";

const MainStart = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate(); // Khởi tạo navigate từ useNavigate

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = () => {
    navigate('/mainTest/37');
  };

  // Hàm để điều hướng đến trang tạo cấu trúc mới
  const handleCreateStructure = () => {
    navigate('/ExamPage/createStructure'); // Điều hướng tới đường dẫn "/ExamPage/createStructure"
  };

  return (
    <div>
      <HeaderUser />
      <div className="min-h-[350px] flex items-center justify-center flex-col">
        <h1 className="text-5xl font-bold text-center mx-auto mb-10">TAKE THE TEST</h1>
        <div className="flex flex-wrap space-x-4">
          <button
            className="w-full md:w-48 h-12 rounded-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
            onClick={openModal}
          >
            <h1 className="text-2xl">Random Test</h1>
          </button>
          <button
            className="w-full md:w-auto h-12 px-6 rounded-md bg-blue-500 hover:bg-blue-700 text-white font-bold text-lg"
            onClick={handleCreateStructure} // Khi click sẽ điều hướng đến "/ExamPage/createStructure"
          >
            <h1 className="text-2xl">Create New Structures</h1>
          </button>

          {/* Modal */}
          {modalIsOpen && (
            <div className="fadein-animation fixed inset-0 flex items-center justify-center bg-opacity-50">
              <div className="bg-white rounded-lg p-6 mx-4 md:mx-0 shadow-2xl">
                <h1 className="text-center text-2xl font-bold mb-4">Thông tin bài thi</h1>
                <div>
                  <p className="mb-2"><strong>Part 1: </strong>Nghe mô tả một bức ảnh và chọn đáp án đúng nhất trong 4 đáp án.</p>
                </div>
                <div>
                  <p className="mb-2"><strong>Part 2: </strong>Nghe một câu hỏi hoặc phát biểu, sau đó chọn câu trả lời thích hợp nhất.</p>
                </div>
                <div>
                  <p className="mb-2"><strong>Part 3: </strong>Nghe các đoạn hội thoại ngắn giữa hai hoặc ba người, sau đó trả lời các câu hỏi liên quan.</p>
                </div>
                <div>
                  <p className="mb-2"><strong>Part 4: </strong>Nghe các bài nói ngắn, sau đó trả lời các câu hỏi liên quan.</p>
                </div>
                <div>
                  <p className="mb-2"><strong>Part 5: </strong>Chọn từ hoặc cụm từ thích hợp để hoàn thành câu</p>
                </div>
                <div>
                  <p className="mb-2"><strong>Part 6: </strong>Điền từ hoặc câu còn thiếu vào các đoạn văn.</p>
                </div>
                <div>
                  <p className="mb-2"><strong>Part 7: </strong>Đọc các đoạn văn hoặc nhiều đoạn văn liên quan và trả lời các câu hỏi.</p>
                </div>
                <nav className="flex justify-center mx-auto space-x-4">
                  <button
                    className="w-full md:w-48 h-12 rounded-md bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4"
                    onClick={handleSubmit}
                  >
                    BẮT ĐẦU
                  </button>
                  <button
                    className="w-full md:w-48 h-12 rounded-md bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4"
                    onClick={closeModal}
                  >
                    ĐÓNG
                  </button>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
      <FooterUser />
    </div>
  );
};

export default MainStart;
