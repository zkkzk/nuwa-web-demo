"use client";
import React, { useState } from "react";
import { usePostCharaFun, getWorldBookList } from "../../_lib/utils";
import { useTranslations } from "next-intl";
import { LinkIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import NuwaButton from "../components/NuwaButton";
import Scenario_CreateWorldBook from "./Scenario_CreateWorldBook";
import { TypeChara, TypeWorldBook } from "../../_lib/definitions";
import { Link } from "@/navigation";
import Image from "next/image";
import { useCharaListItem, useCharaListItemDispatch } from "../charas/CharaContext";
import WorldBookItem from "../worldbook/WorldBookItem";

function Scenario_WorldBook() {
  const t = useTranslations();

  const selectWorldBookModal = useDisclosure();

  const charaList = getWorldBookList();
  const [myWorldBooks , setMyWorldBooks] = useState(charaList || [] as Array<TypeWorldBook>);
  const isLogin = false;


  const charaListItem = useCharaListItem();
  const charaListItemDispatch = useCharaListItemDispatch();
  const setCharaListItem = (newValue:TypeChara | undefined) => {
    charaListItemDispatch({
      type: "changed",
      payload: {
        ...charaListItem,
        chara: newValue
      },
    })
  }
  const setCharaListItemCleareWorldBook = (newValue:string | undefined) => {
    charaListItemDispatch({
      type: "changed",
      payload: {
        ...charaListItem,
        chara: {
          ...charaListItem.chara,
          data: {
            ...charaListItem.chara.data,
            character_book: newValue,
          }
        }
      },
    })
  }
  
  const handleRemoveSelectedWorldBook = () => {
    setCharaListItemCleareWorldBook(undefined)
  };

  return (
    <div className="relative h-full w-full">
      <label
        className="text-2xl text-neutral-800 font-bold tracking-tight"
      >
        {t('Character.scenarioWorldbookTitle')}
      </label>

      <NuwaButton
        color="black"
        onClick={() => {
          selectWorldBookModal.onOpen();
        }}
        startContent={<LinkIcon className="h-4 w-4"/>}
        className="absolute top-0 right-0 h-10 w-32 p-0 z-40"
        type="button"
        variant="flat"
        >
          关联世界书
      </NuwaButton>
      <Modal 
        size="full"
        isOpen={selectWorldBookModal.isOpen}
        placement={'bottom'}
        scrollBehavior="inside"
        onOpenChange={selectWorldBookModal.onOpenChange}
        classNames={{
          base: "h-11/12",
        }}
        hideCloseButton={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row justify-between items-center gap-1 py-6">
                <div>选择一本世界书</div>
                {/* <div
                  className="cursor-pointer flex flex-row items-center justify-center h-12 w-52 z-40 bg-[url('/character-inforMation-personality-model-insert-bg.png')] bg-no-repeat bg-center bg-contain"
                  onClick={() => {
                    createWorldBookModal.onOpen();
                  }}
                >
                  <span className="text-black text-lg ont-semibold">创建新世界书</span>
                </div> */}
              </ModalHeader>
              <ModalBody>
                <div className="grid md:grid-cols-4 sm:grid-cols-3 gap-10 py-10 px-7 overflow-visible h-auto">
                  {myWorldBooks && myWorldBooks.map((worldBookItem, index) => (
                    <div
                      key={`${worldBookItem.uid}+${index}`}
                      onClick={() => {
                        const {updateChara} = usePostCharaFun(charaListItem.chara, worldBookItem.worldBook);
                        setCharaListItem(updateChara);
                        onClose();
                      }}
                      className="cursor-pointer relative w-auto h-[340px]"
                    >
                      <WorldBookItem worldBookItem={worldBookItem.worldBook} />
                    </div>
                  ))}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="w-full h-full">
        <div className="grid 2xl:grid-cols-3 3xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-4 py-10 overflow-visible h-auto">
          
            {charaListItem.chara.data.character_book && (
              <div className="relative w-auto h-[340px]">
                <Button
                  onClick={() => {
                    handleRemoveSelectedWorldBook();
                  }}
                  className="absolute -top-4 -right-4 h-10 w-5 p-0 rounded-full bg-black z-40"
                  type="button"
                  color="default"
                  variant="flat"
                  isIconOnly
                >
                  <XMarkIcon className="h-6 w-6 text-white font-black absolute" aria-hidden="true" />
                </Button>
                <WorldBookItem worldBookItem={charaListItem.chara.data.character_book} />
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default Scenario_WorldBook;
