"use client";
import React, { useEffect, useRef, useState } from "react";
import { Link, useRouter } from "@/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useAmDispatch } from "../components/AlterMessageContextProvider";
import NuwaTabs from "../components/NuwaTabs";
import { Button, Tab } from "@nextui-org/react";
import FilterIcon from "@/app/icons/FilterIcon";
import VoiceHistoryControl from "./VoiceHistoryControl";
import { TypeVoice } from "@/app/lib/definitions.voice";
import { ArrowDownTrayIcon, PlayIcon } from "@heroicons/react/24/outline";
import NuwaButton from "../components/NuwaButton";
import { PauseIcon } from "@heroicons/react/24/solid";
import { create } from "lodash";

const formWaveSurferOptions = (ref: any) => ({
  container: ref,
  waveColor: "#eee",
  progressColor: "#0178FF",
  cursorColor: "OrangeRed",
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 40,
  normalize: true,
  partialRender: true
});

function VoiceHistoryListItem({voice}: {
  voice: TypeVoice
}) {
  const router = useRouter();
  const t = useTranslations();
  const amDispatch = useAmDispatch();
  const [selected, setSelected] = useState("Voices");
	const tagsList = voice.tags.split(",");

  const [isPlay, setIsPlay] = useState(false);
	const [init, setInit] = useState(false);


	const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlaying] = useState(false);

  const url =
    "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3";

		const submitLink = async (event) => {
			event.preventDefault();
			const link = event.target.link.value;
			const radius = event.target.radius.value;
			const width = event.target.width.value;
			const color = event.target.color.value;
	
			const formWaveSurferOptions = (ref) => ({
				container: ref,
				waveColor: color,
				progressColor: "#0178FF",
				cursorColor: "OrangeRed",
				barWidth: width,
				barRadius: radius,
				responsive: true,
				height: 500,
				normalize: true,
				backgroundColor: 'white',
				partialRender: true
			});
	
			console.log(color)
	
			// make variable url to be equals to the provided link
			const url = link
	
			const WaveSurfer = (await import("wavesurfer.js")).default;
	
			// destroy the current displayed waveform
			wavesurfer.current.destroy();
	
			// get the options again
			const options = formWaveSurferOptions(waveformRef.current);
			wavesurfer.current = WaveSurfer.create(options);
			wavesurfer.current.load(url)
		};
	
	
		useEffect(() => {
			setInit(true);
		}, []);

		useEffect(() => {
			if (!init) return;
			create();
	
			return () => {
				if (wavesurfer.current) {
					wavesurfer.current.destroy();
				}
			};
		}, [init]);
	
		const create = async () => {
			const WaveSurfer = (await import("wavesurfer.js")).default;
	
			const options = formWaveSurferOptions(waveformRef.current);
			wavesurfer.current = WaveSurfer.create(options);
			wavesurfer.current.load(url);
			wavesurfer.current.on('timeupdate', (currentTime) => {
				console.log('Time', currentTime + 's')
			})
		};
	
		const handlePlayPause = () => {
			setPlaying(!playing);
			wavesurfer.current.playPause();
		};
	
	
		// const download = () => {
			
		// 	console.log(wavesurfer.current.exportImage('image/png',1))
		// 	console.log("Saved")
	
	
		// 	var image = new Image();
		// 	image.src = wavesurfer.current.exportImage('image/png',1);
		// 	document.body.appendChild(image);
		// 	//document.body.style = 'background: red;';
	
		// 	return (<a href={image} download>Click to download</a>)
		
		// }
	
		const MyButton = React.forwardRef(({ onClick, href }, ref) => {
			return (
				<a href={href} onClick={onClick} ref={ref}>
					Next
				</a>
			)
		})

  return (
		<div className="self-stretch h-[360px] flex-col justify-center items-start gap-6 flex">
			<div className="self-stretch h-[360px] rounded-xl flex-col justify-start items-start gap-2 flex">
				<div className="self-stretch h-[328px] p-6 bg-neutral-800 rounded-xl flex-col justify-start items-start gap-4 flex">
					<div className="self-stretch h-[121px] flex-col justify-start items-start gap-2.5 flex">
							<div className="self-stretch justify-start items-start gap-6 inline-flex">
									<div className="justify-start items-start gap-2 flex">
											<div className="rounded-2xl justify-end items-center flex">
													<img className="w-16 h-16" src={voice.avatar} />
											</div>
									</div>
									<div className="grow shrink basis-0 self-stretch flex-col justify-between items-start inline-flex">
											<div className="self-stretch text-white text-lg font-semibold font-['Archivo'] leading-normal">{voice.name}</div>
											<div className="px-2 py-1 bg-neutral-800 rounded-md justify-center items-center gap-2 inline-flex">
													<div className="text-white text-sm font-medium font-['Inter']">{voice.tone}</div>
											</div>
									</div>
							</div>
							
							{/* <div className="self-stretch"><span className="text-primary text-sm font-medium font-['Inter']">Your audio has been successfully generated. You may</span><span className="text-white text-sm font-medium font-['Inter']"> further customize it or simply download it for use.</span></div> */}
							<div className="self-stretch">{voice.content}</div>
					</div>
					<div className="self-stretch h-[83px] flex-col justify-start items-start gap-2 flex overflow-hidden">
						<div className="w-full pl-3.5 pr-[18px] pt-[11px] pb-2.5 bg-neutral-900 rounded-xl justify-start items-center gap-3 inline-flex scrollbar-hide overflow-scroll">
								<div className=" shrink-0 cursor-pointer w-8 h-8 bg-white rounded-full flex items-center justify-center">
									{isPlay 
									? <PauseIcon className="h-5 w-5 fill-black stroke-black stroke-1" onClick={() => {
										handlePlayPause();
										setIsPlay(false);
									}} />
									: <PlayIcon className="h-5 w-5 fill-black stroke-black ml-0.5" onClick={() => {
										handlePlayPause();
										setIsPlay(true);
									}} />
								}
								</div>
								<div className="w-full">
									<div id="waveform" ref={waveformRef}  className="w-full" />
								</div>
								{/* <div className="self-stretch rounded-sm justify-start items-center gap-0.5 inline-flex">
										<div className="w-0.5 h-px bg-primary rounded-sm" />
										<div className="w-0.5 h-px bg-primary rounded-sm" />
										<div className="w-0.5 h-px bg-primary rounded-sm" />
										<div className="w-0.5 h-px bg-primary rounded-sm" />
										<div className="w-0.5 h-px bg-primary rounded-sm" />
										<div className="w-0.5 h-px bg-primary rounded-sm" />
										<div className="w-0.5 h-px bg-primary rounded-sm" />
										<div className="w-0.5 h-px bg-primary rounded-sm" />
										<div className="w-0.5 h-px bg-primary rounded-sm" />
										<div className="w-0.5 h-px bg-primary rounded-sm" />
										<div className="w-0.5 h-px bg-primary rounded-sm" />
										<div className="w-0.5 h-px bg-primary rounded-sm" />
										<div className="w-0.5 h-px bg-primary rounded-sm" />
										<div className="w-0.5 h-px bg-primary rounded-sm" />
										<div className="w-0.5 h-px bg-primary rounded-sm" />
										<div className="w-0.5 h-px bg-primary rounded-sm" />
										<div className="w-0.5 h-px bg-primary rounded-sm" />
										<div className="w-0.5 h-1 bg-primary rounded-sm" />
										<div className="w-0.5 h-1 bg-primary rounded-sm" />
										<div className="w-0.5 h-1 bg-primary rounded-sm" />
										<div className="w-0.5 h-1 bg-primary rounded-sm" />
										<div className="w-0.5 h-1 bg-primary rounded-sm" />
										<div className="w-0.5 h-1 bg-primary rounded-sm" />
										<div className="w-0.5 h-1 bg-primary rounded-sm" />
										<div className="w-0.5 h-1 bg-primary rounded-sm" />
										<div className="w-0.5 h-1 bg-primary rounded-sm" />
										<div className="w-0.5 h-1 bg-primary rounded-sm" />
										<div className="w-0.5 h-1 bg-primary rounded-sm" />
										<div className="w-0.5 h-1 bg-primary rounded-sm" />
										<div className="w-0.5 h-1 bg-primary rounded-sm" />
										<div className="w-0.5 h-5 bg-primary rounded-sm" />
										<div className="w-0.5 h-5 bg-primary rounded-sm" />
										<div className="w-0.5 h-5 bg-primary rounded-sm" />
										<div className="w-0.5 h-[26px] bg-slate-200 rounded-sm" />
										<div className="w-0.5 h-[26px] bg-slate-200 rounded-sm" />
										<div className="w-0.5 h-[29px] bg-slate-200 rounded-sm" />
										<div className="w-0.5 h-[26px] bg-slate-200 rounded-sm" />
										<div className="w-0.5 h-5 bg-slate-200 rounded-sm" />
										<div className="w-0.5 h-5 bg-slate-200 rounded-sm" />
										<div className="w-0.5 h-5 bg-slate-200 rounded-sm" />
										<div className="w-0.5 h-6 bg-slate-200 rounded-sm" />
										<div className="w-0.5 h-2.5 bg-slate-200 rounded-sm" />
										<div className="w-0.5 h-2.5 bg-slate-200 rounded-sm" />
										<div className="w-0.5 h-2.5 bg-slate-200 rounded-sm" />
										<div className="w-0.5 h-2.5 bg-slate-200 rounded-sm" />
										<div className="w-0.5 h-2.5 bg-slate-200 rounded-sm" />
										<div className="w-0.5 h-2.5 bg-slate-200 rounded-sm" />
										<div className="w-0.5 h-2.5 bg-slate-200 rounded-sm" />
										<div className="w-0.5 h-2.5 bg-slate-200 rounded-sm" />
										<div className="w-0.5 h-1 bg-slate-200 rounded-sm" />
										<div className="w-0.5 h-1 bg-slate-200 rounded-sm" />
										<div className="w-0.5 h-1 bg-slate-200 rounded-sm" />
										<div className="w-0.5 h-1 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-1 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-1 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-2.5 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-2.5 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-4 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-5 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-5 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-5 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-6 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-8 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-[9px] bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-[18px] bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-3 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-[18px] bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-8 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-[21px] bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-8 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-[39px] bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-8 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-8 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-8 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-7 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-[33px] bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-[33px] bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-4 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-6 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-4 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-[13px] bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-7 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-7 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-5 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-5 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-[26px] bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-5 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-5 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-[21px] bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-8 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-5 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-5 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-5 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-5 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-4 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-4 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-2.5 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-2.5 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-2.5 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-[19px] bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-2.5 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-2.5 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-2.5 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-4 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-1 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-1 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-1 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-1 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-1 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-1 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-1 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-1 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-1 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-1 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-1 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-1 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-1 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-1 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-1 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-1 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-1 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-1 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-1 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-1 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-1 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-0.5 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-0.5 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-0.5 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-0.5 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-0.5 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-0.5 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-0.5 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-0.5 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-0.5 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-0.5 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-0.5 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-0.5 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-0.5 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-0.5 bg-zinc-500/opacity-50 rounded-sm" />
										<div className="w-0.5 h-px bg-zinc-500 rounded-sm" />
										<div className="w-0.5 h-px bg-zinc-500 rounded-sm" />
										<div className="w-0.5 h-px bg-zinc-500 rounded-sm" />
										<div className="w-0.5 h-px bg-zinc-500 rounded-sm" />
										<div className="w-0.5 h-px bg-zinc-500 rounded-sm" />
										<div className="w-0.5 h-px bg-neutral-700 rounded-sm" />
										<div className="w-0.5 h-px bg-neutral-700 rounded-sm" />
										<div className="w-0.5 h-px bg-neutral-700 rounded-sm" />
										<div className="w-0.5 h-px bg-neutral-700 rounded-sm" />
										<div className="w-0.5 h-px bg-neutral-700 rounded-sm" />
										<div className="w-0.5 h-px bg-neutral-700 rounded-sm" />
										<div className="w-0.5 h-px bg-neutral-700 rounded-sm" />
										<div className="w-0.5 h-px bg-neutral-700 rounded-sm" />
										<div className="w-0.5 h-px bg-neutral-700 rounded-sm" />
								</div> */}
						</div>
						<div className="self-stretch justify-between items-center inline-flex">
							<div className="text-gray-500 text-xs font-medium font-['Inter']">0:21</div>
							<div className="text-gray-500 text-xs font-medium font-['Inter']">1:02</div>
						</div>
					</div>
					<div className="self-stretch justify-start items-start gap-4 inline-flex">
						<NuwaButton
              color="default"
              size="lg"
							variant="ghost"
							className='px-0 grow'
              endContent={<ArrowDownTrayIcon className="w-5 h-5" />}
            >Download</NuwaButton>
						<NuwaButton
              color="default"
              size="lg"
							variant="ghost"
							className='px-0 grow'
              endContent={<ArrowDownTrayIcon className="w-5 h-5" />}
            >API</NuwaButton>
					</div>
				</div>
				<div className="self-stretch h-6 flex-col justify-start items-end flex">
					<div className="self-stretch justify-between items-center inline-flex">
						<div className="justify-start items-start gap-2 flex">
							<div className="text-gray-500 text-xs font-medium font-['Inter']">Just now</div>
						</div>
						<div className="gap-2 flex flex-row">
							{tagsList.map((tag, index) => (
								<div className="px-2 py-0.5 bg-neutral-800 rounded-md justify-center items-center gap-2 flex">
									<div className="text-white text-xs font-medium font-['Inter'] leading-tight">{tag}</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
  );
}

export default VoiceHistoryListItem;
