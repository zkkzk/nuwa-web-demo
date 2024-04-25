"use client";
import React, { useRef } from "react";
import { useChara } from "../../_lib/utils";
import { useTranslations } from "next-intl";
import InsertUserOrChar from "../components/InsertUserOrChar";
import { useCharaListItem, useCharaListItemDispatch } from "../charas/CharaContext";
import { textareaProps } from "../components/NuwaTextarea";
import { Textarea } from "@nextui-org/react";

function InfoMation_FirstMessage() {
  const t = useTranslations();
  const { chara , setChara } = useChara();
  const descTextareaRef = useRef(null);

  const handleFirst_MessageChange = (newValue:string) => {
    setChara((prevChara) => ({
      ...prevChara,
      data: { ...prevChara.data, first_mes: newValue },
    }));
    setCharaListItem(newValue);
  };

  
  const charaListItem = useCharaListItem();
  const charaListItemDispatch = useCharaListItemDispatch();
  const setCharaListItem = (newValue:string) => {
    charaListItemDispatch({
      type: "changed",
      payload: {
        ...charaListItem,
        chara: {
          ...charaListItem.chara,
          data: {
            ...charaListItem.chara.data,
            first_mes: newValue,
          }
        }
      },
    })
  }

  return (
    <div className="relative group">
      <Textarea
        {...textareaProps as any}
        label={<div>{t('Character.firstmessage')}<span className="text-red-500">*</span></div>}
        ref={descTextareaRef}
        placeholder={t('Character.firstmessage')}
        value={charaListItem.chara.data.first_mes}
        onChange={(e) => {
          setCharaListItem(e.target.value)
        }}
      />
      <div className="z-40 hidden group-hover:block absolute -top-16 right-0 pl-4 sm:top-auto sm:-right-44 sm:bottom-0 sm:pt-20">
          <InsertUserOrChar getTextRef={() => {
            return descTextareaRef.current
          }} onDone={(newValue) => {
            setCharaListItem(newValue)
          }} />
      </div>
    </div>
  );
}

export default InfoMation_FirstMessage;
