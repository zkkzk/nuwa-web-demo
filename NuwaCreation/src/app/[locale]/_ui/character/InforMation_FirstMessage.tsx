"use client";
import React, { useRef } from "react";
import { useChara } from "../../_lib/utils";
import { useTranslations } from "next-intl";
import InsertUserOrChar from "../components/InsertUserOrChar";
import { useCharaListItem, useCharaListItemDispatch } from "../charas/CharaContext";

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
      <div>
        <div className="flex flex-col grow mt-6">
          <div className="py-4 group flex flex-col bg-white h-52 rounded-[40px] p-7">
            <label
              className="block text-lg font-medium leading-8 mb-1"
            >
              {t('Character.firstmessage')}*
            </label>
            <div className="flex flex-row items-end mt-2 grow shrink">  
              <div className="mr-4 grow h-full">
                <textarea
                  ref={descTextareaRef}
                  placeholder={t('Character.firstmessage')}
                  value={charaListItem.chara.data.first_mes}
                  onChange={(e) => {
                    setCharaListItem(e.target.value)
                  }}
                  className="h-full border-none outline-none w-full resize-none mb-6 break-all"
                />
              </div>

              <div className="opacity-0 group-hover:opacity-100">
                <InsertUserOrChar getTextRef={() => {
                  return descTextareaRef.current
                }} onDone={(newValue) => {
                  setCharaListItem(newValue)
                }} />
                </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default InfoMation_FirstMessage;
