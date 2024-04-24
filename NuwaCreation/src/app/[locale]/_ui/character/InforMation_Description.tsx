"use client";
import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import InsertUserOrChar from "../components/InsertUserOrChar";
import { useCharaListItem, useCharaListItemDispatch } from "../charas/CharaContext";

function InforMation_Description() {
  const t = useTranslations();
  const charaListItem = useCharaListItem();
  const charaListItemDispatch = useCharaListItemDispatch();
  const descTextareaRef = useRef(null);


  const handleDescriptionChange = (e:any) => {
    const newValue = e.target.value;
    setDesc(newValue)
  };

  const setDesc = (desc:string) => {
    charaListItemDispatch({
      type: "changed",
      payload: {
        ...charaListItem,
        chara: {
          ...charaListItem.chara,
          data: {
            ...charaListItem.chara.data,
            description: desc,
          }
        }
      },
    })
  }
  

  return (
    <div className="group h-6/12 py-4 flex flex-col">
      <label
        className="block text-lg font-medium leading-8 mb-1"
      >
        {t('Character.description')}*
      </label>
      <div className="flex flex-row mt-2 grow">  
        <div className="mr-4 grow">
          <textarea
            ref={descTextareaRef}
            placeholder="Description"
            value={charaListItem.chara.data.description}
            onChange={handleDescriptionChange}
            className="border-none outline-none w-full h-full resize-none mb-6 break-all"
          />
        </div>
        <div className="opacity-0 group-hover:opacity-100">
          <InsertUserOrChar getTextRef={() => {
            return descTextareaRef.current
          }} onDone={(newValue) => {
            setDesc(newValue)
          }} />
        </div>
        
      </div>     
    </div>
  );
}

export default InforMation_Description;
