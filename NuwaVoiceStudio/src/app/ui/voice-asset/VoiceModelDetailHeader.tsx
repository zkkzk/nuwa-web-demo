"use client";
import GPTSovitsIcon from "@/app/icons/GPTSovitsIcon";
import { EllipsisHorizontalIcon, StarIcon } from "@heroicons/react/24/solid";
import { Button, cn } from "@nextui-org/react";
import React, { useState } from "react";
import { voicePublishInfoType } from "@/app/lib/definitions.InstantGenerateParamster";
import { voiceModelCancelCollect, voiceModelCollect } from "@/app/lib/voice.api";

function VoiceAssetDetailHeader({
  voicePublishInfo, 
}: {
  voicePublishInfo: voicePublishInfoType
}) {
  const [collecting, setCollecting] = useState(false);
  const [isCollected, setIsCollected] = useState(false);

  const voiceModelCollectApi = voiceModelCollect();
  const voiceModelCollectServer = async () => {
    if (collecting) {
      return;
    }
    setCollecting(true);

    const res = await voiceModelCollectApi.send({
      "publish_id": voicePublishInfo.publish_id,
    });
    if (res && res.code === 0) {
      setIsCollected(true);
    }

    setCollecting(false);
  };

  const voiceModelCancelCollectApi = voiceModelCancelCollect();
  const voiceModelCancelCollectServer = async () => {
    if (collecting) {
      return;
    }
    setCollecting(true);

    const res = await voiceModelCancelCollectApi.send({
      "publish_id": voicePublishInfo.publish_id,
    });
    if (res && res.code === 0) {
      setIsCollected(false);
    }

    setCollecting(false);
  };

  return (
    <div className="w-full h-[82px] flex-col justify-start items-start gap-2.5 flex">
      <div className="self-stretch justify-between items-end inline-flex">
        <div className="justify-center items-center gap-2.5 flex">
          <div className="text-white text-4xl font-semibold font-['Inter'] leading-10">
            {voicePublishInfo.publish_info.name}
          </div>
          <div className="pl-1 pr-2 py-1 bg-black/opacity-30 rounded-[36px] backdrop-blur-[21px] justify-start items-center gap-1.5 flex">
            <div className="w-6 h-6 bg-blue-500 rounded-full justify-center items-center flex">
							<GPTSovitsIcon className="fill-white h-4 w-4" />
						</div>
            <div className="text-white text-sm font-normal font-['Inter'] leading-tight">
              GPT-Sovits
            </div>
          </div>
        </div>
        <div className="w-[191px] self-stretch justify-start items-center gap-2 flex">
					<Button
            isDisabled={collecting}
            size="lg"
            variant="flat" 
            startContent={<StarIcon className={cn("w-6 h-6",(isCollected ? "fill-amber-500" : "fill-zinc-400"))} />}
            onPress={isCollected ? voiceModelCancelCollectServer : voiceModelCollectServer}
            className="w-40"
          >Star {voicePublishInfo.star_num}</Button>
					<Button size="lg" variant="bordered"  startContent={<EllipsisHorizontalIcon className="fill-zinc-400 w-6 h-6" />} isIconOnly={true} />
        </div>
      </div>
      <div className="justify-start items-center gap-1 inline-flex">
        {voicePublishInfo.publish_info.tag.map((tag, index) => {
          return (
            <div key={index} className="px-2 py-0.5 bg-zinc-800 rounded justify-center items-center gap-2 flex">
              <div className="text-white text-xs font-semibold font-['Inter'] leading-tight">
                {tag}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default VoiceAssetDetailHeader;
