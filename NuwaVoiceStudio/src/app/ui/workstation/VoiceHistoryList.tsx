"use client";
import React, { useEffect, useState } from "react";
import { Link, useRouter } from "@/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useAmDispatch } from "../components/AlterMessageContextProvider";
import NuwaTabs from "../components/NuwaTabs";
import { ScrollShadow, Tab } from "@nextui-org/react";
import FilterIcon from "@/app/icons/FilterIcon";
import VoiceHistoryControl from "./VoiceHistoryControl";
import { TypeVoice } from "@/app/lib/definitions.voice";
import VoiceHistoryListItem from "./VoiceHistoryListItem";
import InfiniteScroll from "../infinite-scroll/InfiniteScroll";
import VoiceModelItemSkeleton from "./VoiceModelItemSkeleton";

const limit = 4;

function VoiceHistoryList() {
  const router = useRouter();
  const t = useTranslations();
  const amDispatch = useAmDispatch();

	const initVoiceList:Array<TypeVoice> = []

  const [count, setCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [voiceList, setVoiceList] = useState<TypeVoice[]>(initVoiceList);
  
  const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

  const loadMoreData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    // fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
    //   .then((res) => res.json())
    //   .then((body) => {
    //     setData([...data, ...body.results]);
    //     setLoading(false);
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   });

    await sleep(1000);
    let newVoiceList: TypeVoice[] =[];
    for (let i = 1; i < limit+1; i++) {
      newVoiceList.push({
        id: i + count,
				avatar: 'https://via.placeholder.com/64x64',
				name: `大叔成熟男声音${i + count}`,
				tone: 'tone',
				content: 'Your audio has been successfully generated. You may',
				voiceSrc: '',
				datetime: 'Just now',
				tags: 'tag1,tag2,tag3',
      })
    }
    setCount(count + limit);
    setVoiceList([...voiceList, ...newVoiceList]);
    setLoading(false);
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div className="self-stretch flex-col justify-start items-start gap-8 flex h-full">
			<ScrollShadow visibility="top" hideScrollBar id="scrollableVoiceHistoryDiv" className="w-full flex-col justify-start items-start gap-8 inline-flex h-dvh overflow-auto">
				<InfiniteScroll
					dataLength={voiceList.length}
					next={loadMoreData}
					hasMore={voiceList.length < 9990}
					loader={<><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /><VoiceModelItemSkeleton /></>}
					scrollableTarget="scrollableVoiceHistoryDiv"
					className="w-full self-stretch grow shrink basis-0 flex-col justify-start items-center gap-6 flex"
				>
					{voiceList.map((voice) => (
						<VoiceHistoryListItem key={voice.id} />
					))}
				</InfiniteScroll>
			</ScrollShadow>
		</div>
  );
}

export default VoiceHistoryList;
