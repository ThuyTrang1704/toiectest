import { Button } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();
  const [exame, setListExame] = useState(null);
  const getAllexam = async () => {
    await axios
      .get(`http://localhost:8085/api/student/result`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setListExame(res.data.contents);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  useEffect(() => {
    getAllexam();
  }, []);
  return (
    <div className="p-24">
      <div className="text-center w-screen">
        <Link className="font-bold text-[24px]" to={"/Role_Student_Class"}>
          Tìm phòng thi
        </Link>
      </div>
      <div className="flex space-x-5 font-bold">
        <h1 className="w-40">Chủ đề</h1>
        <h1 className="w-40">Lớp</h1>
        <h1 className="w-40">Giảng viên</h1>
        <h1 className="w-40">Số câu đúng</h1>
      </div>
      {exame?.map((item, index) => {
        return (
          <div
            onClick={() => {
              navigate("/Role_Student_QuestionDetailResult");
              localStorage.setItem("id", item.examResultId);
              
            }}
            className="flex space-x-5 w-[800px] border-b py-5 cursor-pointer hover:bg-slate-50"
            key={index}
          >
            <h1 className="w-40">{item.examName}</h1>
            <h1 className="w-40 border-r ">{item.className}</h1>
            <h1 className="w-40 border-r ">{item.lecturerName}</h1>
            <h1 className="w-40 border-r ">{item.point}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default User;
