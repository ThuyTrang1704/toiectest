import { Navigate } from "react-router-dom";

import { getAccessRole, getAccessUser } from "../../lib/utils/helper";


const PublicRoute = ({ children }) => {
  const user = getAccessUser(); // Lấy thông tin người dùng từ localStorage
  
  if (!user) {
    // Nếu không có thông tin người dùng (chưa đăng nhập)
    return children;
  }

  const role = getAccessRole(); // Lấy role từ thông tin người dùng

  // Điều hướng dựa trên role
  if (role === "Role_Student") {
    return <Navigate to="/student" />;
  }

  if (role === "Role_Admin") {
    return <Navigate to="/dashboard" />;
  }

  // Mặc định hoặc nếu role không hợp lệ
  return <Navigate to="/unauthorized" />;
};

export default PublicRoute;
