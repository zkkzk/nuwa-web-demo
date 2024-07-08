"use client";
import React, { useState } from "react";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import VoiceHistoryControl from "./VoiceHistoryControl";
import VoiceHistoryList from "./VoiceHistoryList";
import { Card, Skeleton } from "@nextui-org/react";
import { VoiceInfHistoryType } from "@/app/lib/definitions.voice";

function VoiceHistory() {
  const router = useRouter();
  const t = useTranslations();
  const [selected, setSelected] = useState("Voices");
  const [voiceList, setVoiceList] = useState<VoiceInfHistoryType[] | null>(null);
  const [infType, setInfType] = useState<'audio' | 'code'>("audio");

  return (
    <div className=" overflow-y-scroll h-auto w-[380px] self-stretch px-8 pt-8 rounded-br-[20px] flex-col justify-start items-start gap-5 inline-flex">
      <div className="fixed top-20 right-0 w-[380px] z-40">
        <div className="px-8 pt-8 bg-neutral-900">
          {voiceList !== null && voiceList.length > 0 && (
            <VoiceHistoryControl type={infType} onChange={(setInfType)} />
          )}
          {voiceList === null && (
            <div className="w-full gap-5 flex flex-col">
              <div className="flex flex-row justify-between items-center w-full">
                <Skeleton className="rounded-lg">
                <div className="h-8 w-24"></div>
                </Skeleton>
                {/* <Skeleton className="rounded-lg">
                  <div className="h-8 w-24"></div>
                </Skeleton> */}
              </div>
              <div>
                <Skeleton className="w-full h-8 rounded-lg">
                  <div className="h-8 w-full rounded-lg bg-secondary"></div>
                </Skeleton>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="self-stretch pt-[98px] pb-[100px] overflow-hidden">
			  <VoiceHistoryList key={infType} type={infType} onChange={(newVoiceList) => setVoiceList(newVoiceList)} />
      </div>
    </div>
  );
}

export default VoiceHistory;
