"use client";
import React, { useCallback, useRef, useState } from "react";
import { TypeVoice } from "@/app/lib/definitions.voice";
import { PlayIcon } from "@heroicons/react/24/outline";
import { PauseIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { useWavesurfer } from '@wavesurfer/react'


const formatTime = (seconds: any) => [seconds / 60, seconds % 60].map((v) => `0${Math.floor(v)}`.slice(-2)).join(':')

function VoicePreview({
	voiceSrc,
	hideTimeline = true,
	classNames = {
		voicePreview: "",
	},
}: {
  voiceSrc: string
	hideTimeline: boolean,
	classNames?: {
		voicePreview: string
	}
}) {

  const [isPlay, setIsPlay] = useState(false);


	const containerRef = useRef(null)

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 40,
		barWidth: 3,
		barRadius: 3,
		waveColor: "#eee",
		progressColor: "#0178FF",
		cursorColor: "OrangeRed",
    url: 'https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3',
  })
	
	const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause()
  }, [wavesurfer])

	const duration = wavesurfer && wavesurfer.getDuration();

  return (
		<div className="self-stretch h-full w-full flex-col justify-start items-start gap-2 flex overflow-hidden">
			<div className={[classNames.voicePreview, 'h-16 px-4 py-3 w-full rounded-xl justify-start items-center gap-3 inline-flex scrollbar-hide overflow-scroll'].join(' ')}>
					<div className=" shrink-0 cursor-pointer w-8 h-8 bg-white rounded-full flex items-center justify-center">
						{isPlay 
						? <PauseIcon className="h-5 w-5 fill-black stroke-black stroke-1" onClick={() => {
							onPlayPause();
							setIsPlay(false);
						}} />
						: <PlayIcon className="h-5 w-5 fill-black stroke-black ml-0.5" onClick={() => {
							onPlayPause();
							setIsPlay(true);
						}} />
					}
					</div>
					<div className="w-full">
						<div ref={containerRef}  className="w-full" />
					</div>
			</div>
			{!hideTimeline && (
				<div className="self-stretch justify-between items-center inline-flex">
					<div className="text-gray-500 text-xs font-medium font-['Inter']">{formatTime(currentTime)}</div>
					<div className="text-gray-500 text-xs font-medium font-['Inter']">{formatTime(duration)}</div>
				</div>
			)}
			
		</div>
  );
}

export default VoicePreview;
