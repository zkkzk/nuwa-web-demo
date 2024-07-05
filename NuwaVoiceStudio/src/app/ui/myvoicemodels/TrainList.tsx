"use client";
import React, { useEffect, useState } from "react";
import TrainItem from "./TrainItem";
import { Button, Input, Pagination } from "@nextui-org/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import { getVoiceTrainRecords } from "@/app/lib/voice.api";
import { useAmDispatch } from "../components/alter-message/AlterMessageContextProvider";
import { voiceTrainRecordType } from "@/app/lib/definitions.voice";

const TaskStatusMap = {
  '1': 'notstart',
  '2': 'completing',
  '3': 'completed',
}
const TaskResultMap = {
  '1': 'success',
  '2': 'failed',
}

function TrainList({
  onChange,
}:{
  onChange: (voiceTrainRecordsList: []) => void;
}) {
  const amDispatch = useAmDispatch();
  const [loading, setLoading] = useState(false);
  const [isInit, setInit] = useState(false);
  const [voiceTrainRecordsList, setVoiceTrainRecordsList] = useState<voiceTrainRecordType[]>([]) 

  const getVoiceTrainRecordsApi = getVoiceTrainRecords();
  const getVoiceTrainRecordsServer = async () => {

    if (loading) {
      return;
    }
    setLoading(true);
    const res = await getVoiceTrainRecordsApi.send({
    });
    if (res && res.code === 0) {
      setVoiceTrainRecordsList(res.data.list);

      onChange(res.data.list);
    }

    setLoading(false);
    if (!isInit) {
      setInit(true);
    }
  };

  useEffect(() => {
    if (!isInit) {
      setInit(true);
      getVoiceTrainRecordsServer();
    }
  }, []);
  
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="w-full h-12 justify-between items-center inline-flex">
        <Input
          classNames={{
            base: 'w-[400px]',
            // inputWrapper: 'bg-zinc-700'
          }}
          startContent={<MagnifyingGlassIcon className="w-6 h-6" />}
          type="text"
          variant="bordered"
          color="default"
          placeholder="Search"
          size="sm"
        />
        <Button color="danger" startContent={<TrashIcon className="w-5 h-5" />}>delete</Button>
      </div>
      {voiceTrainRecordsList.map((item) => (
        <TrainItem key={item.id} value={item} />
      ))}
      <div className="w-full h-8 justify-between items-center inline-flex">
        <div className="text-zinc-400 text-sm font-normal font-['Inter'] leading-tight">
          1-10 of 85 items
        </div>
        <Pagination total={10} initialPage={1} />
      </div>
    </div>
  );
}

export default TrainList;
