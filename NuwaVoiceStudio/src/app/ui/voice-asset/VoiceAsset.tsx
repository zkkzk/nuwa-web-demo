"use client";
import React, { useState } from "react";
import VoiceModelListHeader from "./VoiceModelListHeader";
import VoiceModelList from "../components/voice-model-list/VoiceModelList";
import { Button, cn, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import EmptyIcon from "@/app/icons/EmptyIcon";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import DCubeIcon from "@/app/icons/3DCubeIcon";
import PublishVoiceModelModal from "../components/publish-select-voice-model/PublishVoiceModelModal";
import { TypeVoiceModel } from "@/app/lib/definitions.voice";
import { VoiceModelFilterType } from "@/app/lib/definitions.voice";
import VoiceModelDetailDrawerModal from "../components/voice-model-detail/VoiceModelDetailDrawerModal";

function VoiceAsset() {
  const [isEmpty, setIsEmpty] = useState(false);

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectModalOpen, setSelectModalOpen] = useState(false);
  const [selectedVoiceModel, setSelectedVoiceModel] = useState<TypeVoiceModel | null >(null);

  const [filters, setFilters] = useState<VoiceModelFilterType>({
    type: "",
    name: ""
  })

  const [voiceModelListKey, setVoiceModelListKey] = useState(0);

  return (
    <div className="w-full h-screen pt-20 overflow-hidden bg-neutral-900 rounded-bl-xl rounded-br-xl justify-start items-end inline-flex">
      <div className="w-full self-stretch justify-start items-start flex h-screen">
        <div className="fixed top-20 left-0 w-full z-40">
          <VoiceModelListHeader filters={filters} onChange={(newFilters) => {
            setFilters(newFilters)
            setVoiceModelListKey(voiceModelListKey + 1)
          }} />
            
        </div>
        <div className="self-stretch pt-[80px] overflow-hidden w-full">
          <div className={cn(isEmpty ? 'hidden' : 'block')}>
            <VoiceModelList
              key={voiceModelListKey}
              selectedVoiceModel={selectedVoiceModel}
              onItemClick={(voiceModel) => {
                setSelectedVoiceModel(voiceModel);
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

          {isEmpty && (
            <div className="w-full h-full flex flex-col justify-center items-center gap-12">
              <div className="flex-col justify-center items-center gap-4 flex">
                <EmptyIcon className="w-12 h-12" />
                <div className="text-center text-zinc-500 text-sm font-medium font-['Inter']">It seems like there's nothing here. <br/>Try to do something.</div>
              </div>
              <div className="h-12 justify-start items-start gap-4 inline-flex">
                <Dropdown>
                  <DropdownTrigger>
                    <Button 
                      size="lg"
                      variant="bordered" 
                      className="w-[200px] justify-between"
                      endContent={<ChevronDownIcon className="h-4 w-4" />}
                    >
                      Publish
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu 
                    aria-label="Action event example" 
                    onAction={(key) => {
                      if (key === 'local') {
                        setUploadModalOpen(true);
                      }
                      if (key === 'online') {
                        setSelectModalOpen(true);
                      }
                    }}
                  >
                    <DropdownItem key="local">From Local</DropdownItem>
                    <DropdownItem key="online">From My Voice Lib</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Button size="lg" variant="flat" className="w-[200px]" startContent={<DCubeIcon className="h-6 w-6 fill-zinc-400" />}>Train My Voice</Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <VoiceModelDetailDrawerModal
        publishId={selectedVoiceModel?.publish_id}
        isOpen={selectedVoiceModel !== null}
        onChange={(isOpen) => {
          if (!isOpen) {
            setSelectedVoiceModel(null)
          }
        }} />

      <PublishVoiceModelModal
        variant="UPLOAD"
        isOpen={uploadModalOpen}
        onChange={(isOpen) => {setUploadModalOpen(isOpen)}}
        onSuccess={() => {
          setVoiceModelListKey(voiceModelListKey + 1);
          setUploadModalOpen(false);
        }}
      />
      <PublishVoiceModelModal
        variant="SELECT"
        isOpen={selectModalOpen}
        onChange={(isOpen) => {setSelectModalOpen(isOpen)}}
        onSuccess={() => {
          setVoiceModelListKey(voiceModelListKey + 1);
          setSelectModalOpen(false);
        }}
      />
    </div>
  );
}

export default VoiceAsset;
