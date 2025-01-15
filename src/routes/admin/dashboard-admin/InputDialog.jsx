import { Box, Button, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../../../lib/context/StateContextProvider";

const InputDialog = () => {
  const { state, dispatch } = useStateContext();
  const navigate = useNavigate();
  console.log(state);
  return (
    <div>
      <Box>
        <h1 className="text-[#f6d166] font-semibold">
          Let's Give Your Game A Name
        </h1>
        <Input
          onChange={(e) => {
            dispatch({ type: "setNameGame", payload: e.target.value });
          }}
          value={state.namegame}
          placeholder="Enter your game name"
        ></Input>
      </Box>
      <Box>
        <h1 className="text-[#f6d166] font-semibold">Date</h1>
        <Input
          type="date"
          onChange={(e) => {
            dispatch({ type: "setDate", payload: e.target.value });
          }}
          value={state.date}
          placeholder="Enter your date"
        ></Input>
      </Box>
      <Box>
        <h1 className="text-[#f6d166] font-semibold">Time(Minutes)</h1>
        <Input
          type="number"
          onChange={(e) => {
            dispatch({ type: "setTime", payload: e.target.value });
          }}
          value={state.time}
          placeholder="Enter your time "
        ></Input>
      </Box>
      <Box>
        <h1 className="text-[#f6d166] font-semibold mt-5">
          Give Your Game A Description (Optional)
        </h1>
        <Input
          onChange={(e) => {
            dispatch({ type: "setDesc", payload: e.target.value });
          }}
          value={state.desc}
          height={"200px"}
          placeholder="Describe your game in a way that might help you remember why you made it"
        ></Input>
      </Box>

      <div className="flex justify-center mt-5">
        <Button
          onClick={() => {
            if (state.namegame.trim() === "") {
              alert("Enter game name");
            } else {
              localStorage.setItem("namegame", state.namegame);
              localStorage.setItem("desc", state.desc);
              navigate("/Role_Lecturer-CreateGame");
            }
          }}
          backgroundColor={"#f6d166"}
          _hover={{ backgroundColor: "#fda085" }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default InputDialog;
