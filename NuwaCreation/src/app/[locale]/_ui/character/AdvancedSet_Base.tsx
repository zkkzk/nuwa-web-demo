"use client";
import React from "react";;
import { useTranslations } from "next-intl";
import { useCharaListItem, useCharaListItemDispatch } from "../charas/CharaContext";

function AdvancedSet_Base() {
  const t = useTranslations();
 
  const charaListItem = useCharaListItem();
  const charaListItemDispatch = useCharaListItemDispatch();
  const setNewDepthListItem = (newValue: string) => {
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
              depth_prompt: {
                ...charaListItem.chara.data.extensions.depth_prompt,
                depth: newValue,
              },
            }
          }
        }
      },
    })
  }
  const setpost_history_instructionsListItem = (newValue: string) => {
    charaListItemDispatch({
      type: "changed",
      payload: {
        ...charaListItem,
        chara: {
          ...charaListItem.chara,
          data: {
            ...charaListItem.chara.data,
            post_history_instructions: newValue
          }
        }
      },
    })
  }
  const setsystem_promptListItem = (newValue: string) => {
    charaListItemDispatch({
      type: "changed",
      payload: {
        ...charaListItem,
        chara: {
          ...charaListItem.chara,
          data: {
            ...charaListItem.chara.data,
            system_prompt: newValue,
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
          {t('Character.depthprompt')}
        </label>
        <div className="">  
          <input
            placeholder={`${t('Character.depthprompt')}`}
            value={charaListItem.chara.data.extensions.depth_prompt.depth}
            onChange={(e) => {
              let newDepth = e.target.value;
                              
              if (parseInt(newDepth) < 0) {
                newDepth = '0'
              } else if (parseInt(newDepth) > 999) {
                newDepth = '999'
              }

              setNewDepthListItem(newDepth)
            }}
            max="999"
            min="0"
            type="number"
            className="text-neutral-950 text-base font-normal tracking-tight border-none outline-none w-full resize-none bg-transparent"
          />
        </div> 
      </div>
      <div className=" absolute top-32 h-48 w-full rounded-[40px] bg-zinc-100 z-10"></div>
      <div className="flex flex-col h-auto w-full py-7 px-7 rounded-[40px] bg-zinc-100 z-20">
        <label
          className="text-neutral-950 text-lg font-semibold leading-loose tracking-tight"
        >
          {t('Character.mainprompt')}
        </label>
        <div className="">  
          <input
            placeholder={`${t('Character.mainprompt')}`}
            value={charaListItem.chara.data.system_prompt}
            onChange={(e) => setsystem_promptListItem(e.target.value)}
            className="text-neutral-950 text-base font-normal tracking-tight border-none outline-none w-full resize-none bg-transparent"
          />
        </div> 
      </div>
      <div className=" absolute top-64 h-48 w-full rounded-[40px] bg-stone-300 z-20"></div>
      <div className="z-20 grow flex flex-col w-full py-7 px-7 rounded-[40px] bg-stone-300 bg-[url('/character-creatorinfo-bg.png')] bg-no-repeat bg-[bottom_1rem_right_3rem]">
        <label
          className="text-neutral-950 text-lg font-semibold leading-loose tracking-tight"
        >
          {t('Character.jailbreak')}
        </label>
        <div className="h-full">  
          <input
            placeholder={`${t('Character.jailbreak')}`}
            value={charaListItem.chara.data.post_history_instructions}
            onChange={(e) => setpost_history_instructionsListItem(e.target.value)}
            maxLength={64}
            className="text-neutral-950 text-base font-normal tracking-tight border-none outline-none w-full resize-none bg-transparent"
          />
        </div>
      </div>
    </div>
  );
}

export default AdvancedSet_Base;
