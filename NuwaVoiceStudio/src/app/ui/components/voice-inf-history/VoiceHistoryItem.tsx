"use client";
import React, { useState } from "react";
import VoiceHistoryItemAPI from "./VoiceHistoryItemAPI";
import { VoiceInfHistoryType } from "@/app/lib/definitions.voice";
import moment from "moment";
import VoiceHistoryItemAudio from "./VoiceHistoryItemAudio";

function VoiceHistoryItem({
	voiceInfHistory
}: {
  voiceInfHistory: VoiceInfHistoryType
}) {
  const [selected, setSelected] = useState("GET");

  return (
		<div className="self-stretch flex-col justify-center items-start gap-6 flex">
			<div className="self-stretch rounded-xl flex-col justify-start items-start gap-2 flex">
				<div className="self-stretch p-6 bg-neutral-800 rounded-xl flex-col justify-start items-start gap-4 flex">
					<div className="self-stretch min-h-[120px] flex-col justify-start items-start gap-2.5 flex">
						<div className="self-stretch justify-start items-start gap-6 inline-flex">
							{false && (
								<div className="justify-start items-start gap-2 flex">
									<div className="rounded-2xl justify-end items-center flex">
										<img className="w-16 h-16" src={'voiceInfHistory.cover_url'} />
									</div>
								</div>
							)}
								
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
						<VoiceHistoryItemAudio voiceInfHistory={voiceInfHistory} />
					) : (
						<VoiceHistoryItemAPI code={voiceInfHistory.code} />
					)}
					
				</div>
				<div className="self-stretch h-6 flex-col justify-start items-end flex">
					<div className="self-stretch justify-between items-center inline-flex">
						<div className="justify-start items-start gap-2 flex">
							<div className="text-gray-500 text-xs font-medium font-['Inter']">{moment(voiceInfHistory.created_at).format('hh:mm MMMM DD YYYY')}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
  );
}

export default VoiceHistoryItem;
