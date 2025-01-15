import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderUser from "../HeaderUser";
import FooterUser from "../FooterUser";

// Component Card
const ExerciseCard = ({ title, content, time, questions, sections, views, path, buttonText, handleNavigate }) => (
  <div
    className="card w-full md:w-72 bg-gradient-to-b from-green-500 to-white shadow-lg rounded-xl p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    onClick={handleNavigate(path)}
  >
    <h3 className="text-xl font-bold text-blue-700 mb-2">{title}</h3>
    <p className="text-sm text-gray-600 mb-3">{content}</p>
    <ul className="text-gray-700 text-sm space-y-1">
      <li>
        ⏱ <strong>{time} phút</strong>
      </li>
      <li>
        📋 <strong>{questions} câu hỏi</strong>
      </li>
     
    </ul>
    <button className="mt-4 w-full h-10 rounded-md bg-blue-500 hover:bg-blue-700 active:bg-blue-800 text-white font-bold focus:ring-4 focus:ring-red-300 transition-all duration-200">
      {buttonText}
    </button>
  </div>
);


// Main Component
function getTest() {
  const navigate = useNavigate();

  const handleConfirmNavigation = (path) => () => {
    const isConfirmed = window.confirm("Do you want to take the test?");
    if (isConfirmed) {
      navigate(path);
    }
  };

  return (
    <div>
      <HeaderUser />
      <div className="min-h-[500px] flex items-center justify-center flex-col">
        <h1 className="text-5xl font-bold text-center mx-auto mb-10">EXERCISE TEST</h1>

        {/* Section Listening */}
        <div className="w-full px-4">
          <h2 className="text-3xl font-semibold text-center mb-6 text-blue-700">Listening (Nghe)</h2>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {/* Exercise 1 */}
            <ExerciseCard
              title="Part 1"
              content="Mô tả Tranh"
              time={5}
              questions={6}
              sections={7}
              views={1118724}
              path="/testExam/40"
              buttonText="Làm Bài"
              handleNavigate={handleConfirmNavigation}
            />
            {/* Exercise 2 */}
            <ExerciseCard
              title="Part 2"
              content="Hỏi - Đáp"
              time={10}
              questions={25}
              sections={7}
              views={1480}
              path="/testExam/41"
              buttonText="Làm Bài"
              handleNavigate={handleConfirmNavigation}
            />
            {/* Exercise 3 */}
            <ExerciseCard
              title="Part 3"
              content="Đoạn hội thoại"
              time={15}
              questions={39}
              sections={5}
              views={5000}
              path="/testExam/42"
              buttonText="Làm Bài"
              handleNavigate={handleConfirmNavigation}
            />
            {/* Exercise 4 */}
            <ExerciseCard
              title="Part 4"
              content="Bài nói ngắn"
              time={15}
              questions={30}
              sections={6}
              views={3000}
              path="/testExam/1"
              buttonText="Làm Bài"
              handleNavigate={handleConfirmNavigation}
            />
          </div>
        </div>

        {/* Section Reading */}
        <div className="w-full px-4 mt-12">
          <h2 className="text-3xl font-semibold text-center mb-6 text-blue-700">Reading (Đọc)</h2>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {/* Exercise 5 */}
            <ExerciseCard
              title="Part 5"
              content="Hoàn thành câu"
              time={20}
              questions={30}
              sections={7}
              views={12000}
              path="/testExam/36"
              buttonText="Làm Bài"
              handleNavigate={handleConfirmNavigation}
            />
            {/* Exercise 6 */}
            <ExerciseCard
              title="Part 6"
              content="Hoàn thành đoạn văn"
              time={20}
              questions={16}
              sections={5}
              views={8000}
              path="/testExam/3"
              buttonText="Làm Bài"
              handleNavigate={handleConfirmNavigation}
            />
            {/* Exercise 7 */}
            <ExerciseCard
              title="Part 7"
              content="Đọc hiểu đoạn văn"
              time={35}
              questions={54}
              sections={6}
              views={6000}
              path="/testExam/4"
              buttonText="Làm Bài"
              handleNavigate={handleConfirmNavigation}
            />
          </div>
        </div>
      </div>
      <FooterUser />
    </div>
  );
}

export default getTest;
