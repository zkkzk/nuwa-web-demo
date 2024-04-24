"use client";
import React, { useContext, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useCharaListItem, useCharaListItemDispatch } from "../charas/CharaContext";
import { TypeCharaListItem } from "../../_lib/definitions";

function InforMation_Name() {
  const t = useTranslations();

  const charaListItem = useCharaListItem();
  const charaDispatch = useCharaListItemDispatch();
  
  const handleNameChange = (e:any) => {
    const newValue = e.target.value;
    const newChara:TypeCharaListItem = {
      ...charaListItem,
      chara: {
        ...charaListItem.chara,
        name: newValue,
        data: {
          ...charaListItem.chara.data,
          name: newValue
        }
      }
    };

    charaDispatch({
      type: "changed",
      payload: newChara,
    })
  };

  return (
    <div className="flex flex-col justify-center bg-[#313131] rounded-[40px] h-[150px] p-7 bg-[url('/create-digitallife-name-bg.png')] bg-no-repeat bg-[center_right_1rem]">
      <label
        className="block text-3xl text-white"
      >
        {t('Character.charactername')}<span className="text-white">*</span>
      </label>
      <div className="mt-2">
        <input
          className="text-3xl text-right text-white bg-transparent border-none outline-none w-full"
          placeholder="请输入"
          value={charaListItem.chara.data.name}
          onChange={handleNameChange}
        />
      </div>
    </div>
  );
}

export default InforMation_Name;
