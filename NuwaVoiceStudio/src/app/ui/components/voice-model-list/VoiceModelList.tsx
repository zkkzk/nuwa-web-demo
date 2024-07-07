"use client";
import React, { useEffect, useState } from "react";
import VoiceModelItem from "./VoiceModelItem";
import { TypeVoiceModel } from "@/app/lib/definitions.voice";
import VoiceModelItemSkeleton from "./VoiceModelItemSkeleton";
import { ScrollShadow } from "@nextui-org/react";
import InfiniteScroll from "../infinite-scroll/InfiniteScroll";
import { getMyPublish, getPublishSquare } from "@/app/lib/voice.api";
import { voiceModelFilterType } from "@/app/lib/definitions.InstantGenerateParamster";


function VoiceModelList({
  filters,
  selectedVoiceModel,
  type = 'all',
  onItemClick,
  onChange,
}: {
  filters?: voiceModelFilterType
  selectedVoiceModel?: TypeVoiceModel | null;
  type?: 'workstation' | 'my' | 'all';
  onItemClick?: (voiceModel: TypeVoiceModel | null) => void;
  onChange?: (voiceModelList: TypeVoiceModel[]) => void;
}) {
  let getVoiceModelListApi: any;
  if (type === 'my') {
    getVoiceModelListApi = getMyPublish();
  } else {
    getVoiceModelListApi = getPublishSquare();
  }

  const initVoiceModelList:Array<TypeVoiceModel> = []
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [nextPageToken, setNextPageToken] = useState("");
  const [voiceModelList, setVoiceModelList] = useState<TypeVoiceModel[]>(initVoiceModelList);
  
  const [prevFilters, setPrevFilters] = useState(filters);

  const getPublishSquareToServer = async ({isFirst = false}) => {
    if (loading) {
      return;
    }
    setLoading(true);

    const res = await getVoiceModelListApi.send({
      page_token: isFirst ? '' : nextPageToken,
      size: isFirst ? 20 : 10,
      type: filters?.type || '',
      name: filters?.name || ''
    });
    if (res && res.code === 0) {
      onChange && onChange(res.data.list);
      
      let newVoiceModelList: TypeVoiceModel[] = res.data.list;
      if (isFirst) {
        setCount(newVoiceModelList.length);
        setVoiceModelList([...newVoiceModelList]);
      } else {
        setCount(count + newVoiceModelList.length);
        setVoiceModelList([...voiceModelList, ...newVoiceModelList]);
      }
      setLoading(false);
      setHasMore(res.data.has_more)
      setNextPageToken(res.data.next_page_token)
    }

    setLoading(false);
  };

  if (filters) {
    if (prevFilters?.type !== filters.type || prevFilters.name !== filters.name) {
      setPrevFilters(filters);
      getPublishSquareToServer({isFirst: true});
    }
  }

  useEffect(() => {
    getPublishSquareToServer({isFirst: true});
  }, []);


  return (
    <div className="self-stretch flex-col justify-start items-start gap-8 flex h-full">
      {voiceModelList.length > 0 && (
        <ScrollShadow size={16} visibility="top" hideScrollBar id="scrollableVoiceModelDiv" className="w-full flex-col justify-start items-start gap-8 inline-flex h-dvh overflow-auto py-4 px-8">
          <InfiniteScroll
            dataLength={voiceModelList.length}
            next={() => {getPublishSquareToServer({isFirst: false})}}
            hasMore={hasMore}
            loader={<><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /></>}
            scrollableTarget="scrollableVoiceModelDiv"
            className="w-full self-stretch items-start grid gap-8 grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
          >
            {voiceModelList.map((voice) => (
              <div key={voice.id}>
                <VoiceModelItem onItemClick={onItemClick} voice={voice} key={voice.id} isSelected={!!selectedVoiceModel && selectedVoiceModel.id === voice.id} />
              </div>
            ))}
          </InfiniteScroll>
        </ScrollShadow>
      )}


      <div className="h-14" />
    </div>
  );
}

export default VoiceModelList;
