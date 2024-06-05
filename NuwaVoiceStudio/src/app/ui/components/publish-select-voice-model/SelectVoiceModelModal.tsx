"use client";
import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import ToneVoiceFile from "../ToneVoiceFile";

function SelectVoiceModelModal({
  isOpen = false,
  onChange = () => {},
}: {
  isOpen: boolean;
  onChange: (isOpen: boolean) => void; // 类型定义为函数，用于处理模态框的打开和关闭
}) {

  const selectModal = useDisclosure({
    isOpen,
    onClose: () => onChange(false),
    onOpen: () => onChange(true),
  });

  return (
      <Modal 
        size="xl"
        isOpen={selectModal.isOpen}
        placement={'center'}
        scrollBehavior="inside"
        onOpenChange={selectModal.onOpenChange}
        // classNames={{
        //   base: "h-11/12 rounded-t-lg overflow-hidden bg-transparent shadow-none",
        //   header: "rounded-t-lg overflow-hidden bg-transparent",
        //   body: "bg-zinc-900 rounded-tl-2xl rounded-tr-2xl rounded-bl-xl rounded-br-xl px-[120px]",
        // }}
        hideCloseButton={false}
      >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <div className="text-white text-2xl font-bold font-['Inter'] leading-loose">Select Model</div>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <ToneVoiceFile voiceSrc={"voiceSrc"} hideCheckbox={false} />
                <ToneVoiceFile voiceSrc={"voiceSrc"} hideCheckbox={false} isDisabled={true} />
                <ToneVoiceFile voiceSrc={"voiceSrc"} hideCheckbox={false} />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button size="lg" color="primary" variant="solid">Add</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default SelectVoiceModelModal;
