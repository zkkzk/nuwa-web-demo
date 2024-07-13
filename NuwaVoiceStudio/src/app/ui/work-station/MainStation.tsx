"use client";
import React, { useState } from "react";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { useAmDispatch } from "../components/alter-message/AlterMessageContextProvider";
import VoiceModelListHeader from "./VoiceModelListHeader";
import VoiceModelList from "../components/voice-model-list/VoiceModelList";
import { InfType, TypeVoiceModel, VoiceInfHistoryType } from "@/app/lib/definitions.voice";
import { VoiceModelFilterType } from "@/app/lib/definitions.voice";
import MainStationControl from "../components/voice-inf/MainStationControl";
import { cn } from "@nextui-org/react";
import VoiceInfDrawerModal from "../components/voice-inf/VoiceInfDrawerModal";


function MainStation({
  onInfSuccess,
  onSendingChange
}: {
  onInfSuccess: (newInf: VoiceInfHistoryType) => void
  onSendingChange?: ({sending, infType} : {sending: boolean, infType: InfType}) => void
}) {
  const router = useRouter();
  const t = useTranslations();
  const amDispatch = useAmDispatch();
  const [isOpenParams, setIsOpenParams] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [isEmpty, setIsEmpty] = useState(false);

  const [selectedVoiceModel, setSelectedVoiceModel] = useState<TypeVoiceModel | null >(null);

  const [filters, setFilters] = useState<VoiceModelFilterType>({
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
      <div className={cn('self-stretch pt-[112px] overflow-hidden', selectedVoiceModel ? 'h-[calc(100vh-112px)]' : 'h-[calc(100vh-112px)]')}>
        <VoiceModelList
          key={voiceModelListKey}
          type="workstation"
          selectedVoiceModel={selectedVoiceModel}
          onItemClick={(voiceModel) => {
            setSelectedVoiceModel(voiceModel);
            setIsOpen(true);
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
        {selectedVoiceModel && (
          <VoiceInfDrawerModal
            isOpen={isOpen}
            key={selectedVoiceModel?.publish_id}
            publishId={selectedVoiceModel?.publish_id || ''}
            modelId={selectedVoiceModel?.model_id || ""}
            tones={selectedVoiceModel?.tone || []}
            onSuccess={(newInf: VoiceInfHistoryType) => {
              onInfSuccess(newInf);
            }}
            onChange={(isOpen) => {
              setIsOpen(isOpen);
              if (!isOpen) {
                setSelectedVoiceModel(null);
              }
            }}
            onSendingChange={onSendingChange}
          />
        )}
      </div>
    </div>
  );
}

export default MainStation;
