import React, { createContext, useContext, useReducer, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

// Khởi tạo trạng thái ban đầu
const initialAPI = {
  isAuthenticated: false,
  userRole: null,
  error: null,
};

// Hàm reducer
const reducerAPI = (state, action) => {
  switch (action.type) {
    case "authenticateUserSuccess":
      return {
        ...state,
        isAuthenticated: true,
        userRole: action.payload.role,
        error: null,
      };
    case "authenticateUserFailure":
      return {
        ...state,
        isAuthenticated: false,
        userRole: null,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

// Context API
const APIContext = createContext();

// Provider
const APIContextProvider = ({ children }) => {
  const [state, dispatchAPI] = useReducer(reducerAPI, initialAPI);
  const [exam, setListExam] = useState(null); // state của mygame dùng để đổ ra danh sách các lớp học
  const [questionByID, setQuestionByID] = useState(null); // state question ứng với một class
  const [flagUpdate, setFlagUpdate] = useState(false);
  const navigate = useNavigate();

  // Đăng nhập người dùng
  const authenticateUser = async ({ email, password }) => {
    console.log("Email: ", email, "Password: ", password);
    try {
      // Gửi yêu cầu đăng nhập
      const response = await fetch("http://localhost:8085/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error("Login failed");
      }
  
      const data = await response.json();
      console.log("Authenticate Response Data:", data); // Kiểm tra dữ liệu trả về từ API
  
      // Giải mã token và lưu vào localStorage
      const decodedData = jwtDecode(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", decodedData.roles[0].authority);
  
      // Cập nhật trạng thái người dùng trong context
      dispatchAPI({
        type: "authenticateUserSuccess",
        payload: { role: decodedData.roles[0].authority },
      });
  
      // Thêm thông báo đăng nhập thành công
      alert("Đăng nhập thành công!");
  
      // Điều hướng đến trang khác tùy theo vai trò người dùng
      if (decodedData.roles[0].authority === "Role_Admin") {
        navigate("/user");
      } else if (decodedData.roles[0].authority === "Role_Student") {
        navigate("/helloword");
      } else {
        navigate("/helloword");
      }
    } catch (err) {
      console.error("Error during authentication: ", err);
      dispatchAPI({
        type: "authenticateUserFailure",
        payload: { error: err.message },
      });
      alert("Đăng nhập thất bại: " + err.message);
    }
  };
  

  // Hàm lấy danh sách đề thi của giảng viên
  const getAllExameLecturer = async () => {
    try {
      const response = await axios.get("http://localhost:8085/api/exam/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setListExam(response.data.contents);
    } catch (err) {
      console.log(err.response);
    }
  };

  // Hàm lấy câu hỏi theo ID
  const getQuestionByID = async () => {
    const classInfo = JSON.parse(localStorage.getItem("class"));
    try {
      const response = await axios.get(`http://localhost:8085/api/exam/exam_id=${classInfo.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setQuestionByID(response.data.questionDTOS);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  // Cập nhật câu hỏi
  const upDateQuestionByID = async (data) => {
    try {
      const response = await axios.put(`http://localhost:8085/api/question/${data.id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert(response.data.message);
    } catch (err) {
      console.log(data.id);
      alert(err.response.data.errors.message);
    }
  };

  // Xóa câu hỏi
  const deleteQuestionByID = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8085/api/question/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      setFlagUpdate((flag) => !flag);
      alert("Thành công");
    } catch (err) {
      alert("Không thể xóa");
    }
  };

  // Tạo câu hỏi
  const createQuestionByID = async (data) => {
    const classInfor = localStorage.getItem("class");
    const objectClass = JSON.parse(classInfor);
    console.log(objectClass.id);
    try {
      const response = await axios.post(
        `http://localhost:8085/api/question/examId=${objectClass.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Thành công");
      setFlagUpdate((flag) => !flag);
    } catch (err) {
      alert(err.response.data.errors.message);
    }
  };

  // Đăng ký người dùng mới
  const registerAPI = async (user) => {
    try {
      const response = await axios.post("http://localhost:8085/api/register", user);
      alert("Thành công");
    } catch (err) {
      console.log(err);
      alert("Thất bại");
    }
  };

  // Lấy đề thi theo ID loại cấu trúc
  const getTestByKindStructureId = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8085/api/ExamTest/${id}`);
      alert("Thành công");
    } catch (err) {
      console.log(err);
      alert("Thất bại");
    }
  };

  return (
    <APIContext.Provider
      value={{
        registerAPI,
        flagUpdate,
        setFlagUpdate,
        createQuestionByID,
        deleteQuestionByID,
        upDateQuestionByID,
        getQuestionByID,
        questionByID,
        setQuestionByID,
        state,
        authenticateUser,
        getAllExameLecturer,
        exam,
        setListExam,
        getTestByKindStructureId,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

// Hook để sử dụng Context
export const useAPIConText = () => useContext(APIContext);

export default APIContextProvider;
