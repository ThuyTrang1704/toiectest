import React, { useEffect } from "react";
import { Input, Radio, RadioGroup } from "@chakra-ui/react";
import { useStateContext } from "../../../../lib/context/StateContextProvider";
const QuestionDialog = ({ request }) => {
  const { question, dispatchQuestion } = useStateContext();
  useEffect(() => {
    if (request.isUpdate) {
      dispatchQuestion({ type: "setAll", payload: request.item });
      console.log(question);
    } else {
      dispatchQuestion({ type: "refeshQuestion", payload: null });
    }
  }, []);
  return (
    <div className="p-24 flex flex-col">
      <Input
        onChange={(e) => {
          dispatchQuestion({ type: "setContent", payload: e.target.value });
          console.log(question.content);
        }}
        placeholder="Enter your question"
        className="my-3"
        borderBottom="2px solid black"
        borderLeft="none"
        borderRight="none"
        borderTop="none"
        value={question.content}
      ></Input>
      <h3 className="self-end text-green-600 font-semibold">Correct</h3>
      <div>
        <RadioGroup
          onChange={(value) => {
            dispatchQuestion({ type: "setCorrect", payload: value });
            console.log(question.correctAnswer);
          }}
          value={question.correctAnswer}
        >
          {Array(4)
            .fill(null)
            .map((item, index) => {
              const answer =
                index === 0
                  ? question.firstAnswer
                  : index === 1
                  ? question.secondAnswer
                  : index === 2
                  ? question.thirdAnswer
                  : question.fourthAnswer;
              return (
                <div key={index} className="flex justify-around">
                  <Input
                    onChange={(e) => {
                      if (index === 0) {
                        dispatchQuestion({
                          type: "setFirst",
                          payload: e.target.value,
                        });
                        console.log(question.firstAnswer);
                      } else if (index === 1) {
                        console.log(question.secondAnswer);
                        dispatchQuestion({
                          type: "setSecond",
                          payload: e.target.value,
                        });
                      } else if (index === 2) {
                        console.log(question.thirdAnswer);
                        dispatchQuestion({
                          type: "setThird",
                          payload: e.target.value,
                        });
                      } else {
                        console.log(question.fourthAnswer);
                        dispatchQuestion({
                          type: "setFourth",
                          payload: e.target.value,
                        });
                      }
                    }}
                    placeholder="Enter your answer"
                    className="my-3"
                    borderBottom="2px solid black"
                    borderLeft="none"
                    borderRight="none"
                    borderTop="none"
                    value={
                      index == 0
                        ? question.firstAnswer
                        : index == 1
                        ? question.secondAnswer
                        : index == 2
                        ? question.thirdAnswer
                        : question.fourthAnswer
                    }
                  ></Input>
                  <Radio
                    value={
                      index === 0
                        ? question.firstAnswer
                        : index === 1
                        ? question.secondAnswer
                        : index === 2
                        ? question.thirdAnswer
                        : question.fourthAnswer
                    }
                  >
                    {index == 0
                      ? "a"
                      : index == 1
                      ? "b"
                      : index == 2
                      ? "c"
                      : "d"}
                  </Radio>
                </div>
              );
            })}
        </RadioGroup>
      </div>
    </div>
  );
};

export default QuestionDialog;
