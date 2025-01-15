import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
} from "@chakra-ui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Input } from "postcss";
import React from "react";

const ModalDialog = ({ isOpen, onOpen, onClose, cancelRef }) => {
  return (
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
              <XMarkIcon className="w-[24px] h-[24px]"></XMarkIcon>
            </div>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Box>
              <h1 className="text-[#f6d166] font-semibold">
                Let's Give Your Game A Name
              </h1>
              <Input placeholder="Enter your game name"></Input>
            </Box>
            <Box>
              <h1 className="text-[#f6d166] font-semibold mt-5">
                Give Your Game A Description (Optional)
              </h1>
              <Input
                height={"200px"}
                placeholder="Describe your game in a way that might help you remember why you made it"
              ></Input>
            </Box>
            <div className="flex justify-center mt-5">
              <Button
                backgroundColor={"#f6d166"}
                _hover={{ backgroundColor: "#fda085" }}
              >
                Next
              </Button>
            </div>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ModalDialog;
