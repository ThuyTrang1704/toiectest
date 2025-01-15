import React, { useState } from "react";
import { CheckCircleIcon, PencilIcon } from "@heroicons/react/24/solid";
import { Button, Input } from "@chakra-ui/react";
import { useStateContext } from "../../../lib/context/StateContextProvider";
import Title from "./Title";
import CreateQuestion from "./CreateQuestion";
const CreateGame = () => {
  return (
    <div className="w-full h-full p-12">
      <Title></Title>
      <h1 className="font-semibold my-12">SETUP YOUR QUESTION</h1>
      <CreateQuestion></CreateQuestion>
    </div>
  );
};

export default CreateGame;
CreateGame;