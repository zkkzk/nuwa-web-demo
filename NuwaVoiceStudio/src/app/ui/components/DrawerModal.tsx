"use client";
import React, { useState, ReactNode } from "react";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";

export type TypeModalDisclosure = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: () => void;
  isControlled: boolean;
  getButtonProps: (props?: any) => any;
  getDisclosureProps: (props?: any) => any;
};

function DrawerModal({
  children,
  modalDisclosure,
}: {
  children: ReactNode,
  modalDisclosure: TypeModalDisclosure
}) {

  return (
      <Modal 
        size="full"
        isOpen={modalDisclosure.isOpen}
        placement={'bottom'}
        scrollBehavior="inside"
        onOpenChange={modalDisclosure.onOpenChange}
        classNames={{
          base: "h-11/12 rounded-t-lg overflow-hidden bg-transparent shadow-none",
          header: "rounded-t-lg overflow-hidden bg-transparent",
          body: "bg-zinc-900 rounded-tl-2xl rounded-tr-2xl px-[120px]",
          footer: "bg-zinc-900 rounded-bl-xl rounded-br-xl px-[120px]"
        }}
        hideCloseButton={false}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                opacity: {
                  duration: 0.15,
                },
              },
            },
            exit: {
              y: "50%",
              opacity: 0,
              transition: {
                opacity: {
                  duration: 0.1,
                },
              },
            },
          },
        }}
      >
        {children}
      </Modal>
  );
}

export default DrawerModal;
