"use client";
import React, { useState } from "react";
import { Link, useRouter } from "@/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useAmDispatch } from "../components/AlterMessageContextProvider";
import VoiceModelListHeader from "./VoiceModelListHeader";
import VoiceModelList from "../components/voice-model-list/VoiceModelList";

function VoiceAsse() {
  const router = useRouter();
  const t = useTranslations();
  const amDispatch = useAmDispatch();

  return (
    <div className="w-full h-screen pt-14 overflow-hidden bg-neutral-900 rounded-bl-xl rounded-br-xl justify-start items-end inline-flex">
      <div className="w-full self-stretch justify-start items-start flex h-screen">
        <div className="fixed top-14 left-0 w-full z-40">
          <VoiceModelListHeader />
        </div>
        <div className="self-stretch pt-[170px] overflow-hidden w-full">
          <VoiceModelList />
        </div>
      </div>
  </div>
  );
}

export default VoiceAsse;
