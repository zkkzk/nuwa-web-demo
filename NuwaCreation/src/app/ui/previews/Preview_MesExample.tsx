"use client";
import React from "react";
import { useTranslations } from "next-intl";

import PreviewTitle from "./PreviewTitle";
import { useCharaListItem } from "@/app/contexts/CharasContextProvider";

function Preview_MesExample() {
  const t = useTranslations();
  const charaListItem = useCharaListItem();
  const { chara } = charaListItem;
  let initNewMesExampleList = chara.data.mes_example.split('<START>');
  initNewMesExampleList = initNewMesExampleList.filter((_, index: number) => {
    return index !== 0;
  })
  
  const [mesExampleList, setMesExampleList] = React.useState(initNewMesExampleList);

  return (
    <div>   
      <PreviewTitle>{t('Character.mesexample')}</PreviewTitle>
      <div className="grid grid-flex-row gap-4 w-full">

      {mesExampleList.map((item, index) =>{
        return (
        <div className="flex flex-row gap-4 mt-4" key={index}>
          <div
            className=" p-16 flex flex-col cursor-pointer text-xl bg-black rounded-[40px] w-full min-h-[210px] bg-no-repeat bg-right-bottom bg-cover bg-[url('/character-mesExample-list-item-bg.png')]"
          >
            <div
              className="border-none outline-none w-full h-full resize-none mb-6 bg-transparent text-white"
            >{item}</div>
          </div>
        </div>
      )})}
      </div>
    </div>
  );
}

export default Preview_MesExample;
