"use client";
import React, { useState } from "react";
import VoiceModelListHeader from "./VoiceModelListHeader";
import VoiceModelList from "../components/voice-model-list/VoiceModelList";
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import VoiceAssetDetail from "./VoiceModelDetail";

function VoiceAsse() {

  const voiceDetailModal = useDisclosure();

  return (
    <div className="w-full h-screen pt-14 overflow-hidden bg-neutral-900 rounded-bl-xl rounded-br-xl justify-start items-end inline-flex">
      <div className="w-full self-stretch justify-start items-start flex h-screen">
        <div className="fixed top-14 left-0 w-full z-40">
          <VoiceModelListHeader />
        </div>
        <div className="self-stretch pt-[170px] overflow-hidden w-full">
          <VoiceModelList onItemClick={() => {
            voiceDetailModal.onOpen();
          }} />
        </div>
      </div>

      <Modal 
        size="full"
        isOpen={voiceDetailModal.isOpen}
        placement={'bottom'}
        scrollBehavior="inside"
        onOpenChange={voiceDetailModal.onOpenChange}
        classNames={{
          base: "h-11/12 rounded-t-lg overflow-hidden bg-transparent",
          header: "rounded-t-lg overflow-hidden bg-transparent",
          body: "bg-zinc-900 rounded-tl-2xl rounded-tr-2xl rounded-bl-xl rounded-br-xl px-[120px]",
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
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader></ModalHeader>
              <ModalBody>
                <VoiceAssetDetail />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default VoiceAsse;
