"use client";
import React, { useContext, useEffect, useState } from "react";
import { createContext } from 'react';
import { useTranslations } from "next-intl";
import { Button, Divider, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";

import { useChara, getChara, pushCharaList, useCover, usePostCharaAll, createChara, useCharaList, getCharaList } from "../../_lib/utils";
import {
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';
import NuwaButton from "../components/NuwaButton";
import { TypeChara, TypeCharaList, TypeCharaListItem } from "../../_lib/definitions";
import CharacterPreview from "../components/CharacterPreview";
import AlterMessage from "../components/AlterMessage";
import { PlusIcon } from "@heroicons/react/24/outline";
import { uniqueId } from "lodash-es";
import CharacterEditWrapper from "../character/CharacterEditWrapper";
import { CharaProvider } from "./CharaContext";

function CharacterEdit({ onDone, chara }: {
  onDone?: () => void,
  chara?: TypeCharaListItem | undefined
}) {
  const t = useTranslations();
  const editModal = useDisclosure();
  const {updateChara} = usePostCharaAll();
  const {cover,setCover} = useCover();
  const [isMakeCharLoding, setIsMakeCharLoding] = useState(false);
  const msgModal = useDisclosure();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const charaList  = getCharaList();


  useEffect(() => {
    if(chara) {
      editModal.onOpen();
    }
  }, [chara])
  
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
                {/* <CharaListProvider value={chara as any}> */}
                {chara && (
                  <CharaProvider value={chara}>
                    <CharacterEditWrapper/>
                  </CharaProvider>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default CharacterEdit;
