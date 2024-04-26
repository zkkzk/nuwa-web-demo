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
    <>
      {/* <div className="flex flex-row items-center justify-center">
        <div>{worldBookItem?.worldBook.name}</div>
        <PencilEditIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0 fill-black" /> 
      </div> */}
      <Input
        value={worldBookItem?.worldBook.name}
        variant="flat"
        onChange={(e) => {
          const newValue = e.target.value;
          setWorldBookItemName(newValue);
        }}
        size="sm"
        classNames={{
          label: "",
          input: "text-right",
          innerWrapper: "bg-transparent",
          inputWrapper: "bg-transparent shadow-none",
        }}
        className="w-full h-full bg-transparent outline-none disabled:bg-transparent"
        endContent={
          <PencilEditIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0 fill-black" />
        }
      />
    </>
    
  );
}

export default WorldBook_Title;
