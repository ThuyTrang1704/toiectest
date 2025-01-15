import React from 'react';  // Thêm dòng này vào
import { Navigate } from 'react-router-dom';
import { getAccessRole } from "../../lib/utils/helper";

const PrivateRoute = ({ allowedRoles, children }) => {
  const role = getAccessRole(); // Lấy role từ localStorage hoặc sessionStorage
  
  // Kiểm tra nếu không có role
  if (!role) {
    return <Navigate to="/login" />;
  }
  
  // Kiểm tra nếu role không thuộc danh sách allowedRoles
  if (!allowedRoles.some(r => role === r)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;
