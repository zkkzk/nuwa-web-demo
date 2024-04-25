"use client"

import React, { useState } from "react";
import { getWorldBookList, pushWorldBookList } from "../../_lib/utils";
import { useTranslations } from "next-intl";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import WorldBookEdit from "./WorldBookEdit";
import { TypeWorldBookItem, TypeWorldBookList } from "../../_lib/definitions";
import WorldBookCreate from "./WorldBookCreate";

export default function WorldBookList() {
  const t = useTranslations();

  const initWorldBookList = getWorldBookList();
  const [ worldBookList, setWorldBookList ] = useState<TypeWorldBookList>(initWorldBookList);
  const [ editWorldBook, setEditWorldBook ] = useState<TypeWorldBookItem>();

  const deleteWorldBook = ({index}: {index: number}) => {
    const newWorldBookList = worldBookList.filter((_, i) => i !== index);
    pushWorldBookList(newWorldBookList);
    setWorldBookList(newWorldBookList);
  }

  return (
    <>
      <div className="relative bg-white h-full w-full pt-20 pb-40 rounded-[40px]">
        <div className="flex flex-row justify-end mt-2 z-40">
          <WorldBookCreate
            onCreateDone={(newWorldBook) => {
              setWorldBookList(getWorldBookList());
            }} />
        </div>

        <div className="px-7">
          <div className="grid 2xl:grid-cols-3 3xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-4 py-10 px-7 overflow-visible h-auto">
            
            {worldBookList.map((worldBookItem, index) => (
              <div key={worldBookItem.uid} className="relative group bg-[#979797] w-auto h-[340px] rounded-lg shadow-lg shadow-black/25 py-8 px-3">
                <div className="border-y border-solid border-white text-white font-semibold text-2xl line-clamp-1">{worldBookItem.worldBook.name}</div>
                <div className="pt-14 pb-4 h-full overflow-y-scroll w-auto text-white break-words">
                {worldBookItem.worldBook.entries.map((entry, index) => (
                  <p key={`${worldBookItem.uid}-entries${index}`}>{entry.comment}</p>
                ))}
                </div>

                <div className="absolute top-4 right-4 flex flex-col gap-4">
                  <Popover placement="top" color='warning'>
                    <PopoverTrigger>
                      <Button
                        className="bg-black text-white opacity-0 group-hover:opacity-100"
                        startContent={<TrashIcon className="h-5 w-5"/>}
                        isIconOnly
                      ></Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Button 
                        className="w-full" 
                        size="sm" 
                        color="warning"
                        onClick={() => {
                          deleteWorldBook({index})
                        }}
                      >    
                        {t('Previews.mymindismadeup')}
                      </Button>
                    </PopoverContent>
                  </Popover>

                  <Button
                    className="bg-black text-white opacity-0 group-hover:opacity-100"
                    startContent={<PencilSquareIcon className="h-5 w-5"/>}
                    isIconOnly
                    onClick={() => {
                      setEditWorldBook(worldBookItem);
                    }}
                  ></Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <WorldBookEdit worldBook={editWorldBook} onDone={() => {
        setEditWorldBook(undefined);
        setWorldBookList(getWorldBookList());
      }} />
    </>
  );
}
