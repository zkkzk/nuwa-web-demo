"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useWavesurfer } from '@wavesurfer/react'
import PlayButton from "./PlayButton";
import { cn, Skeleton } from "@nextui-org/react";


const formatTime = (seconds: any) => [seconds / 60, seconds % 60].map((v) => `0${Math.floor(v)}`.slice(-2)).join(':')

function VoicePreview({
	voiceSrc,
	hideTimeline = true,
	classNames = {
		voicePreview: "",
		playButton: ""
	},
	onTimeChange,
}: {
  voiceSrc: string
	hideTimeline?: boolean,
	classNames?: {
		voicePreview?: string,
		playButton?: string
	},
	onTimeChange?: (res: { currentTime: number, duration: number| null }) => void
}) {
	const containerRef = useRef(null)

  const { wavesurfer, isPlaying, currentTime, isReady } = useWavesurfer({
    container: containerRef,
    height: 40,
		barWidth: 3,
		barRadius: 3,
		waveColor: "#eee",
		progressColor: "#18A8CC",
		cursorColor: "OrangeRed",
		dragToSeek: true,
    url: voiceSrc,
  })
	
	const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause()
  }, [wavesurfer])

	const duration = wavesurfer && wavesurfer.getDuration();

	const onChangePlay = (play:boolean) => {
		onPlayPause();
	}

	useEffect(()=>{
		onTimeChange && onTimeChange({ currentTime: currentTime, duration: duration })
	}, [currentTime, duration])

  return (
		<div className="self-stretch h-full w-full flex-col justify-start items-start gap-2 flex overflow-hidden">
			<div className={[classNames.voicePreview, hideTimeline ? 'h-10' : 'h-16 p-4', 'w-full rounded-xl justify-start items-center gap-3 inline-flex scrollbar-hide overflow-scroll'].join(' ')}>
				<div className={`shrink-0 `}>
					{isReady ? (
						<PlayButton isPlay={isPlaying} onChange={onChangePlay} classNames={{
							base: classNames.playButton
						}} />
					): (
						<Skeleton className="w-10 h-10 rounded-lg"/>
					)}
					
				</div>
				<div className="w-full relative">
					<div ref={containerRef}  className="w-full" />
					<div
						className={cn(
							isReady ? "hidden" : "flex",
							" absolute top-0 left-0 w-full h-full items-center justify-start"
						)}
					>
						<Skeleton className="w-full h-10 rounded-lg"/>
					</div>
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
