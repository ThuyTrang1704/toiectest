import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Home Page</h1>
      <div style={{ marginTop: "20px" }}>
        <Link to="/login">
          <button style={buttonStyle}>Đăng nhập</button>
        </Link>
        <Link to="/signup" style={{ marginLeft: "10px" }}>
          <button style={buttonStyle}>Đăng ký</button>
        </Link>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  borderRadius: "5px",
  border: "1px solid #ddd",
  backgroundColor: "#007bff",
  color: "#fff",
};

export default HomePage;
