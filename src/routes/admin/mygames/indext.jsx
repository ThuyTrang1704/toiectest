import React, { useEffect, useState } from "react";
import { useAPIConText } from "../../../lib/context/APIContextProvider";
import Exam from "./Exam";
//maphong
const Mygames = () => {
  const { getAllExameLecturer, exam, setListExam } = useAPIConText();
  useEffect(() => {
    getAllExameLecturer();
  }, []);
  return (
    <div className="p-24">
      <div className="flex flex-col items-center ">
        <div className="flex items-center border-b-[1px] border-b-black">
          <div className="w-[200px] p-4  ">Test</div>
          <div className="w-[200px] p-4  ">Expiry Date</div>
          <div className="w-[200px] p-4  ">Duration Minutes</div>
        </div>
        <div>
          {exam?.map((item, index) => {
            return <Exam key={index} item={item}></Exam>;
          })}
        </div>
      </div>
    </div>
  );
};
export default Mygames;
