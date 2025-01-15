import axios from "axios";
import React, { useEffect, useState } from "react";

const QuestionResult = () => {
  const [listQuestion, setListQuestion] = useState(null);
  console.log(listQuestion);
  const getListQuestion = async () => {
    await axios
      .get(
        `http://localhost:8085/api/student/result/${localStorage.getItem(
          "id"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setListQuestion(res.data.resultDetailsDTOList);
      })
      .catch((err) => {
        alert("Eror");
      });
  };
  useEffect(() => {
    getListQuestion();
  }, []);
  return (
    <div className="p-24">
      <h1 className="font-semibold text-[48px] text-center">
        Chi tiết câu trả lời
      </h1>
      {listQuestion?.map((item, index) => {
        return (
          <div className="border-t-[1px] border-t-black" key={index}>
            <h1 className=" text-center font-bold">
              {item.questionDTO.content}
            </h1>
            <div className="text-center grid grid-cols-2 grid-rows-2 space-y-5">
              <h1>a : {item.questionDTO.firstAnswer}</h1>
              <h1>b : {item.questionDTO.secondAnswer}</h1>
              <h1>c : {item.questionDTO.thirdAnswer}</h1>
              <h1>d : {item.questionDTO.fourthAnswer}</h1>
            </div>
            <div className="flex justify-around">
              <h1 className="font-bold">
                Câu trả lời của bạn : {item.selectedAnswer}
              </h1>
              <h1 className="font-bold">
                Câu trả lời đúng : {item.questionDTO.correctAnswer}
              </h1>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionResult;
