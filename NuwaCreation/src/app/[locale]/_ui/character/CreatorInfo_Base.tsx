"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useCharaListItem, useCharaListItemDispatch } from "../charas/CharaContext";

function CreatorInfo_Base() {
  const t = useTranslations();
 
  const charaListItem = useCharaListItem();
  const charaListItemDispatch = useCharaListItemDispatch();
  const setCreator = (newValue: string) => {
    charaListItemDispatch({
      type: "changed",
      payload: {
        ...charaListItem,
        chara: {
          ...charaListItem.chara,
          data: {
            ...charaListItem.chara.data,
            creator: newValue
          }
        }
      },
    })
  }
  const setCharacterVersion = (newValue: string) => {
    charaListItemDispatch({
      type: "changed",
      payload: {
        ...charaListItem,
        chara: {
          ...charaListItem.chara,
          data: {
            ...charaListItem.chara.data,
            character_version: newValue
          }
        }
      },
    })
  }
  const setCreatorNotes = (newValue: string) => {
    charaListItemDispatch({
      type: "changed",
      payload: {
        ...charaListItem,
        chara: {
          ...charaListItem.chara,
          data: {
            ...charaListItem.chara.data,
            creator_notes: newValue
          }
        }
      },
    })
  }

  return (
    <div className="bg-white h-full w-full rounded-[40px] relative flex flex-col">
      <div className="flex flex-col h-auto w-full py-7 px-7 rounded-[40px]">
        <label
          className="text-neutral-950 text-lg font-semibold leading-loose tracking-tight"
        >
          {t('Character.createdby')}
        </label>
        <div className="">  
          <input
            placeholder={`${t('Character.createdby')}`}
            value={charaListItem.chara.data.creator}
            onChange={(e) => setCreator(e.target.value)}
            maxLength={64}
            className="text-neutral-950 text-base font-normal tracking-tight border-none outline-none w-full resize-none bg-transparent"
          />
        </div> 
      </div>
      <div className=" absolute top-32 h-48 w-full rounded-[40px] bg-zinc-100 z-10"></div>
      <div className="flex flex-col h-auto w-full py-7 px-7 rounded-[40px] bg-zinc-100 z-20">
        <label
          className="text-neutral-950 text-lg font-semibold leading-loose tracking-tight"
        >
          {t('Character.characterversion')}
        </label>
        <div className="">  
          <input
            placeholder={`${t('Character.characterversion')}`}
            value={charaListItem.chara.data.character_version}
            onChange={(e) => setCharacterVersion(e.target.value)}
            maxLength={64}
            className="text-neutral-950 text-base font-normal tracking-tight border-none outline-none w-full resize-none bg-transparent"
          />
        </div> 
      </div>
      <div className="z-20 grow flex flex-col w-full py-7 px-7 rounded-[40px] bg-stone-300 bg-[url('/character-creatorinfo-bg.png')] bg-no-repeat bg-[bottom_1rem_right_3rem]">
        <label
          className="text-neutral-950 text-lg font-semibold leading-loose tracking-tight"
        >
          {t('Character.creatorsnotes')}
        </label>
        <div className="h-full">  
          <textarea
            placeholder={`${t('Character.creatorsnotes')}`}
            value={charaListItem.chara.data.creator_notes}
            onChange={(e) => setCreatorNotes(e.target.value)}
            className="text-neutral-950 text-base font-normal leading-[28.99px] tracking-tight border-none outline-none w-full h-full resize-none mb-6 bg-transparent"
          />
        </div> 
      </div>
    </div>
  );
}

export default CreatorInfo_Base;
