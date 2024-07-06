"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useWavesurfer } from '@wavesurfer/react'
import PlayButton from "./PlayButton";
import { cn, Skeleton } from "@nextui-org/react";

function VoicePreview({
	voiceSrc,
	classNames = {
		voicePreview: "",
		playButton: ""
	},
	onTimeChange,
}: {
  voiceSrc: string
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
		<div className="h-full w-full flex justify-center items-start gap-2 overflow-hidden">
			<div
				className={cn(
					classNames.voicePreview,
					'h-12 w-full rounded-xl justify-start items-center gap-3 inline-flex scrollbar-hide overflow-scroll'
				)}
			>
				<div className="shrink-0 h-full">
					{isReady ? (
						<div className="py-1">
							<PlayButton isPlay={isPlaying} onChange={onChangePlay} classNames={{
								base: classNames.playButton
							}} />
						</div>
					): (
						<Skeleton className="w-12 h-12 rounded-lg"/>
					)}
				</div>
				<div className="w-full h-full relative">
					<div ref={containerRef}  className="w-full py-1" />
					<div
						className={cn(
							isReady ? "hidden" : "flex",
							" absolute top-0 left-0 w-full h-full items-center justify-start"
						)}
					>
						<Skeleton className="w-full h-full rounded-lg"/>
					</div>
				</div>
			</div>
			{/* {!hideTimeline && (
				<div className="self-stretch justify-between items-center inline-flex">
					<div className="text-gray-500 text-xs font-medium font-['Inter']">{formatTime(currentTime)}</div>
					<div className="text-gray-500 text-xs font-medium font-['Inter']">{formatTime(duration)}</div>
				</div>
			)} */}
		</div>
  );
}

export default VoicePreview;
