"use client";
import React, { useState } from "react";
import { Link, useRouter } from "@/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useAmDispatch } from "../components/AlterMessageContextProvider";
import { classNames } from "@/app/lib/utils";
import { PlayCircleIcon, PlayIcon, PauseIcon } from "@heroicons/react/24/outline";

function VocieItem({voice, isSelected = false}: {
  voice: any,
  isSelected: boolean,
}) {
  const router = useRouter();
  const t = useTranslations();
  const amDispatch = useAmDispatch();

  const [isPlay, setIsPlay] = useState(false);


  return (
    <div className="group/item" key={voice.id}>
      <div
        className={classNames(
          isSelected
            ? 'border-primary'
            : 'group-hover/item:border-primary border-transparent',
          " cursor-pointer basis-0 group shrink bg-neutral-900 rounded-xl shadow-inner border-2 flex-col justify-start items-start inline-flext"
        )}
      >
        <div className="relative">
          <Image alt="" width={160} height={90} className="w-full grow shrink basis-0 self-stretch rounded-xl" src={voice.src} />
          <div className="bg-white rounded-full flex items-center justify-center h-8 w-8 absolute right-4 -bottom-4">
            {isPlay 
              ? <PauseIcon className="h-5 w-5 fill-black stroke-black stroke-2" onClick={() => {
                  setIsPlay(false);
                }} />
              : <PlayIcon className="h-5 w-5 fill-black stroke-black ml-0.5" onClick={() => {
                  setIsPlay(true);
                }} />
              }
          </div>
          
        </div>
        
        <div className="self-stretch p-3 flex-col justify-start items-start gap-1.5 flex">
          <div className="text-white text-base font-bold font-['Inter'] leading-normal">{voice.name}</div>
          <div className="self-stretch justify-start items-start gap-2.5 inline-flex">
            <div className="justify-start items-center gap-1 flex">
              <div className="text-gray-500 text-xs font-medium font-['Inter']">Run</div>
              <div className="text-white text-xs font-medium font-['Inter']">{voice.count}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VocieItem;
