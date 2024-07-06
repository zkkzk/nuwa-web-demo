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
  const [voiceTrainRecordsList, setVoiceTrainRecordsList] = useState<voiceTrainRecordType[]>([]) 
  const [total, setTotal] = useState(0)
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const getVoiceTrainRecordsApi = getVoiceTrainRecords();
  const getVoiceTrainRecordsServer = async (page: number) => {
    // if (loading) {
    //   return;
    // }
    // setLoading(true);
    const res = await getVoiceTrainRecordsApi.send({
      page_size: pageSize,
      page: page,
    });
    if (res && res.code === 0) {
      setVoiceTrainRecordsList(res.data.list);
      setTotal(res.data.total);
      onChange(res.data.list);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getVoiceTrainRecordsServer(1);
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
          {(currentPage-1)*pageSize+1}-{currentPage === Math.ceil(total/pageSize) ? total : pageSize*currentPage} of {total} items
        </div>
        {total > 0 && (
          <Pagination total={ Math.ceil(total/pageSize) } page={currentPage} onChange={(page)=> {
            getVoiceTrainRecordsServer(page);
            setCurrentPage(page)
          }} />
        )}
        
      </div>
    </div>
  );
}

export default TrainList;
