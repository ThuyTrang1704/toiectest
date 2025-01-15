import React, { useState } from "react";
import HeaderUser from "../HeaderUser";
import FooterUser from "../FooterUser";

// Raw-to-scaled score mapping for Listening and Reading
const listeningScoreMap = {
  0: 0, 1: 15, 2: 20, 3: 25, 4: 30, 5: 35, 6: 40, 7: 45, 8: 50, 9: 55, 10: 60,
  11: 65, 12: 70, 13: 75, 14: 80, 15: 85, 16: 90, 17: 95, 18: 100, 19: 105, 20: 110,
  21: 115, 22: 120, 23: 125, 24: 130, 25: 135, 26: 140, 27: 145, 28: 150, 29: 155, 30: 160,
  31: 165, 32: 170, 33: 175, 34: 180, 35: 185, 36: 190, 37: 195, 38: 200, 39: 205, 40: 210,
  41: 215, 42: 220, 43: 225, 44: 230, 45: 235, 46: 240, 47: 245, 48: 250, 49: 255, 50: 260,
  51: 265, 52: 270, 53: 275, 54: 280, 55: 285, 56: 290, 57: 295, 58: 300, 59: 305, 60: 310,
  61: 315, 62: 320, 63: 325, 64: 330, 65: 335, 66: 340, 67: 345, 68: 350, 69: 355, 70: 360,
  71: 365, 72: 370, 73: 375, 74: 380, 75: 385, 76: 395, 77: 400, 78: 405, 79: 410, 80: 415,
  81: 420, 82: 425, 83: 430, 84: 435, 85: 440, 86: 445, 87: 450, 88: 455, 89: 460, 90: 465,
  91: 470, 92: 475, 93: 480, 94: 485, 95: 490, 96: 495, 97: 495, 98: 495, 99: 495, 100: 495
};

const readingScoreMap = {
  0: 0, 1: 15, 2: 20, 3: 25, 4: 30, 5: 35, 6: 40, 7: 45, 8: 50, 9: 55, 10: 60,
  11: 65, 12: 70, 13: 75, 14: 80, 15: 85, 16: 90, 17: 95, 18: 100, 19: 105, 20: 110,
  21: 115, 22: 120, 23: 125, 24: 130, 25: 135, 26: 140, 27: 145, 28: 150, 29: 155, 30: 160,
  31: 165, 32: 170, 33: 175, 34: 180, 35: 185, 36: 190, 37: 195, 38: 200, 39: 205, 40: 210,
  41: 215, 42: 220, 43: 225, 44: 230, 45: 235, 46: 240, 47: 245, 48: 250, 49: 255, 50: 260,
  51: 265, 52: 270, 53: 275, 54: 280, 55: 285, 56: 290, 57: 295, 58: 300, 59: 305, 60: 310,
  61: 315, 62: 320, 63: 325, 64: 330, 65: 335, 66: 340, 67: 345, 68: 350, 69: 355, 70: 360,
  71: 365, 72: 370, 73: 375, 74: 380, 75: 385, 76: 395, 77: 400, 78: 405, 79: 410, 80: 415,
  81: 420, 82: 425, 83: 430, 84: 435, 85: 440, 86: 445, 87: 450, 88: 455, 89: 460, 90: 465,
  91: 470, 92: 475, 93: 480, 94: 485, 95: 490, 96: 495, 97: 495, 98: 495, 99: 495, 100: 495
};

