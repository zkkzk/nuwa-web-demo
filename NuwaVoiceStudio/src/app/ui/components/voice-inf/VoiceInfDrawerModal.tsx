"use client";
import React from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import MainStationControl from "./MainStationControl";
import { VoiceInfHistoryType, VoiceModelToneType } from "@/app/lib/definitions.voice";

function VoiceInfDrawerModal({
  isOpen,
  publishId = "",
  modelId = "",
  tones = [],
  onChange,
  onSuccess,
}: {
  isOpen: boolean;
  publishId: string;
  modelId: string;
  tones: VoiceModelToneType[];
  onChange?: (isOpen: boolean) => void;
  onSuccess?: (newInf: VoiceInfHistoryType) => void;
}) {
  
  return (
    <Modal
      size="4xl"
      isOpen={isOpen}
      scrollBehavior="inside"
      onOpenChange={(isOpen) => {
        onChange && onChange(false);
      }}
      classNames={{
        base: "",
        header: "",
        body: "",
        footer: "",
      }}
      hideCloseButton={false}
      isDismissable={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader></ModalHeader>
            <ModalBody>
              {publishId && (
                <MainStationControl
                  key={publishId}
                  isOpen={false}
                  publishId={publishId}
                  modelId={modelId}
                  tones={tones}
                  onSuccess={(newInf) => {
                    onSuccess && onSuccess(newInf);
                  }}
                />
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default VoiceInfDrawerModal;
