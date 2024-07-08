"use client";
import React, { useState } from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import APIIcon from "@/app/icons/APIIcon";
import { Button } from "@nextui-org/react";
import VoiceHistoryItemVoiceRreview from "./VoiceHistoryItemVoicePreview";
import { VoiceInfHistoryType } from "@/app/lib/definitions.InstantGenerateParamster";
import { downloadFiles } from "@/app/lib/utils";
import VoiceHistoryItemAPI from "./VoiceHistoryItemAPI";

function VoiceHistoryItemAudio({
	voiceInfHistory
}: {
  voiceInfHistory: VoiceInfHistoryType
}) {

  const [downlanding, setDownlanding] = useState(false);
	const [showCode, setShowCode] = useState(false);


  return (
		<>
			<VoiceHistoryItemVoiceRreview voiceSrc={voiceInfHistory.audio_url} />
			{showCode && <VoiceHistoryItemAPI code={voiceInfHistory.code} />}
			
			<div className="self-stretch justify-start items-start gap-4 inline-flex">
				<Button
					isDisabled={voiceInfHistory.audio_url === ''}
					color="default"
					size="lg"
					variant="ghost"
					className='px-0 grow'
					endContent={<ArrowDownTrayIcon className="w-5 h-5 fill-zinc-400 shrink-zinc-400" />}
					onPress={() =>{
						downloadFiles([voiceInfHistory.audio_url])
					}}
				>Download</Button>
				<Button
					color="default"
					size="lg"
					variant="ghost"
					className='px-0 grow'
					endContent={<APIIcon className="w-5 h-5" />}
					onPress={() => setShowCode(!showCode)}
				>API</Button>
			</div>
		</>
  );
}

export default VoiceHistoryItemAudio;
