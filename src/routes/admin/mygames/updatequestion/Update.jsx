import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import QuestionDialog from "./QuestionDialog";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../../lib/context/StateContextProvider";
import { useAPIConText } from "../../../../lib/context/APIContextProvider";
const Update = () => {
  const navigate = useNavigate();
  const [i, setIndex] = useState(null);
  const {
    flagUpdate,
    setFlagUpdate,
    createQuestionByID,
    deleteQuestionByID,
    upDateQuestionByID,
    getQuestionByID,
    questionByID,
    setQuestionByID,
  } = useAPIConText(); //tạo 1 list question từ id
  const { question, dispatchQuestion, state } = useStateContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [itemUpdate, setItemUpdate] = useState(null);
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  useEffect(() => {
    getQuestionByID();
  }, [flagUpdate]);
  const cancelRef = React.useRef();
  return (
    <div className="p-24">
      <div>
        {questionByID?.map((item, index) => {
          return (
            <div
              className="flex justify-around items-center border-[1px] border-black p-2 my-3"
              key={index}
            >
              <Text isTruncated className="w-[700px]">
                {item.content}
              </Text>
              <div className="flex items-center space-x-3">
                <PencilIcon
                  onClick={() => {
                    setIndex(index);
                    setItemUpdate({ isUpdate: true, item });
                    onOpen1();
                  }}
                  className="w-6 h-6"
                ></PencilIcon>
                <TrashIcon
                  className="w-6 h-6"
                  onClick={() => {
                    deleteQuestionByID(item.id);
                  }}
                ></TrashIcon>
              </div>
            </div>
          );
        })}
      </div>
      <Button onClick={onOpen} className="my-8">
        Add Question
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              width={"800px"}
              className="bg-white"
              fontSize="lg"
              fontWeight="bold"
            >
              <div className="flex items-center w-full justify-between">
                <h1 className="font-semibold  bg-blacktext-[24px]">Question</h1>
                <XMarkIcon
                  ref={cancelRef}
                  onClick={onClose}
                  className="w-[24px] h-[24px]"
                ></XMarkIcon>
              </div>
            </AlertDialogHeader>
            <AlertDialogBody width={"800px"} className="bg-white">
              <QuestionDialog
                request={{ isUpdate: false, item: null }}
              ></QuestionDialog>
            </AlertDialogBody>
            <AlertDialogFooter width={"800px"} className="bg-white">
              <div className="w-full flex justify-center items-center">
                <Button
                  bg={"#00a3ff"}
                  _hover={{ bg: "#00a3ff" }}
                  className="my-3"
                  onClick={() => {
                    createQuestionByID(question);
                  }}
                >
                  Create
                </Button>
              </div>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Arlet Dialog 1 */}
      <AlertDialog
        isOpen={isOpen1}
        leastDestructiveRef={cancelRef}
        onClose={onClose1}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              width={"800px"}
              className="bg-white"
              fontSize="lg"
              fontWeight="bold"
            >
              <div className="flex items-center w-full justify-between">
                <h1 className="font-semibold  bg-blacktext-[24px]">Question</h1>
                <XMarkIcon
                  ref={cancelRef}
                  onClick={onClose1}
                  className="w-[24px] h-[24px]"
                ></XMarkIcon>
              </div>
            </AlertDialogHeader>
            <AlertDialogBody width={"800px"} className="bg-white">
              <QuestionDialog request={itemUpdate}></QuestionDialog>
            </AlertDialogBody>
            <AlertDialogFooter width={"800px"} className="bg-white">
              <div className="w-full flex items-center justify-around">
                <Button
                  bg={"#00a3ff"}
                  _hover={{ bg: "#00a3ff" }}
                  className="my-3"
                  onClick={(item, index) => {
                    upDateQuestionByID(question);
                    setFlagUpdate((flag) => !flag);
                  }}
                >
                  Saves
                </Button>
                <Button
                  bg={"red"}
                  _hover={{ bg: "red" }}
                  className="my-3"
                  onClick={onClose1}
                >
                  Cancel
                </Button>
              </div>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <div className="w-full text-center">
        <Button
          onClick={async () => {
            const question = {
              name: state.namegame,
              expiryDate: state.date,
              durationMinutes: state.time,
              questionDTOS: listQuestion,
            };

            await axios
              .post("http://localhost:8085/api/exam", question, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              })
              .then((response) => {
                console.log(response.data);
                alert("Thành công");
                navigate("/Role_Lecturer");
              })
              .catch((err) => {
                alert(err.response);
                console.log(err.response.data);
              });
          }}
        >
          Create
        </Button>
      </div>
    </div>
  );
};
export default Update;
