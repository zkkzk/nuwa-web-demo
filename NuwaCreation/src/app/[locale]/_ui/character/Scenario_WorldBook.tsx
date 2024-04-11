"use client";
import React, { useEffect, useRef, useState } from "react";
import { useChara, useCharacterBook } from "../../_lib/utils";
import { useTranslations } from "next-intl";
import { LinkIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import NuwaButton from "../components/NuwaButton";

const worldbookList = [{
  name: "一本世界书1",
  entries: [{
    comment: "一本世界书11",
  }, {
    comment: "一本世界书11",
  }]
}, {
  name: "一本世界书2",
  entries: [{
    comment: "一本世界书22",
  }, {
    comment: "一本世界书22",
  }]
}, {
  name: "一本世界书3",
  entries: [{
    comment: "一本世界书33",
  }, {
    comment: "一本世界书33",
  }]
}, {
  name: "一本世界书3",
  entries: [{
    comment: "一本世界书33",
  }, {
    comment: "一本世界书33",
  }]
}, {
  name: "一本世界书3",
  entries: [{
    comment: "一本世界书33",
  }, {
    comment: "一本世界书33",
  }]
}]
function Scenario_WorldBook() {
  const t = useTranslations();
  const { chara , setChara } = useChara();
  const { character_book, setCharacter_Book } = useCharacterBook();

  const selectWorldBookModal = useDisclosure();
  const [selectedWorldBooks , setSelectedWorldBooks] = useState([]);
  const [myWorldBooks , setMyWorldBooks] = useState([...worldbookList]);

  const handleRemoveSelectedWorldBooks = (worldBookToRemove : Object, index : number) => {
    setSelectedWorldBooks(selectedWorldBooks.filter((worldBook, index2) => !(worldBook.name === worldBookToRemove.name && index === index2)));
  };

  return (
    <div className="relative bg-white h-full w-full py-12 rounded-[40px] bg-[url('/character-worldbook-bg.png')] bg-no-repeat bg-right-top">
      <label
        className="text-[#0C0C0C] text-lg font-medium leading-8 mb-1 px-7"
      >
        {t('Character.scenarioWorldbookTitle')}
      </label>

      <NuwaButton
        color="black"
        onClick={() => {
          selectWorldBookModal.onOpen();
        }}
        startContent={<LinkIcon className="h-4 w-4"/>}
        className="absolute top-4 right-4 h-10 w-32 p-0 z-40"
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
          base: "h-3/4",
          // wrapper: "items-end",
          // backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          // base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          // header: "border-b-[1px] border-[#292f46]",
          // footer: "border-t-[1px] border-[#292f46]",
          // closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">选择一本世界书</ModalHeader>
              <ModalBody>
                <div className="grid md:grid-cols-4 sm:grid-cols-3 gap-10 py-10 px-7 overflow-visible h-auto">
                  {myWorldBooks && myWorldBooks.map((worldbook, index) => (
                    <div
                      key={`${worldbook.name}+${index}`}
                      onClick={() => {
                        setSelectedWorldBooks([worldbook]);
                        onClose();
                      }}
                      className="cursor-pointer relative bg-[#979797] w-auto h-[340px] rounded-lg shadow-lg shadow-black/25 py-8 px-3"
                    >
                      <div className="border-y border-solid border-white text-white font-semibold text-2xl">{worldbook.name}</div>
                      <div className="pt-14 pb-4 h-full overflow-y-scroll w-auto text-white break-words">
                      {worldbook.entries.map((entry, index) => (
                        <p>{entry.comment}</p>
                      ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="overflow-y-scroll w-full h-full">
        <div className="grid 2xl:grid-cols-3 3xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-4 py-10 px-7 overflow-visible h-auto">
          
            {selectedWorldBooks && selectedWorldBooks.map((worldbook, index) => (
              <div key={`${worldbook.name}+${index}`} className="relative bg-[#979797] w-auto h-[340px] rounded-lg shadow-lg shadow-black/25 py-8 px-3">
                <Button
                  onClick={() => {
                    handleRemoveSelectedWorldBooks(worldbook, index);
                  }}
                  className="absolute -top-4 -right-4 h-10 w-5 p-0 rounded-full bg-black z-40"
                  type="button"
                  color="default"
                  variant="flat"
                  isIconOnly
                >
                  <XMarkIcon className="h-6 w-6 text-white font-black absolute" aria-hidden="true" />
              </Button>
                <div className="border-y border-solid border-white text-white font-semibold text-2xl">{worldbook.name}</div>
                <div className="pt-14 pb-4 h-full overflow-y-scroll w-auto text-white break-words">
                {worldbook.entries.map((entry, index) => (
                  <p>{entry.comment}</p>
                ))}
                </div>
              </div>
            ))}
        </div> 
      </div>
    </div>
  );
}

export default Scenario_WorldBook;
