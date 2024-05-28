"use client";
import React, { useState } from "react";
import { Link, useRouter } from "@/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useAmDispatch } from "../components/AlterMessageContextProvider";
import { classNames } from "@/app/lib/utils";
import { PlayIcon } from "@heroicons/react/24/outline";
import { StarIcon, PauseIcon } from "@heroicons/react/24/solid";
import { Avatar } from "@nextui-org/react";
import CommercialStarIcon from "@/app/icons/CommercialStarIcon";
import numbro from "numbro";

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
          <div className="absolute left-2 top-2 w-28 h-12 px-3 py-4 justify-start items-center gap-1 inline-flex">
            <CommercialStarIcon className="w-4 h-4" />
            <div className="text-white text-xs font-normal font-['Inter'] leading-none">Commercial</div>
          </div>
          <div className="absolute right-2 top-2 z-30 w-8 h-8 p-2 bg-black/opacity-30 rounded-[32px] justify-center items-center gap-2 inline-flex">
            <StarIcon className={`w-4 h-4 ${voice.star ? 'fill-amber-500' : 'fill-zinc-400'}`} />
          </div>
          <div className="cursor-pointer bg-white rounded-full flex items-center justify-center h-8 w-8 absolute right-4 -bottom-4">
            {isPlay 
              ? <PauseIcon className="h-5 w-5 fill-black stroke-black stroke-1" onClick={() => {
                setIsPlay(false);
              }} />
              : <PlayIcon className="h-5 w-5 fill-black stroke-black ml-0.5" onClick={() => {
                setIsPlay(true);
              }} />
            }
          </div>
        </div>
        
        <div className="w-full px-4 py-3 flex-col justify-start items-start gap-2 inline-flex">
          <div className="text-white text-lg font-semibold font-['Inter'] leading-7">{voice.name}</div>
          <div className="self-stretch justify-between items-center inline-flex">
            <div className="justify-center items-center gap-1.5 flex">
              <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" size="sm" />
              <div className="text-zinc-400 text-xs font-normal font-['Inter'] leading-none">SoulCurry</div>
            </div>
            <div className="justify-start items-center gap-1 flex">
              <div className="text-zinc-400 text-xs font-normal font-['Inter'] leading-none">Run</div>
              <div className="text-white text-xs font-normal font-['Inter'] leading-none">
                {numbro(voice.count).format({average: true,
                  mantissa: 2,
                  optionalMantissa: true,
                  spaceSeparated: true})}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VocieItem;
