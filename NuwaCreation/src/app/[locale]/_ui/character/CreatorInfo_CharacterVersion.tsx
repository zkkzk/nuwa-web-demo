"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useCharaListItem, useCharaListItemDispatch } from "../charas/CharaContext";
import NuwaInput from "../components/NuwaInput";

function CreatorInfo_CharacterVersion() {
  const t = useTranslations();
 
  const charaListItem = useCharaListItem();
  const charaListItemDispatch = useCharaListItemDispatch();
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

  return (
    <NuwaInput
      label={t('Character.characterversion')}
      placeholder={t('Character.characterversion')}
      value={charaListItem.chara.data.character_version}
      onChange={(e: { target: { value: string; }; }) => setCharacterVersion(e.target.value)}
      maxLength={64}
    />
  );
}

export default CreatorInfo_CharacterVersion;
