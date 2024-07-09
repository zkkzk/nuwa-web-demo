"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import VoiceHistoryItemAPI from "./VoiceHistoryItemAPI";
import { VoiceInfHistoryType } from "@/app/lib/definitions.voice";
import moment from "moment";
import VoiceHistoryItemAudio from "./VoiceHistoryItemAudio";
import { motion, useAnimationControls } from "framer-motion";

function VoiceHistoryItem({
	voiceInfHistory
}: {
  voiceInfHistory: VoiceInfHistoryType
}) {
  const wrapperVariants = {
    enter: { 
      y: -1*100 + '%',
      transition: {
        duration: 2
      }
    },
    visible: {
      y: 0*100 + '%',
      transition: {
        duration: 2
      }
    },
    exit: {
      y: 0*100 + '%',
      transition: {
        duration: 2
      }
    }
  };

  return (
		<div className="self-stretch flex-col justify-center items-start gap-6 flex">
			<div className="self-stretch rounded-xl flex-col justify-start items-start gap-2 flex">
				<div className="self-stretch p-6 bg-neutral-800 rounded-xl flex-col justify-start items-start gap-4 flex">
					<div className="self-stretch flex-col justify-start items-start gap-2.5 flex">
						<div className="self-stretch justify-start items-start gap-6 inline-flex">
							<div className="relative w-16 h-16 rounded-xl">
								<Image
									fill={true}
									alt={voiceInfHistory.cover_url}
									className=" grow shrink basis-0 self-stretch rounded-xl flex-none object-cover"
									src={voiceInfHistory.cover_url}
								/>
							</div>
								
							<div className="grow shrink basis-0 self-stretch flex-col justify-between items-start inline-flex">
								<div className="self-stretch text-white text-lg font-semibold font-['Archivo'] leading-normal">{voiceInfHistory.name}</div>
								<div className="px-2 py-1 bg-neutral-800 rounded-md justify-center items-center gap-2 inline-flex">
									<div className="text-white text-sm font-medium font-['Inter']">{voiceInfHistory.tone.tone_type}</div>
								</div>
							</div>
						</div>
						
						{/* <div className="self-stretch"><span className="">Your audio has been successfully generated. You may</span><span className="text-white text-sm font-medium font-['Inter']"> further customize it or simply download it for use.</span></div> */}
						<div className="self-stretch text-white text-sm font-medium font-['Inter']">{voiceInfHistory.text}</div>
					</div>
					{voiceInfHistory.inf_type === 'audio' ? (
						useMemo(() => <VoiceHistoryItemAudio voiceInfHistory={voiceInfHistory} />, [voiceInfHistory])
					) : (
						<VoiceHistoryItemAPI code={voiceInfHistory.code} />
					)}
					
				</div>
				<div className="self-stretch h-6 flex-col justify-start items-end flex">
					<div className="self-stretch justify-between items-center inline-flex">
						<div className="justify-start items-start gap-2 flex">
							<div className="text-gray-500 text-xs font-medium font-['Inter']">{moment(voiceInfHistory.seq, 'X').format('hh:mm MMMM DD YYYY')}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
  );
}

export default VoiceHistoryItem;
