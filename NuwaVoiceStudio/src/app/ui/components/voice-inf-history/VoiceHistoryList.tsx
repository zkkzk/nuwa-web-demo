"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { ScrollShadow, } from "@nextui-org/react";
import VoiceHistoryItem from "./VoiceHistoryItem";
import VoiceHistoryItemSkeleton from "./VoiceHistoryItemSkeleton";
import { getVoiceInfHistory } from "@/app/lib/voice.api";
import EmptyIcon from "@/app/icons/EmptyIcon";
import { VoiceInfHistoryType } from "@/app/lib/definitions.voice";
import InfiniteScroll from "../infinite-scroll/InfiniteScroll";

const limit = 4;

function VoiceHistoryList({
  type = 'audio',
  onChange,
}: {
  type?: 'audio' | 'code';
  onChange?: (voiceList: VoiceInfHistoryType[]) => void;
}) {
  const router = useRouter();
  const t = useTranslations();

	const initVoiceList:Array<VoiceInfHistoryType> = []

  const [count, setCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [isInit, setInit] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [nextPageToken, setNextPageToken] = useState("");
  const [voiceList, setVoiceList] = useState<VoiceInfHistoryType[]>(initVoiceList);
  
  const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

  const getVoiceInfHistoryApi = getVoiceInfHistory();

  const getVoiceInfHistoryoServer = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    const res = await getVoiceInfHistoryApi.send({
      "page_token": nextPageToken,
      "inf_type": type,
    });
    if (res && res.code === 0) {
      let newVoiceList: VoiceInfHistoryType[] = res.data.list || [];
      setCount(count + newVoiceList.length);
      setVoiceList([...voiceList, ...newVoiceList]);
      setLoading(false);
      setHasMore(res.data.has_more)
      setNextPageToken(res.data.next_page_token)
    }
    setLoading(false);
    if (!isInit) {
      setInit(true);
    }
  };

  const loadMoreData = async () => {
    // if (loading) {
    //   return;
    // }
    // setLoading(true);

    getVoiceInfHistoryoServer();
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  useEffect(() => {
    if (onChange && isInit) {
      onChange(voiceList);
    }
  }, [voiceList, isInit]);

  return (
    <div className="self-stretch flex-col justify-start items-start gap-8 flex h-full">

      {(count === 0 && isInit) && (
        <div className="w-full h-full flex flex-col justify-center items-center gap-12">
          <div className="flex-col justify-center items-center gap-4 flex">
            <EmptyIcon className="w-12 h-12" />
            <div className="text-center text-zinc-500 text-sm font-medium font-['Inter']">The queue is empty<br/>Try to generate something</div>
          </div>
        </div>
      )}

			<ScrollShadow size={16} visibility="top" hideScrollBar id="scrollableVoiceHistoryDiv" className="w-full flex-col justify-start items-start gap-8 inline-flex h-dvh overflow-auto py-4">
				<InfiniteScroll
					dataLength={voiceList.length}
					next={loadMoreData}
					hasMore={hasMore}
					loader={<><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /></>}
					scrollableTarget="scrollableVoiceHistoryDiv"
					className="w-full self-stretch grow shrink basis-0 flex-col justify-start items-center gap-6 flex"
				>
					{voiceList.map((voice) => (
						<VoiceHistoryItem voiceInfHistory={voice} key={voice.id} />
					))}
				</InfiniteScroll>
			</ScrollShadow>
		</div>
  );
}

export default VoiceHistoryList;
