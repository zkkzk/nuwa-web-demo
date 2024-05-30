"use client";
import React from "react";
import VoiceAssetDetailHeader from "./VoiceModelDetailHeader";
import VoiceAssetDetailLeft from "./VoiceModelDetailLeft";
import VoiceAssetDetailRight from "./VoiceModelDetailRight";

function VoiceAssetDetail() {

  return (
    <div className="w-full h-[1048px] pt-6 bg-black/opacity-30 rounded-2xl flex-col justify-start items-end gap-2.5 inline-flex">
    <div className="px-4 flex-col justify-start items-end gap-2.5 flex">
        <div className="w-6 h-6 relative" />
    </div>
    <div className="self-stretch pb-16 bg-zinc-900 rounded-tl-2xl rounded-tr-2xl rounded-bl-xl rounded-br-xl flex-col justify-start items-center gap-2.5 flex">
        <div className="w-full pt-16 pb-6 flex-col justify-end items-start gap-8 flex">
          <div className="w-full">
            <VoiceAssetDetailHeader />
          </div>
          <div className="justify-between items-start gap-12 flex">
            <div className="grow-1 shrink-1 overflow-hidden">
              <VoiceAssetDetailLeft />
            </div>
            <div className="shrink">
              <VoiceAssetDetailRight />
            </div>
          </div>
        </div>
    </div>
</div>
  );
}

export default VoiceAssetDetail;
