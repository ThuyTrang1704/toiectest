
import React, { useState } from "react";
import { RadioGroup, Radio, Stack } from "@chakra-ui/react";

const Test = () => {
  const question = {
    expiryDate: "2024-03-31",
    durationMinutes: 120,
    questionDTOS: [
      {
        content: "What is the capital of France?",
        firstAnswer: "Paris",
        secondAnswer: "London",
        thirdAnswer: "Berlin",
        fourthAnswer: "Rome",
        correctAnswer: null,
      },
      {
        content: "What is the largest planet in our solar system?",
        firstAnswer: "Jupiter",
        secondAnswer: "Mars",
        thirdAnswer: "Earth",
        fourthAnswer: "Venus",
        correctAnswer: null,
      },
    ],
  };

  const [answers, setAnswers] = useState(question.questionDTOS.map(() => null));
  const [indexQuestion, setIndexQuestion] = useState(0);

  const handleAnswerChange = (value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[indexQuestion] = parseInt(value);
    setAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (indexQuestion < question.questionDTOS.length - 1) {
      setIndexQuestion((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (indexQuestion > 0) {
      setIndexQuestion((prevIndex) => prevIndex - 1);
    }
  };
  console.log(question.questionDTOS[indexQuestion]);
  return (
    <div className="wrapper">
      <div className="container-AQ">
        <div className="layout">
          <div className="content">
            <div className="content-item1">
              <div className="question">
                <RadioGroup
                  onChange={(value) => handleAnswerChange(value)}
                  value={answers[indexQuestion]}
                >
                  <div className="grid grid-cols-2 grid-rows-2 gap-4">
                    {Array(4)
                      .fill()
                      .map((_, index) => (
                        <Radio key={index} value={index}>
                          {index === 0
                            ? question.questionDTOS[indexQuestion].firstAnswer
                            : index === 1
                            ? question.questionDTOS[indexQuestion].secondAnswer
                            : index === 2
                            ? question.questionDTOS[indexQuestion].thirdAnswer
                            : question.questionDTOS[indexQuestion].fourthAnswer}
                        </Radio>
                      ))}
                  </div>
                </RadioGroup>
              </div>
              <div className="pre-next flex justify-around w-full">
                <button onClick={handlePrevQuestion}>Previous</button>
                <button onClick={handleNextQuestion}>Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};
export default Test;
