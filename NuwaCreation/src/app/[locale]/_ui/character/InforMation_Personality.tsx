"use client";
import React from "react";
import { useChara } from "../../_lib/utils";
import { useTranslations } from "next-intl";
import { useDisclosure } from "@nextui-org/react";

import InforMation_Personality_Modal from "./InforMation_Personality_Modal";
import { useCharaListItem, useCharaListItemDispatch } from "../charas/CharaContext";

function InforMation_Personality() {
  const t = useTranslations();
  
  const charaListItem = useCharaListItem();
  const charaListItemDispatch = useCharaListItemDispatch();

 
  const handlePersonalityChange = (e:any) => {
    const newValue = e.target.value;
    setPersonalityNewValue(newValue);
  };
  const setPersonalityNewValue = (newValue:any) => {
    charaListItemDispatch({
      type: "changed",
      payload: {
        ...charaListItem,
        chara: {
          ...charaListItem.chara,
          data: {
            ...charaListItem.chara.data,
            personality: newValue,
          }
        }
      },
    })
  }

  return (
    <div className="h-6/12 py-4 flex flex-col">
      <label
        className="block text-lg font-medium leading-8 mb-1"
      >
        {t('Character.personalitysummary')}
      </label>
      <div className="flex flex-row mt-2 grow">  
        <div className="mr-4 grow">
          <textarea
            placeholder="First Message"
            value={charaListItem.chara.data.personality}
            onChange={handlePersonalityChange}
            className="border-none outline-none w-full h-full resize-none mb-6"
          />
        </div>
        <div>

        </div>
        <InforMation_Personality_Modal setPersonalityNewValue={setPersonalityNewValue} oldPersonalityValue={charaListItem.chara.data.personality}/>
      </div>
    </div>
  );
}

export default InforMation_Personality;
