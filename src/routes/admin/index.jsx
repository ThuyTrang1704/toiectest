import React from "react";
import { trivia } from "../../assets";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import InputDialog from "./dashboard-admin/InputDialog";
import { Outlet, Route } from "react-router-dom";
const Admin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  return (
    <div id="content" className="p-[24px] w-full h-full">
      <div className="container2">
        <div className="content-creategame">
          <div className="flex items-center mb-5">
            <PlusCircleIcon className="w-[48px] h-[48px] text-[#74ccd1]"></PlusCircleIcon>
            <h1 className="font-medium text-[24px]">Create Game</h1>
          </div>
          <div className="bg-[#4ee476] inline-block rounded-lg p-2 border-[#4fe477] border-[3px]">
            <img className="w-[180px] h-auto" src={trivia} onClick={onOpen} />
          </div>
        </div>
      </div>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent borderRadius={"16px"}>
            <AlertDialogHeader
              borderTopRadius={"16px"}
              fontSize="lg"
              fontWeight="bold"
              css={{
                backgroundImage:
                  "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
              }}
            >
              <div className="flex items-center justify-between">
                <h1 className="font-semibold text-[24px]">Game Setup</h1>
                <XMarkIcon
                  ref={cancelRef}
                  onClick={onClose}
                  className="w-[24px] h-[24px]"
                ></XMarkIcon>
              </div>
            </AlertDialogHeader>
            <AlertDialogBody>
              <InputDialog />
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Outlet></Outlet>
    </div>
  );
};
export default Admin;
