"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { useAmDispatch } from "../components/alter-message/AlterMessageContextProvider";
import { ScrollShadow, } from "@nextui-org/react";
import { TypeVoice } from "@/app/lib/definitions.voice";
import VoiceHistoryItem from "./VoiceHistoryItem";
import InfiniteScroll from "../components/infinite-scroll/InfiniteScroll";
import VoiceHistoryItemSkeleton from "./VoiceHistoryItemSkeleton";
import { getVoiceInfHistory } from "@/app/lib/voice.api";
import EmptyIcon from "@/app/icons/EmptyIcon";

const limit = 4;

function VoiceHistoryList({
  onChange,
}: {
  onChange?: (voiceList: TypeVoice[]) => void;
}) {
  const router = useRouter();
  const t = useTranslations();
  const amDispatch = useAmDispatch();

	const initVoiceList:Array<TypeVoice> = []

  const [count, setCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [isInit, setInit] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [nextPageToken, setNextPageToken] = useState("");
  const [voiceList, setVoiceList] = useState<TypeVoice[]>(initVoiceList);
  
  const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

  const getVoiceInfHistoryApi = getVoiceInfHistory();

  const getVoiceInfHistoryoServer = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    const res = await getVoiceInfHistoryApi.send({
      "page_token": nextPageToken,
      "type": "collection",
    });
    if (res && res.code === 0) {
      let newVoiceList: TypeVoice[] = res.data.list || [];
      setCount(count + newVoiceList.length);
      setVoiceList([...voiceList, ...newVoiceList]);
      setLoading(false);
      setHasMore(res.data.has_more)
      setNextPageToken(res.data.next_page_token)
    }

    // await sleep(1000);
    // for (let i = 1; i < limit+1; i++) {
    //   newVoiceList.push({
    //     id: i + count,
    //     src: 'https://via.placeholder.com/160x90',
    //     name: `大叔成熟男声音${i + count}`,
    //     count: 3500000,
    //     star: i%2 === 1,
    //   })
    // }
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

    // await sleep(1000);
    // let newVoiceList: TypeVoice[] =[];
    // for (let i = 1; i < limit+1; i++) {
    //   newVoiceList.push({
    //     id: i + count,
		// 		avatar: 'https://via.placeholder.com/64x64',
		// 		name: `大叔成熟男声音${i + count}`,
		// 		tone: 'tone',
		// 		content: 'Your audio has been successfully generated. You may',
		// 		voiceSrc: 'https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3',
		// 		datetime: 'Just now',
		// 		tags: 'tag1,tag2,tag3',
    //     type: (i%2 === 0) ? 'API' : 'FILE',
    //   })
    // }
    // setCount(count + limit);
    // setVoiceList([...voiceList, ...newVoiceList]);
    // setLoading(false);
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

			<ScrollShadow size={32} visibility="top" hideScrollBar id="scrollableVoiceHistoryDiv" className="w-full flex-col justify-start items-start gap-8 inline-flex h-dvh overflow-auto py-8">
				<InfiniteScroll
					dataLength={voiceList.length}
					next={loadMoreData}
					hasMore={hasMore}
					loader={<><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /><VoiceHistoryItemSkeleton /></>}
					scrollableTarget="scrollableVoiceHistoryDiv"
					className="w-full self-stretch grow shrink basis-0 flex-col justify-start items-center gap-6 flex"
				>
					{voiceList.map((voice) => (
						<VoiceHistoryItem voice={voice} key={voice.id} />
					))}
				</InfiniteScroll>
			</ScrollShadow>
		</div>
  );
}

export default VoiceHistoryList;
