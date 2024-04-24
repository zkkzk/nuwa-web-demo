"use client";
import React from "react";
import { useTranslations, useMessages } from "next-intl";
import NuwaRadio from "../components/NuwaRadio";
import { useCharaListItem, useCharaListItemDispatch } from "../charas/CharaContext";


function CreatorInfo_Level() {
  const t = useTranslations();
  const messages = useMessages();
  const { Levels } = messages;

  const charaListItem = useCharaListItem();
  const charaListItemDispatch = useCharaListItemDispatch();
  const setCharaListItem = (newValue: string) => {
    charaListItemDispatch({
      type: "changed",
      payload: {
        ...charaListItem,
        chara: {
          ...charaListItem.chara,
          data: {
            ...charaListItem.chara.data,
            extensions: {
              ...charaListItem.chara.data.extensions,
              level: newValue
            }
          }
        }
      },
    })
  }
  
 
  return (
    <div className="bg-white h-full w-full rounded-[40px]">
      <div className="flex flex-col h-full w-full py-7 px-7 rounded-[40px]">
        <div className="flex flex-row items-center">
          <div
            className=" shrink-0 text-neutral-950 text-lg font-semibold leading-loose tracking-tight mr-2"
          >
            {t('Character.level')}
          </div>
          <div className="text-neutral-500 text-xs font-normal leading-snug tracking-tight">{t('Character.leveltip')}</div>
        </div>
        
        <div className="mt-10">
          <NuwaRadio
            items={Levels as unknown as {name: string, value: string}[]}
            value={charaListItem.chara.data.extensions.level}
            onChange={(e: any) => {
              setCharaListItem(e.target.value)
            }}
          />
        </div> 
      </div>
    </div>
  );
}

export default CreatorInfo_Level;
