import React, { useState } from "react";
import { useStateContext } from "../../../lib/context/StateContextProvider";
import { CheckCircleIcon, PencilIcon } from "@heroicons/react/24/solid";
import { Input } from "@chakra-ui/react";
import { triviamakder } from "../../../assets";
const Title = () => {
  const { state, dispatch } = useStateContext();
  const [checkIcon, setCheckIcon] = useState(true);
  const handleClickIcon = () => {
    setCheckIcon((e) => !e);
  };
  return (
    <div className="flex items-center space-x-24">
      <div>
        <img className="w-40 h-40" src={triviamakder} alt="" />
      </div>
      <div>
        <div className="flex items-center">
          {checkIcon ? (
            <PencilIcon
              onClick={handleClickIcon}
              className="w-5 h-5 text-[#71cccf]"
            ></PencilIcon>
          ) : (
            <CheckCircleIcon
              onClick={handleClickIcon}
              className="w-5 h-5 text-[#71cccf]"
            ></CheckCircleIcon>
          )}
          <Input
            onChange={(e) => {
              dispatch({ type: "setNameGame", payload: e.target.value });
            }}
            disabled={checkIcon ? true : false}
            value={state.namegame}
            borderColor={"transparent"}
          ></Input>
        </div>

        <div className="flex items-center">
          {checkIcon ? (
            <PencilIcon
              onClick={handleClickIcon}
              className="w-5 h-5 text-[#71cccf]"
            ></PencilIcon>
          ) : (
            <CheckCircleIcon
              onClick={handleClickIcon}
              className="w-5 h-5 text-[#71cccf]"
            ></CheckCircleIcon>
          )}
          <Input
            onChange={(e) => {
              dispatch({ type: "setDate", payload: e.target.value });
            }}
            disabled={checkIcon ? true : false}
            value={state.date}
            borderColor={"transparent"}
          ></Input>
        </div>
        <div className="flex items-center">
          {checkIcon ? (
            <PencilIcon
              onClick={handleClickIcon}
              className="w-5 h-5 text-[#71cccf]"
            ></PencilIcon>
          ) : (
            <CheckCircleIcon
              onClick={handleClickIcon}
              className="w-5 h-5 text-[#71cccf]"
            ></CheckCircleIcon>
          )}
          <Input
            onChange={(e) => {
              dispatch({ type: "setTime", payload: e.target.value });
            }}
            disabled={checkIcon ? true : false}
            value={state.time}
            borderColor={"transparent"}
          ></Input>
        </div>
        <div className="flex items-center">
          {checkIcon ? (
            <PencilIcon
              onClick={handleClickIcon}
              className="w-5 h-5 text-[#71cccf]"
            ></PencilIcon>
          ) : (
            <CheckCircleIcon
              onClick={handleClickIcon}
              className="w-5 h-5 text-[#71cccf]"
            ></CheckCircleIcon>
          )}{" "}
          <Input
            onChange={(e) => {
              dispatch({ type: "setDesc", payload: e.target.value });
            }}
            disabled={checkIcon ? true : false}
            value={state.desc}
            borderColor={"transparent"}
          ></Input>
        </div>
      </div>
    </div>
  );
};

export default Title;
