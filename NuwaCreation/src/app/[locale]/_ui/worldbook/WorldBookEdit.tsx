"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import NuwaButton from "../components/NuwaButton";
import { TypeWorldBookItem } from "../../_lib/definitions";
import AlterMessage from "../components/AlterMessage";
import WorldBook from "./WorldBook";
import { WorldBookProvider } from "./WorldBookContext";

function WorldBookEdit({ onDone, worldBook }: {
  onDone?: () => void,
  worldBook?: TypeWorldBookItem | undefined
}) {
  const t = useTranslations();
  const editModal = useDisclosure();
  const [isMakeCharLoding, setIsMakeCharLoding] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');


  useEffect(() => {
    if(worldBook) {
      editModal.onOpen();
    }
  }, [worldBook])
  
  return (
    <>
      <AlterMessage isOpen={isOpen} message={message} onClose={() => {
        setIsOpen(false)
      }} />

      <Modal
        isDismissable={!isOpen}
        size="full"
        isOpen={editModal.isOpen}
        onOpenChange={editModal.onOpenChange}
        hideCloseButton={true}
        onClose={() => {
          onDone && onDone();
        }}
        classNames={{
          body: "overflow-y-scroll",
          backdrop: "",
          base: "h-full",
          header: "",
          footer: "",
          closeButton: "",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row justify-between items-center gap-1 py-6">
                <div></div>
                <div
                  className="flex flex-row items-center justify-center gap-4"
                >
                  
                  <Button isLoading={isMakeCharLoding} className="h-16 w-48 text-xl" color="default" variant="bordered">发布</Button>
                  <NuwaButton className="h-16 w-48 text-xl" color="black" variant="flat" onPress={() => {
                    onClose();
                  }}>关闭</NuwaButton>
                </div>
              </ModalHeader>
              <ModalBody>
                {/* <WorldBookListProvider value={worldBook as any}> */}
                {worldBook && (
                  <WorldBookProvider value={worldBook}>
                    <WorldBook />
                  </WorldBookProvider>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default WorldBookEdit;
