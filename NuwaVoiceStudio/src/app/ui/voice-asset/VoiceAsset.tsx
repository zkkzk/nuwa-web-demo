"use client";
import React, { useState } from "react";
import VoiceModelListHeader from "./VoiceModelListHeader";
import VoiceModelList from "../components/voice-model-list/VoiceModelList";
import { Button, cn, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import VoiceAssetDetail from "./VoiceModelDetail";
import DrawerModal from "../components/DrawerModal";
import EmptyIcon from "@/app/icons/EmptyIcon";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import DCubeIcon from "@/app/icons/3DCubeIcon";
import PublishVoiceModelModal from "../components/publish-select-voice-model/PublishVoiceModelModal";
import { TypeVoiceModel } from "@/app/lib/definitions.voice";
import { voiceModelFilterType } from "@/app/lib/definitions.InstantGenerateParamster";

function VoiceAsse() {

  const voiceDetailModal = useDisclosure({onChange: (isOpen) => {
    !isOpen && setSelectedVoiceModel(null)
  }});
  const [isEmpty, setIsEmpty] = useState(false);

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectModalOpen, setSelectModalOpen] = useState(false);
  const [selectedVoiceModel, setSelectedVoiceModel] = useState<TypeVoiceModel | null >(null);

  const [filters, setFilters] = useState<voiceModelFilterType>({
    type: "",
    name: ""
  })

  return (
    <div className="w-full h-screen pt-14 overflow-hidden bg-neutral-900 rounded-bl-xl rounded-br-xl justify-start items-end inline-flex">
      <div className="w-full self-stretch justify-start items-start flex h-screen">
        <div className="fixed top-20 left-0 w-full z-40">
        {/* {!isEmpty && (<VoiceModelListHeader filters={filters} onChange={(newFilters) => setFilters(newFilters)} />)}
        {isEmpty && (
          <div className="self-stretch justify-between items-center flex flex-col bg-neutral-900 px-8 pt-10 w-full">
            <div className="h-[40px] justify-between items-center gap-6 flex w-full mb-4">
              <div className="text-white text-xl font-semibold font-['Archivo'] leading-normal">
                Voices
              </div>
            </div>
          </div>
        )} */}
        <VoiceModelListHeader filters={filters} onChange={(newFilters) => setFilters(newFilters)} />
          
        </div>
        <div className="self-stretch pt-[170px] overflow-hidden w-full">
          <div className={cn(isEmpty ? 'hidden' : 'block')}>
            <VoiceModelList
              selectedVoiceModel={selectedVoiceModel}
              onItemClick={(voiceModel) => {
                setSelectedVoiceModel(voiceModel);
                voiceDetailModal.onOpen();
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

      <DrawerModal
        modalDisclosure={voiceDetailModal}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader></ModalHeader>
              <ModalBody>
                {selectedVoiceModel && (
                  <VoiceAssetDetail key={selectedVoiceModel.publish_id} publishId={selectedVoiceModel.publish_id} />
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </DrawerModal>

      <PublishVoiceModelModal isOpen={uploadModalOpen} onChange={(isOpen) => {setUploadModalOpen(isOpen)}} variant="UPLOAD"  />
      <PublishVoiceModelModal isOpen={selectModalOpen} onChange={(isOpen) => {setSelectModalOpen(isOpen)}} variant="SELECT" />
    </div>
  );
}

export default VoiceAsse;
