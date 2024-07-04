"use client";
import React, { useState } from "react";
import VoicePreview from "./VoicePreview";
import { Checkbox, cn, Input, Select, SelectItem } from "@nextui-org/react";
import { toneListEn, TypeTone } from "@/app/lib/definitions.tone";
import { TrashIcon } from "@heroicons/react/24/outline";


function TrainVoiceFilePreview({
  voiceSrc,
  onTrashClick,
}: {
  voiceSrc: string
  onTrashClick?: () => void
}) {

  return (
    <div className="w-full h-[88px] p-4 bg-zinc-800 rounded-xl justify-start items-center gap-4 inline-flex">
      <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
        <div className="self-stretch p-3 bg-neutral-900 rounded-xl justify-start items-center gap-6 inline-flex">
          <VoicePreview voiceSrc={voiceSrc} hideTimeline={true} classNames={{playButton: 'h-10 w-10'}} />
        </div>
      </div>
      <div className="flex items-center h-full cursor-pointer flex-col gap-4 justify-center">
        <TrashIcon className="w-5 h-5 fill-zinc-500"  onClick={onTrashClick}/>
      </div>
    </div>

    // <div className="w-[804px] h-[88px] p-4 bg-zinc-800 rounded-xl justify-start items-center gap-4 inline-flex">
    // <div className="grow shrink basis-0 self-stretch flex-col justify-start items-start gap-3 inline-flex">
    //     <div className="self-stretch p-3 bg-neutral-900 rounded-xl justify-start items-center gap-6 inline-flex">
    //         <div className="grow shrink basis-0 self-stretch justify-start items-center gap-3 flex">
    //             <div className="w-8 h-8 p-1.5 bg-white rounded-[40px] shadow justify-center items-center flex">
    //                 <div className="w-5 h-5 relative flex-col justify-start items-start flex" />
    //             </div>
    //         </div>
    //     </div>
    // </div>
    // <div className="p-0.5 rounded-[28px] justify-center items-center gap-2 flex">
    //     <div className="w-5 h-5 relative" />
    // </div>
    // </div>
  );
}

export default TrainVoiceFilePreview;
