import { useDisclosure } from "@chakra-ui/react";
import React, { createContext, useContext, useReducer, useState } from "react";
const initialValue = {
  namegame: "",
  desc: "",
  date: "",
  time: "",
};

const initialQuestion = {
  content: "",
  firstAnswer: "",
  secondAnswer: "",
  thirdAnswer: "",
  fourthAnswer: "",
  correctAnswer: "",
};
const StateContext = createContext(initialValue);
const reducer = (state, action) => {
  switch (action.type) {
    case "setNameGame":
      return { ...state, namegame: action.payload };
    case "setDesc":
      return { ...state, desc: action.payload };
    case "setDate":
      return { ...state, date: action.payload };
    case "setTime":
      return { ...state, time: action.payload };
    default:
      return state;
  }
};
const reducerQuestion = (state, action) => {
  switch (action.type) {
    case "setContent":
      return { ...state, content: action.payload };
    case "setFirst":
      return {
        ...state,
        firstAnswer: action.payload,
      };
    case "setSecond":
      return {
        ...state,
        secondAnswer: action.payload,
      };
    case "setThird":
      return {
        ...state,
        thirdAnswer: action.payload,
      };
    case "setFourth":
      return {
        ...state,
        fourthAnswer: action.payload,
      };
    case "setCorrect":
      return { ...state, correctAnswer: action.payload };
    case "setAll":
      return { ...action.payload };
    case "refeshQuestion":
      return { ...initialQuestion };
    default:
      return state;
  }
};
const StateContextProvider = ({ children }) => {
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  const [state, dispatch] = useReducer(reducer, initialValue);
  const [token, setToken] = useState(null);
  const [question, dispatchQuestion] = useReducer(
    reducerQuestion,
    initialQuestion
  );

  return (
    <StateContext.Provider
      value={{
        state,
        dispatch,
        question,
        dispatchQuestion,
        isOpen1,
        onOpen1,
        onClose1,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
export default StateContextProvider;
export const useStateContext = () => useContext(StateContext);
