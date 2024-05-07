"use client";

import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import Login from "./login/Login";
import { AlterContextProvider } from "./Alter/AlterContextProvider";
import { useEffect, useState } from "react";
import Register from "./register/Register";
import ResetPassword from "./resetPassword/ResetPassword";
import DeleteUser from "./deleteUser/DeleteUser";
import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function LoginModal({isOpen = false, openPage = 'login', onClose, onLogin, onRegister, onResetPassword, onDeleteUser}:
  {
    isOpen?: boolean, 
    openPage?: string,
    onClose: () => void,
    onLogin?: () => void, 
    onRegister?: () => void,
    onResetPassword?: () => void,
    onDeleteUser?: () => void
  }) {
  
  const msgModal = useDisclosure({isOpen: isOpen});
  const [page, setPage] = useState(openPage);
  const [isBack, setIsBack] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPage(openPage);
    }
  }, [isOpen])

  return (
    <Modal
      isOpen={msgModal.isOpen}
      onClose={() => {
        onClose();
      }}
      hideCloseButton={true}
      classNames={{
        base: "bg-transparent shadow-none w-[360px]",
        body: "p-0 m-0",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <AlterContextProvider>
                <div className="bg-black w-[360px] h-[670px] px-6 py-10 rounded-3xl relative">
                  {isBack && (
                    <Button
                    isIconOnly
                    className={`absolute left-2 top-2`}
                    size="md"
                    variant="light"
                    onPress={() => {
                      setPage('login')
                      setIsBack(false)
                    }}
                  >
                    <ArrowLeftIcon className="h-6 w-6 text-white fill-white" />
                  </Button>
                  )}
                  
                  <Button
                    isIconOnly
                    className="absolute right-2 top-2"
                    size="md"
                    variant="light"
                    onPress={() => {
                      onClose();
                    }}
                  >
                      <XMarkIcon className="h-6 w-6 text-white fill-white" />
                  </Button>
                  <div className={`${page === "login" ? 'block' : 'hidden'} w-full h-full`}>
                    <Login
                      onLogin={onLogin}
                      gotoRegister={() => {
                        setIsBack(true);
                        setPage("register");
                      }}
                      gotoResetPassword={() => {
                        setIsBack(true);
                        setPage("resetPassword");
                      }} />
                  </div>
                  <div className={`${page === "register" ? 'block' : 'hidden'} w-full h-full`}>
                    <Register onRegister={() => {
                      if (onRegister) {
                        onRegister();
                      } else {
                        setPage("login")
                      }
                    }} />
                  </div>
                  <div className={`${page === "resetPassword" ? 'block' : 'hidden'} w-full h-full`}>
                    <ResetPassword onResetPassword={() => {
                      if (onResetPassword) {
                        onResetPassword();
                      } else {
                        setPage("login")
                      }
                    }} />
                  </div>
                  <div className={`${page === "deleteUser" ? 'block' : 'hidden'} w-full h-full`}>
                    <DeleteUser onDeleteUser={() => {
                      if (onDeleteUser) {
                        onDeleteUser();
                      } else {
                        setPage("login")
                      }
                    }} />
                  </div>
                </div>
              </AlterContextProvider>
              
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
    
  );
}
