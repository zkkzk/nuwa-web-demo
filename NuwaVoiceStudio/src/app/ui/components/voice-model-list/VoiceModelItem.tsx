"use client";
import React, { useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { Avatar, Button, cn, Tooltip } from "@nextui-org/react";
import CommercialStarIcon from "@/app/icons/CommercialStarIcon";
import numbro from "numbro";
import PlayButton from "../voice-preview/PlayButton";
import DownloadIcon from "@/app/icons/DownloadIcon";
import { BeakerIcon } from "@heroicons/react/24/outline";
import GPTSovitsIcon from "@/app/icons/GPTSovitsIcon";
import { TypeVoiceModel } from "@/app/lib/definitions.voice";

function VocieItem({
  voice,
  isSelected = false,
  onItemClick
}: {
  voice: any,
  isSelected: boolean,
  onItemClick?: (voiceModel: TypeVoiceModel) => void;
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
          <div className="w-full pb-[44%] rounded-xl">
            <Image
              fill={true}
              alt={voice.publish_info.cover_url}
              className=" grow shrink basis-0 self-stretch rounded-xl flex-none object-cover"
              src={voice.publish_info.cover_url}
              onClick={() => {
                onItemClick && onItemClick(voice);
              }}
            />
          </div>
          <div className="justify-start items-center gap-1 inline-flex absolute top-4 left-4">
            <GPTSovitsIcon className="w-5 h-5 fill-blue-500" />
            <div className="text-white text-xs font-normal font-['Inter'] leading-none">GPT-Sovits</div>
          </div>
          <div className="absolute right-4 -bottom-4" 
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
            <PlayButton
              isPlay={isPlay}
              voiceSrc={voice.tone[0].audio_url}
              onChange={(play: boolean) => {
                setIsPlay(play);
              }}
            />
          </div>
        </div>
        
        <div className="w-full px-4 py-3 flex-col justify-start items-start gap-2 inline-flex">
          <div className="h-7 justify-start items-center inline-flex">
            <div className="text-white text-lg font-semibold font-['Inter'] leading-7">{voice.publish_info.name}</div>
            {voice.publish_info.permission.commercial_license && (
              <Tooltip color="warning" showArrow={true} size="lg" content="Commercial">
                <Button
                  isIconOnly
                  color="default" 
                  variant="light"
                  className="data-[hover=true]:bg-transparent"
                >
                  <CommercialStarIcon className="w-5 h-5" />
                </Button>
              </Tooltip>
            )}
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
                  {numbro(voice.star_num).format({average: true,
                    mantissa: 2,
                    optionalMantissa: true,
                    spaceSeparated: true})}
                </div>
              </div>
              <div className="justify-end items-center gap-0.5 flex">
                <DownloadIcon className="w-4 h-4" />
                <div className="text-white text-xs font-normal font-['Inter'] leading-none">
                  {numbro(voice.d_num).format({average: true,
                    mantissa: 2,
                    optionalMantissa: true,
                    spaceSeparated: true})}
                </div>
              </div>
              <div className="justify-start items-center gap-0.5 flex">
                <BeakerIcon className="w-4 h-4 relative" />
                <div className="text-white text-xs font-normal font-['Inter'] leading-none">
                  {numbro(voice.inf_num).format({average: true,
                    mantissa: 2,
                    optionalMantissa: true,
                    spaceSeparated: true})}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VocieItem;
