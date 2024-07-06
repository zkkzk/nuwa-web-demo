"use client";
import React from "react";
import Image from "next/image";
import ToneVoicePreview from "../components/voice-preview/ToneVoicePreview";
import { voicePublishInfoType } from "@/app/lib/definitions.InstantGenerateParamster";

function VoiceAssetDetailLeft({
  voicePublishInfo, 
}: {
  voicePublishInfo: voicePublishInfoType
}) {
  return (
    <div className="w-full flex-col justify-start items-start gap-8 flex">
      <div className="shrink-0 self-stretch justify-start items-start gap-6 flex flex-row">
        <div className="shrink-0 w-[200px] h-[200px] rounded-xl relative">
          <Image
            fill={true}
            alt={voicePublishInfo.publish_info.cover_url}
            className=" grow shrink basis-0 self-stretch rounded-xl flex-none object-cover"
            src={voicePublishInfo.publish_info.cover_url}
          />
        </div>
        <div className=" grow text-white text-sm font-normal font-['Inter'] leading-tight text-wrap">
          {voicePublishInfo.publish_info.desc}
        </div>
      </div>

      <div className="self-stretch flex-col justify-start items-start gap-6 flex">
        <div className="self-stretch justify-start items-center gap-2.5 inline-flex">
          <div className="text-white text-xl font-semibold font-['Inter'] leading-7">
            Tones Preview
          </div>
        </div>
        <div className="self-stretch flex-col justify-start items-start gap-4 flex">
          {voicePublishInfo.tone.map((toneItem, index) => (
            <ToneVoicePreview key={index} tone={toneItem} />
          ))}
          
        </div>
      </div>
    </div>
  );
}

export default VoiceAssetDetailLeft;
