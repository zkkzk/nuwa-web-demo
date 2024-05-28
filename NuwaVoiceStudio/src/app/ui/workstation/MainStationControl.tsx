"use client";
import React, { useState } from "react";
import { Link, useRouter } from "@/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useAmDispatch } from "../components/AlterMessageContextProvider";
import VoiceModelList from "./VoiceModelList";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import NuwaButton from "../components/NuwaButton";
import FlashIcon from "@/app/icons/FlashIcon";
import { TypeTone } from "@/app/lib/definitions.tone";
import { UserIcon } from "@heroicons/react/24/outline";
import NuwaInput from "../components/NuwaInput";
import MainStationControlParameters from "./MainStationControlParameters";
import NuwaSelect, { NuwaSelectItem } from "../components/NuwaSelect";

function MainStationControl() {
  const router = useRouter();
  const t = useTranslations();
  const amDispatch = useAmDispatch();

  const toneList:Array<TypeTone> = [{
    value: "1",
    name: "1",
  }, {
    value: "2",
    name: "2",
  }, {
    value: "3",
    name: "3",
  }, {
    value: "4",
    name: "5",
  }]

  return (
    <div className="flex-col justify-end items-center flex bottom-0 w-full">
      <MainStationControlParameters />
      <div className="self-stretch h-[188px] p-8 bg-neutral-900 shadow border-t border-neutral-800 flex-col justify-start items-start gap-5 flex">
        <NuwaInput type="text" variant="bordered" placeholder="Type context you want to convert here."

        />
        <div className="self-stretch justify-between items-start inline-flex">
          <NuwaSelect
            items={toneList}
            variant="bordered"
            size="sm"
            className="w-[180px]"
            startContent={<div className="text-gray-500 text-sm font-semibold font-['Inter'] leading-normal"><p>Tones | </p></div>}
          >
            {toneList.map((tone) => (
                <NuwaSelectItem
                  key={tone.value}
                  value={tone.value}
                  startContent={<UserIcon className="h-4 w-4"/>}
                >
                  {tone.name}
                </NuwaSelectItem>
            ))}
          </NuwaSelect>
          <div className="justify-start items-start gap-3 flex">
            <NuwaButton
              color="indigo"
              size="lg"
              endContent={
                <div className="h-6 pl-1 pr-2 py-0.5 bg-green-500 rounded-md justify-center items-center gap-1 flex">
                  <FlashIcon className="w-4 h-4 fill-neutral-900 stroke-neutral-900 relative" />
                  
                  <div className="text-center text-neutral-900 text-xs font-semibold font-['Inter']">
                    X 4
                  </div>
                </div>
              }
            >Instant Generate</NuwaButton>
            <NuwaButton
              color="default"
              size="lg"
            >Generate API Address</NuwaButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainStationControl;
