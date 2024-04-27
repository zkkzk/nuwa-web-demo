"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { TypeWorldBookEntriy } from "../../_lib/definitions";
import { useWorldBookItem, useWorldBookItemDispatch } from "./WorldBookContext";
import { Input } from "@nextui-org/react";
import PencilEditIcon from "../icons/PencilEditIcon";

function WorldBook_Title() {
  const t = useTranslations();

  const worldBookItem = useWorldBookItem();
  const worldBookItemDispatch = useWorldBookItemDispatch();

  const setWorldBookItemName = (newValue:string) => {
    worldBookItemDispatch({
      type: "changed",
      payload: {
        ...worldBookItem,
        worldBook: {
          ...worldBookItem?.worldBook,
          name: newValue
        }
      },
    })
  }

  return (
    <div className="group w-full flex flex-row justify-center h-14">
      {/* <div className="flex flex-row items-center justify-center">
        <div>{worldBookItem?.worldBook.name}</div>
        <PencilEditIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0 fill-black" /> 
      </div> */}
      <Input
        value={worldBookItem?.worldBook.name}
        variant="underlined"
        onChange={(e) => {
          const newValue = e.target.value;
          setWorldBookItemName(newValue);
        }}
        size="sm"
        classNames={{
          label: "",
          input: "",
          innerWrapper: "bg-transparent",
          inputWrapper: "shadow-none",
        }}
        className="w-full h-full px-10 bg-transparent outline-none disabled:bg-transparent hidden group-hover:block"
      />
      <div className="h-full flex flex-row group-hover:hidden items-center gap-2 overflow-hidden">
        <div className="overflow-hidden whitespace-nowrap text-overflow-ellipsis">{worldBookItem?.worldBook.name}</div>
        <PencilEditIcon className="h-12 text-2xl text-default-400 pointer-events-none flex-shrink-0 " />
      </div>
    </div>
    
  );
}

export default WorldBook_Title;
