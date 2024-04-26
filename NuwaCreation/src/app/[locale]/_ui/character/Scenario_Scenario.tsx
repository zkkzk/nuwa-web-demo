"use client";
import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import InsertUserOrChar from "../components/InsertUserOrChar";
import { useCharaListItem, useCharaListItemDispatch } from "../charas/CharaContext";
import { Textarea } from "@nextui-org/react";
import { textareaProps } from "../components/NuwaTextarea";

function Scenario_Scenario() {
  const t = useTranslations();
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
    <div className="relative group">
      <Textarea
        {...textareaProps as any}
        label={<div>{t('Character.scenario')}</div>}
        ref={descTextareaRef}
        placeholder={`${t('Character.scenario')}`}
        value={charaListItem.chara.data.scenario}
        onChange={(e) => (handleScenarioChange(e.target.value))}
      />
      <div className="z-40 hidden group-hover:block absolute -top-16 right-0 pl-4 sm:top-auto sm:-right-44 sm:bottom-0 sm:pt-20">
          <InsertUserOrChar getTextRef={() => {
            return descTextareaRef.current
          }} onDone={(newValue) => {
            handleScenarioChange(newValue);
          }} />
      </div>
    </div>
  );
}

export default Scenario_Scenario;
