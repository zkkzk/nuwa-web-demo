"use client";
import React, { useState } from "react";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { useAmDispatch } from "../components/alter-message/AlterMessageContextProvider";
import MainStationControl from "./MainStationControl";
import VoiceModelListHeader from "./VoiceModelListHeader";
import VoiceModelList from "../components/voice-model-list/VoiceModelList";
import { TypeVoiceModel } from "@/app/lib/definitions.voice";
import { voiceModelFilterType } from "@/app/lib/definitions.InstantGenerateParamster";

function MainStation() {
  const router = useRouter();
  const t = useTranslations();
  const amDispatch = useAmDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const [isEmpty, setIsEmpty] = useState(false);

  const [selectedVoiceModel, setSelectedVoiceModel] = useState<TypeVoiceModel | null >(null);

  const [filters, setFilters] = useState<voiceModelFilterType>({
    type: "browse",
    name: ""
  })

  const [voiceModelListKey, setVoiceModelListKey] = useState(0);

  return (
    <div className="grow shrink basis-0 self-stretch rounded-bl-[20px] border-r border-neutral-800 flex-col justify-between items-center inline-flex">
      <div className="fixed top-20 left-0 pr-[382px] w-full z-40">
        <VoiceModelListHeader
          filters={filters}
          onChange={(newFilters) => {
            setFilters(newFilters)
            setVoiceModelListKey(voiceModelListKey + 1)
          }}
        />
      </div>
      <div className="self-stretch pt-[112px] pb-[248px] overflow-hidden">
        <VoiceModelList
          key={voiceModelListKey}
          type="workstation"
          selectedVoiceModel={selectedVoiceModel}
          onItemClick={(voiceModel) => {
            setSelectedVoiceModel(voiceModel);
            // setIsOpen(true);
            // voiceDetailModal.onOpen();
          }}
          onChange={(voiceList) => {
            if (voiceList.length === 0) {
              setIsEmpty(true);
            } else {
              setIsEmpty(false);
            }
          }}
          filters={filters}
        />
      </div>

      <div className="fixed bottom-0 left-0 pr-[382px] w-full">
        <MainStationControl key={selectedVoiceModel?.publish_id} isOpen={isOpen} voiceModel={selectedVoiceModel} />
      </div>
    </div>
  );
}

export default MainStation;
