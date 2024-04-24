"use client";
import React, { useRef } from "react";
import { useChara } from "../../_lib/utils";
import { useTranslations } from "next-intl";
import InsertUserOrChar from "../components/InsertUserOrChar";
import { useCharaListItem, useCharaListItemDispatch } from "../charas/CharaContext";

function Scenario_Scenario() {
  const t = useTranslations();
  const { chara , setChara } = useChara();
  const descTextareaRef = useRef(null);
  
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
            scenario: newValue,
          }
        }
      },
    })
  }

  const handleScenarioChange = (newValue:string) => {
    setCharaListItem(newValue);
  };
 

  return (
    <div className="bg-[#333333] h-full w-full rounded-[40px] bg-[url('/character-scenario-bg1.png')] bg-no-repeat">
      <div className="flex flex-col h-full w-full py-12 px-7  rounded-[40px] bg-[url('/character-scenario-bg2.png')] bg-no-repeat bg-[bottom_right_-6rem]">
        <label
          className="text-white text-lg font-medium leading-8 mb-1"
        >
          {t('Character.scenario')}
        </label>
        <div className="flex flex-col items-end mt-10 grow">  
            <textarea
              ref={descTextareaRef}
              placeholder={`${t('Character.scenario')}`}
              value={charaListItem.chara.data.scenario}
              onChange={(e) => (handleScenarioChange(e.target.value))}
              className="grow text-white border-none outline-none w-full h-full resize-none mb-6 bg-transparent break-all"
            />
          <div className="shrink-0">
            <InsertUserOrChar getTextRef={() => {
              return descTextareaRef.current
            }} onDone={(newValue) => {
              handleScenarioChange(newValue);
            }} />
          </div>
        </div> 
      </div>    
    </div>
  );
}

export default Scenario_Scenario;
