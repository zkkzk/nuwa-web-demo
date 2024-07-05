"use client";
import React, { useEffect, useState } from "react";
import VoiceModelItem from "./VoiceModelItem";
import { TypeVoiceModel } from "@/app/lib/definitions.voice";
import VoiceModelItemSkeleton from "./VoiceModelItemSkeleton";
import { ScrollShadow } from "@nextui-org/react";
import InfiniteScroll from "../infinite-scroll/InfiniteScroll";
import { getPublishSquare } from "@/app/lib/voice.api";


function VoiceModelList({
  onItemClick,
  onChange,
}: {
  onItemClick?: (voiceModel: TypeVoiceModel) => void;
  onChange?: (voiceModelList: TypeVoiceModel[]) => void;
}) {

  const getPublishSquareApi = getPublishSquare();

  const [selectedVoiceModel, setSelectedVoiceModel] = useState<TypeVoiceModel | null >(null);

  const initVoiceModelList:Array<TypeVoiceModel> = []

  const [count, setCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [isInit, setInit] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [nextPageToken, setNextPageToken] = useState("");
  const [voiceModelList, setVoiceModelList] = useState<TypeVoiceModel[]>(initVoiceModelList);
  
  const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

  const getPublishSquareToServer = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    const res = await getPublishSquareApi.send({
      "page_token": nextPageToken,
      "type": "",
    });
    if (res && res.code === 0) {
      onChange && onChange(res.data.list);
      let newVoiceModelList: TypeVoiceModel[] = res.data.list;
      setCount(count + newVoiceModelList.length);
      setVoiceModelList([...voiceModelList, ...newVoiceModelList]);
      setLoading(false);
      setHasMore(res.data.has_more)
      setNextPageToken(res.data.next_page_token)
    }

    setLoading(false);
    if (!isInit) {
      setInit(true);
    }
  };


  useEffect(() => {
    getPublishSquareToServer();
  }, []);


  return (
    <div className="self-stretch flex-col justify-start items-start gap-8 flex h-full">
      {isInit && voiceModelList.length > 0 && (
        <ScrollShadow size={32} visibility="top" hideScrollBar id="scrollableVoiceModelDiv" className="w-full flex-col justify-start items-start gap-8 inline-flex h-dvh overflow-auto py-8 px-8">
          <InfiniteScroll
            dataLength={voiceModelList.length}
            next={getPublishSquareToServer}
            hasMore={hasMore}
            loader={<><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /></>}
            scrollableTarget="scrollableVoiceModelDiv"
            className="w-full self-stretch items-start grid gap-8 grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
          >
            {voiceModelList.map((voice) => (
              <div key={voice.id} onClick={() => {
                // onItemClick && onItemClick(voice);
                if(selectedVoiceModel && (voice.id === selectedVoiceModel.id)) {
                  setSelectedVoiceModel(null);
                  return;
                };
                setSelectedVoiceModel(voice);
              }}>
                <VoiceModelItem onItemClick={onItemClick} voice={voice} key={voice.id} isSelected={(selectedVoiceModel !== null) && (voice.id === selectedVoiceModel.id)} />
              </div>
            ))}
          </InfiniteScroll>
        </ScrollShadow>
      )}
      
      {isInit && voiceModelList.length === 0 && (
        <div>1231231</div>
      )}


      <div className="h-14" />
    </div>
  );
}

export default VoiceModelList;
