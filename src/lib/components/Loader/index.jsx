import React from 'react'
import { Spin } from "antd";

const Loader = () => {
  return (
    <Spin tip="Loading" size="small">
      <div style={{
        padding: "50px",
        background: "rgba(0, 0, 0, 0.05)",
        borderRadius: "4px"
      }} className="content" />
    </Spin>
  );
};

export default Loader;