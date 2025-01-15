import React, { useEffect, useRef } from "react";
import QuestionDialog from "../admin/creategame/QuestionDialog";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
const DialogLogin = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const cancelRef = useRef();
  useEffect(() => {
    onOpen();
  });
  return (
    <div>
      <AlertDialog
        onOverlayClick={() => {
          console.log("clicks");
          navigate("/");
        }}
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogBody
              width={"550px"}
              height={"800px"}
              className="bg-white rounded-md"
            >
              {children}
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default DialogLogin;
