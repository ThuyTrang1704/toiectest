import React from "react";
import { useNavigate } from "react-router-dom";

const Exam = ({ item }) => {
  const navigae = useNavigate();
  return (
    <div
      onClick={() => {
        const classInfo = JSON.stringify(item);
        localStorage.removeItem("class");
        localStorage.setItem("class", classInfo);
        navigae("/Role_Lecturer_MyGame_Changes");
      }}
      className="flex items-center mb-2 border-b-black border-b-[1px] cursor-pointer hover:bg-slate-300"
    >
      <div className="w-[200px] p-2 border-r-[1px] border-r-black ">
        {item.name}
      </div>
      <div className="w-[200px] p-2 border-r-[1px] border-r-black ">
        {item.expiryDate}
      </div>
      <div className="w-[200px] p-2  ">{item.durationMinutes}</div>
    </div>
  );
};
export default Exam;
