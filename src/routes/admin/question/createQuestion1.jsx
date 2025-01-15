import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import debounce from "lodash.debounce";
import "../question/question.css";

const CreateTopic = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [topicList, setTopicList] = useState([]);
  const [questionData, setQuestionData] = useState({});
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileName, setExcelFileName] = useState("");
  const token = localStorage.getItem("token");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const updateKeyword = debounce((value) => {
    setDebouncedKeyword(value);
  }, 2000);

  useEffect(() => {
    return () => {
      updateKeyword.cancel(); // Cancel debounce on component unmount
    };
  }, []);

  const handleSearch = (e) => {
    const { value } = e.target;
    setKeyword(value);
    updateKeyword(value);
  };

  const handleDeleteQuestion = async (id) => {
    try {
      const isConfirmed = window.confirm("Bạn có chắc muốn xóa câu hỏi này không?");
      if (!isConfirmed) return;

      const response = await axios.delete(`http://localhost:8085/api/questions/deleteQuestion`, {
        params: { questionId: id },
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Question deleted successfully:", response.data);
      fetchData(); // Refresh topic list after deletion
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Error deleting question";
      alert(errorMsg);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8085/api/questions/filterQuestion`,
        {
          params: { pageNumber, pageSize, keyword: debouncedKeyword },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response.data;
      setTopicList(data.contents);
      setTotalPages(data.totalPages); // Update total pages
    } catch (error) {
      console.error("Error fetching data:", error);
      setTopicList([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, pageNumber, pageSize, debouncedKeyword]);

  const handleExcelUpload = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      setExcelFile(file);
      setExcelFileName(file.name);
    } else {
      alert("Please upload a valid Excel file.");
    }
  };

  const uploadExcelFile = async () => {
    if (!excelFile) {
      alert("Please select an Excel file to upload.");
      return;
    }
  
    // Check the file type (Excel files should have the .xlsx extension)
    const allowedFileTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel .xlsx MIME type
    ];
  
    if (!allowedFileTypes.includes(excelFile.type)) {
      alert("Invalid file type. Please upload an Excel (.xlsx) file.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", excelFile);
  
    try {
      const response = await axios.post("http://localhost:8085/api/questions/uploadQuestions", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      alert("Excel file uploaded successfully!");
      fetchData(); // Refresh topic list after upload
  
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Error uploading Excel file";
      alert(errorMsg);
    }
  };
  

  const handleAddQuestion = async () => {
    try {
      const response = await axios.post("http://localhost:8085/api/questions/addQuestion", questionData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Question added successfully:", response.data);
      fetchData(); // Refresh topic list after adding
    } catch (error) {
      console.error("Error posting question:", error);
    }
  };

  const fetchQuestionById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8085/api/questions/oneQuestion/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Cập nhật dữ liệu câu hỏi và các đáp án
      setQuestionData(response.data); // Lưu câu hỏi và các đáp án vào state
      setShowPopup(true); // Hiển thị popup
    } catch (error) {
      console.error("Error fetching question data:", error);
      alert("Error fetching question details");
    }
  };

  return (
    <div className="w-full h-full p-12">
      <h1 className="font-semibold my-12 text-center text-3xl">Question Manage</h1>

      <button
        onClick={() => navigate("/question/addQuestion")}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 flex items-center float-left"
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        Add
      </button>

      <button
        onClick={() => document.getElementById("excelFileInput").click()}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 flex items-center float-left"
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        Select Excel File
      </button>

      <input
        id="excelFileInput"
        type="file"
        accept=".xlsx"
        onChange={handleExcelUpload}
        style={{ display: "none" }}
      />

      <button
        onClick={uploadExcelFile}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 ml-2"
      >
        Upload Excel
      </button>

      {excelFileName && (
        <div className="mt-2 text-lg text-gray-700">
          <strong>Uploaded File: </strong>{excelFileName}
        </div>
      )}

      <div className="mt-4 mb-2">
        <input
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          type="search"
          placeholder="Search..."
          value={keyword}
          onChange={handleSearch}
        />
      </div>

      <table className="table-auto w-full min-h-[300px]">
        <thead>
          <tr>
            <th className="border px-4 py-2">STT</th>
            <th className="border px-4 py-2">Content</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {topicList.map((topic, index) => (
            <tr key={topic.id}>
              <td className="border px-4 py-2">{index + 1 + pageNumber * pageSize}</td>
              <td className="border px-4 py-2">{topic.name}</td>
              <td className="border px-4 py-2 flex justify-center">
                <button
                  onClick={() => fetchQuestionById(topic.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Details
                </button>
                <button
                  onClick={() => handleDeleteQuestion(topic.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 0))}
          disabled={pageNumber === 0}
          className={`px-4 py-2 border ${pageNumber === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
        >
          Previous
        </button>
        <span className="px-4 py-2">{`Page ${pageNumber + 1} of ${totalPages}`}</span>
        <button
          onClick={() => setPageNumber((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={pageNumber >= totalPages - 1}
          className={`px-4 py-2 border ${pageNumber >= totalPages - 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
        >
          Next
        </button>
      </div>

      {showPopup && questionData && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="fadein-animation bg-white shadow-md rounded p-6 relative w-3/4 max-w-2xl">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 focus:outline-none text-2xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Question Detail</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="question">
                  Content
                </label>
                <input
                  id="question"
                  type="text"
                  value={questionData.name}
                  readOnly
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Options</label>
                <ul className="space-y-2">
                  {questionData.answers?.map((answer, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className={`mr-2 font-semibold ${answer.correctAnswer ? "text-green-500" : "text-gray-700"}`}>
                        {["A", "B", "C", "D"][index]}:
                      </span>
                      <span className={answer.correctAnswer ? "text-green-500" : ""}>{answer.content}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTopic;
