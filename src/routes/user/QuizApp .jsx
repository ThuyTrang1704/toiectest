import React, { useEffect, useState } from "react";
import { Typography, Button, Radio } from "antd";

import axios from "axios";
const { Title } = Typography;

const questions = [
  "What is your favorite color?",
  "What is the capital of France?",
  "What is 2 + 2?",
  "Who is the current president of the United States?",
];
const QuizApp = () => {
  const [listQuestion, setListQuestion] = useState([]);
  const [examBasicInformationDTO, setExamBasicInformationDTO] = useState({});
  const [positionQuestions, setPositionQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const result = listQuestion.map((item, index) => {
    return { quest: item, answers: answers[index] };
  });
  console.log(result);
  const getQuestTionExem = async () => {
    await axios
      .get(`http://localhost:8085/api/exam/${localStorage.getItem("code")}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setListQuestion(res.data.examDTO.questionDTOS);
        setExamBasicInformationDTO(res.data.examDTO.examBasicInformationDTO);
        setPositionQuestions(res.data.positionQuestions);
      })
      .catch((err) => {
        alert("Thất bại");
      });
  };
  const handleNextQuestion = () => {
    if (currentQuestion < listQuestion.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleAnswerChange = (e) => {
    console.log(answers);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = e.target.value;
    setAnswers(newAnswers);
  };
  const sendExamAnswer = async () => {
    listQuestion.map((item, index) => {
      if (answers[index] == null) {
        answers[index] = "";
      }
    });
    const examStudent = {
      positionQuestions: positionQuestions,
      selectedAnswer: answers,
      examId: examBasicInformationDTO.id,
    };
    console.log(examStudent);
    await axios
      .post("http://localhost:8085/api/exam-result", examStudent, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        alert("Thành công");
      })
      .catch((err) => {
        alert(err.response.data.errors.message);
      });
  };

  useEffect(() => {
    getQuestTionExem();
  }, []);
  return (
    <div className="flex justify-around">
      <div className="container bg-slate-200 shadow-xl rounded-2xl p-5 mt-8 w-[800px] h-[600px]  ">
        <div className="w-[100%] h-[200px] overflow-auto ml-6 mt-4">
          <span className="text-[25px] font-bold ">
            {listQuestion[currentQuestion]?.content}
          </span>
        </div>
        <div>
          <Radio.Group
            className="grid grid-cols-2 grid-rows-2  "
            onChange={handleAnswerChange}
            value={answers[currentQuestion]}
          >
            <span className="m-3 bg-white rounded-xl border font-bold active:bg-slate-50 shadow-xl">
              <Radio
                style={{ display: "block", marginBottom: "10px" }}
                value={listQuestion[currentQuestion]?.firstAnswer}
                className="h-[100px] pl-4   text-[16px]  "
              >
                {listQuestion[currentQuestion]?.firstAnswer}
              </Radio>
            </span>
            <span className="m-3 bg-white rounded-xl border font-bold active:bg-slate-50 shadow-xl">
              <Radio
                style={{ display: "block", marginBottom: "10px" }}
                value={listQuestion[currentQuestion]?.secondAnswer}
                className="h-[100px] pl-4   text-[16px]  "
              >
                {listQuestion[currentQuestion]?.secondAnswer}
              </Radio>
            </span>
            <span className="m-3 bg-white rounded-xl border font-bold active:bg-slate-50 shadow-xl">
              <Radio
                style={{ display: "block", marginBottom: "10px" }}
                value={listQuestion[currentQuestion]?.thirdAnswer}
                className="h-[100px] pl-4    text-[16px]  "
              >
                {listQuestion[currentQuestion]?.thirdAnswer}
              </Radio>
            </span>
            <span className="m-3 bg-white rounded-xl border font-bold active:bg-slate-50 shadow-xl">
              <Radio
                style={{ display: "block" }}
                value={listQuestion[currentQuestion]?.fourthAnswer}
                className="h-[100px] pl-4   text-[16px]  "
              >
                {listQuestion[currentQuestion]?.fourthAnswer}
              </Radio>
            </span>
          </Radio.Group>
          <div className="w-full flex justify-center items-center mt-5">
            <Button
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
              style={{ marginRight: "10px" }}
              className="bg-white mt-5"
            >
              Previous
            </Button>
            <Button
              onClick={handleNextQuestion}
              disabled={currentQuestion === listQuestion.length - 1}
              className="bg-white mt-5"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-6 border-2 mt-10 ml-5">
          {result.map((item, index) => {
            return (
              <div
                key={index}
                className={`w-5 h-5 m-3 p-3 text-center text-white font-bold box-content rounded-lg ${
                  item.answers ? "bg-green-400" : " bg-red-400"
                } w h-5`}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
        <Button
          className="m-5 flex justify-center items-center w-full h-[50px] bg-blue-400 text-white text-[20px] font-bold"
          onClick={sendExamAnswer}
        >
          Nộp bài
        </Button>
      </div>
    </div>
  );
};

export default QuizApp;
