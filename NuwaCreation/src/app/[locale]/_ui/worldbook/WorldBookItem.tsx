"use client"

import React from "react";
import { useTranslations } from "next-intl";
import { TypeWorldBook } from "../../_lib/definitions";
import Image from "next/image";

export default function WorldBookItem({worldBookItem}: {worldBookItem: TypeWorldBook}) {
  const t = useTranslations();

  return (
    <>
      <div key={worldBookItem.name} className="relative group bg-white w-auto h-full shadow-black/25 py-8 px-5 rounded-[20px] border hover:border-2 hover:border-black border-neutral-700 border-opacity-30 hover:scale-105 overflow-hidden">
        <div className="w-full h-full absolute top-0 hidden group-hover:block left-0 bg-gray-300/30" />
        <div className="flex flex-row border-b border-solid border-neutral-700 h-12 items-center">
          <Image
            className="m-2 rotate-[21deg]"
            width={32}
            height={35}
            src="/overview-create-worldbook-bg2.png"
            alt=""
          />
          <div className="text-black font-semibold text-2xl line-clamp-1">{worldBookItem.name}</div>
        </div>
        <div className="pt-14 pb-4 h-full overflow-y-scroll w-auto text-neutral-700 break-words">
        {Object.keys(worldBookItem?.entries).map((key) => (
          <p key={`${worldBookItem.name}-entries${key}`}>{worldBookItem.entries[key].comment}</p>
        ))}
        </div>
      </div>
    </>
  );
}
