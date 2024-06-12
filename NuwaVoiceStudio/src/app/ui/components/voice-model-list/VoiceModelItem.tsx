"use client";
import React, { useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { Avatar, cn } from "@nextui-org/react";
import CommercialStarIcon from "@/app/icons/CommercialStarIcon";
import numbro from "numbro";
import PlayButton from "../PlayButton";
import ExportIcon from "@/app/icons/ExportIcon";
import DownloadIcon from "@/app/icons/DownloadIcon";
import { BeakerIcon } from "@heroicons/react/24/outline";

function VocieItem({voice, isSelected = false}: {
  voice: any,
  isSelected: boolean,
}) {
  const [isPlay, setIsPlay] = useState(false);

  return (
    <div className="group/item" key={voice.id}>
      <div
        className={cn(
          isSelected
            ? 'border-primary'
            : 'group-hover/item:border-primary border-transparent',
          " cursor-pointer basis-0 group shrink bg-neutral-900 rounded-xl shadow-inner border-2 flex-col justify-start items-start inline-flext"
        )}
      >
        <div className="relative">
          <Image alt="" width={160} height={90} className="w-full grow shrink basis-0 self-stretch rounded-xl" src={voice.src} />
          <div className="absolute right-4 -bottom-4">
            <PlayButton onChange={(play: boolean) => {
              setIsPlay(false);
            }} />
          </div>
        </div>
        
        <div className="w-full px-4 py-3 flex-col justify-start items-start gap-2 inline-flex">
          <div className="h-7 justify-start items-center gap-2.5 inline-flex">
            <div className="text-white text-lg font-semibold font-['Inter'] leading-7">{voice.name}</div>
            <CommercialStarIcon className="w-5 h-5" />
          </div>
          <div className="self-stretch justify-between items-center inline-flex">
            <div className="justify-center items-center gap-1.5 flex">
              <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" size="sm" />
              <div className="text-zinc-400 text-xs font-normal font-['Inter'] leading-none">
                SoulCurry
              </div>
            </div>

            <div className="justify-end items-center gap-2 flex">
              <div className="justify-end items-center gap-0.5 flex">
                <StarIcon className={`w-4 h-4 ${voice.star ? 'fill-amber-500' : 'fill-zinc-400'}`} />
                <div className="text-white text-xs font-normal font-['Inter'] leading-none">
                  {numbro(voice.count).format({average: true,
                    mantissa: 2,
                    optionalMantissa: true,
                    spaceSeparated: true})}
                </div>
              </div>
              <div className="justify-end items-center gap-0.5 flex">
                <DownloadIcon className="w-4 h-4" />
                <div className="text-white text-xs font-normal font-['Inter'] leading-none">3.5K</div>
              </div>
              <div className="justify-start items-center gap-0.5 flex">
                <BeakerIcon className="w-4 h-4 relative" />
                <div className="text-white text-xs font-normal font-['Inter'] leading-none">300</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VocieItem;
