"use client";
import React, { useEffect, useState } from "react";
import UploadFile from "../components/upload-file/UploadFile";
import TrainIcon from "@/app/icons/TrainIcon";
import TrainList from "./TrainList";
import TrainVoiceModelModal from "./TrainVoiceModelModal";
import { useAmDispatch } from "../components/alter-message/AlterMessageContextProvider";
import { getVoiceTrainRecords } from "@/app/lib/voice.api";

type voiceTrainRecordType = {
  id: number;
}

function MyVoiceModels() {

  const [trainVoiceModelOpen, setTrainVoiceModelOpen] = useState(false);
  const amDispatch = useAmDispatch();
  const [loading, setLoading] = useState(false);
  const [isInit, setInit] = useState(false);
  const [voiceTrainRecordsList, setVoiceTrainRecordsList] = useState<any[]>([]) 
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshVoiceTrainRecords = async () => {
    setRefreshKey(refreshKey + 1)
  }

  return (
    <>
      <div className="w-full h-screen pt-28 px-8 pb-6 bg-zinc-900 rounded-bl-xl rounded-br-xl flex-col justify-start items-start gap-6 inline-flex">
        <div className="text-white text-xl font-semibold font-['Inter'] leading-7">
          My Voice Models
        </div>
        <div className="self-stretch h-[72px]">
          <div
            onClick={() => {
              setTrainVoiceModelOpen(true);
            }}
            className=" cursor-pointer grow shrink basis-0 w-full h-full p-4 rounded-2xl border-dashed border-2 border-zinc-700 flex-col justify-center items-center gap-2 inline-flex"
          >
            <div className="text-center text-zinc-400 text-xs font-medium font-['Inter']">
            <div className="justify-center items-center flex gap-3">
              <TrainIcon className="w-6 h-6 fill-blue-600" />
              <span>Train My Voice Model</span>
            </div>
            </div>
          </div> 
        </div>
        <div className="text-zinc-400 text-sm font-normal font-['Inter'] leading-tight">
          You haven't created any voice
        </div>
        <TrainList key={refreshKey} onChange={(voiceTrainRecordsList) => {
          setVoiceTrainRecordsList(voiceTrainRecordsList);
        }} />
      </div>

      <TrainVoiceModelModal
        isOpen={trainVoiceModelOpen}
        onChange={(isOpen) => {
          setTrainVoiceModelOpen(isOpen);
        }}
        onDone={() => {
          setTrainVoiceModelOpen(false);
          refreshVoiceTrainRecords();
        }}
      />
    </>
  );
}

export default MyVoiceModels;
