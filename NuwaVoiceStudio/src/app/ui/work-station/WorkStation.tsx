"use client";
import React, { useState } from "react";
import { Link, useRouter } from "@/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useAmDispatch } from "../components/alter-message/AlterMessageContextProvider";
import MainStation from "./MainStation";
import VoiceHistory from "../components/voice-inf-history/VoiceHistory";

function WorkStation() {
  const router = useRouter();
  const t = useTranslations();
  const amDispatch = useAmDispatch();

  const [voiceHistoryKey, setVoiceHistoryKey] = useState(0);

  return (
    <div className="w-full h-screen pt-20 overflow-hidden bg-neutral-900 rounded-bl-xl rounded-br-xl justify-start items-end inline-flex">
      <div className="w-full self-stretch justify-start items-start flex h-screen">
        <MainStation onInfSuccess={() => setVoiceHistoryKey((prev) => prev + 1)} />
        <VoiceHistory key={voiceHistoryKey} />
      </div>
  </div>
  );
}

export default WorkStation;
