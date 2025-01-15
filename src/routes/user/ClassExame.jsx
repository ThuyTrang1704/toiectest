import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const ClassExame = () => {
  const navigate = useNavigate();
  const [classExam, setClassExam] = useState(null);
  console.log(classExam);
  const getAllClassExam = async () => {
    const url = "http://localhost:8085/api/student/allowed";
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setClassExam(res.data);
      })
      .catch(() => {
        alert("Lỗi");
      });
  };
  useEffect(() => {
    getAllClassExam();
  }, []);
  return (
    <div className="p-24">
      <div>
        <div className="text-center font-bold text-[24px]">
          Bài thi được phép thi
        </div>
        <div className="flex space-x-5 font-bold">
          <h1 className="w-40">Chủ đề</h1>
          <h1 className="w-40">Lớp</h1>
          <h1 className="w-40">Giảng viên</h1>
          <h1 className="w-40">Trạng thái</h1>
        </div>
        {classExam?.map((item, index) => {
          return (
            <div
              onClick={() => {
                localStorage.setItem("code", item.examCode);
                navigate("/Role_Student_Quiz");
              }}
              className="flex space-x-5 w-[800px] border-b py-5 cursor-pointer hover:bg-slate-200 "
              key={index}
            >
              <h1 className="w-40 border-r">{item.examName}</h1>
              <h1 className="w-40 border-r">{item.className}</h1>
              <h1 className="w-40 border-r">{item.lecturerName}</h1>
              <h1 className="w-40 border-r">{item.take ? "Completed" : "Uncomplete"}</h1>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClassExame;
