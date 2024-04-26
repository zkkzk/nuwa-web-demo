"use client";
import React from "react";
import Preview_AddTags from './Preview_AddTags';
import Image from "next/image";
import { useTranslations } from "next-intl";
import { TypeCharaListItem } from "../../_lib/definitions";

function Preview_BaseInfo({charaItem}: {charaItem: TypeCharaListItem}) {
  const t = useTranslations();

  const { chara, cover } = charaItem
  
  return (
    <div>   
      <div className="grid grid-cols-3 gap-20">
        <div className="col-span-1 gap-x-8">
          <Image
            src={cover}
            width={200}
            height={340}
            alt=""
            className="h-full w-full flex-none rounded-[40px] object-cover"
          />
        </div>
        <div
          className="col-span-2 flex flex-col"
        >
          <div className="text-black text-[100px] font-semibold leading-[120px] tracking-wide">{chara.data.name}</div>
          <div className="mb-20 w-full mt-10 text-neutral-950 text-base font-normal leading-[29px] tracking-tight">{chara.data.description}</div>
          <Preview_AddTags />
        </div>

      </div>
    </div>
  );
}

export default Preview_BaseInfo;