const Calculate = () => {
  const [correctListening, setCorrectListening] = useState("");
  const [correctReading, setCorrectReading] = useState("");
  const [totalScore, setTotalScore] = useState(null);
  const [view, setView] = useState("form");

  const calculateTotalScore = () => {
    const listening = parseInt(correctListening);
    const reading = parseInt(correctReading);

    if (!isNaN(listening) && !isNaN(reading)) {
      const listeningScore = listeningScoreMap[listening] || 0;
      const readingScore = readingScoreMap[reading] || 0;
      const total = listeningScore + readingScore;

      setTotalScore(Math.round(total)); // rounding to the nearest whole number
    } else {
      alert("Vui lòng nhập số câu đúng hợp lệ cho cả hai phần.");
    }
  };

  return (
    <div>
      <HeaderUser />
      <div className="max-w-7xl mx-auto mt-16 px-6 py-8 bg-white shadow-lg rounded-lg flex flex-wrap justify-between">
        {/* Button Controls */}
        <div className="w-full mb-6 text-center">
        <button
        onClick={() => setView("form")}
        className={`mx-2 py-3 text-lg font-semibold rounded-lg focus:outline-none ${
          view === "form" ? "underline text-blue-600" : "text-black"
        }`}
      >
        TÍNH ĐIỂM TOEIC
      </button>

      <button
        onClick={() => setView("reading")}
        className={`mx-2 py-3 text-lg font-semibold rounded-lg focus:outline-none ${
          view === "reading" ? "underline text-blue-600" : "text-black"
        }`}
      >
        CHI TIẾT ĐIỂM READING
      </button>

      <button
        onClick={() => setView("listening")}
        className={`mx-2 py-3 text-lg font-semibold rounded-lg focus:outline-none ${
          view === "listening" ? "underline text-blue-600" : "text-black"
        }`}
      >
        ĐIỂM LISTENING
      </button>



        </div>

        {/* Conditionally Render Content Based on Button Click */}
        {view === "form" && (
          <div className="w-full lg:w-1/2 xl:w-1/3 pr-8 mb-8 lg:mb-0 mx-auto">
            <h1 className="text-3xl font-semibold text-center mb-6">TÍNH ĐIỂM THI TOEIC</h1>
            <form onSubmit={(e) => e.preventDefault()}>
              {/* Listening Section */}
              <div className="mb-6">
                <label htmlFor="correctListening" className="block text-lg font-medium text-gray-700 mb-2">
                  Listening*(Số câu đúng / 100 câu)
                </label>
                <input
                  type="number"
                  id="correctListening"
                  value={correctListening}
                  onChange={(e) => setCorrectListening(e.target.value)}
                  min="0"
                  max="100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Reading Section */}
              <div className="mb-6">
                <label htmlFor="correctReading" className="block text-lg font-medium text-gray-700 mb-2">
                  Reading(Số câu đúng / 100 câu)
                </label>
                <input
                  type="number"
                  id="correctReading"
                  value={correctReading}
                  onChange={(e) => setCorrectReading(e.target.value)}
                  min="0"
                  max="100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Calculate Button */}
              <button
                type="button"
                onClick={calculateTotalScore}
                className="w-full py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Tính điểm
              </button>
            </form>

            {totalScore !== null && (
              <div className="mt-6 text-center">
                <h2 className="text-2xl font-semibold">Tổng điểm của bạn là : {totalScore}</h2>
              </div>
            )}
          </div>
        )}

        {/* Reading Detail Table */}
        {view === "reading" && (
          <div className="w-full lg:w-2/3 mt-8 lg:mt-0 mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-center">Bảng tính điểm TOEIC Reading</h3>
            <table className="min-w-full table-auto mx-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">Số câu đúng</th>
                  <th className="px-4 py-2 text-left">Điểm TOEIC</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(101)].map((_, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border">{index}</td>
                    <td className="px-4 py-2 border">{readingScoreMap[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Listening Detail Table */}
        {view === "listening" && (
          <div className="w-full lg:w-2/3 mt-8 lg:mt-0 mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-center">Bảng tính điểm TOEIC Listening</h3>
            <table className="min-w-full table-auto mx-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">Số câu đúng</th>
                  <th className="px-4 py-2 text-left">Điểm TOEIC</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(101)].map((_, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border">{index}</td>
                    <td className="px-4 py-2 border">{listeningScoreMap[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <FooterUser />
    </div>
  );
};

export default Calculate;
