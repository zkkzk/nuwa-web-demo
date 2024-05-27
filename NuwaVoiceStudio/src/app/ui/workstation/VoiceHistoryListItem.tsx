"use client";
import React, { useState } from "react";
import { Link, useRouter } from "@/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useAmDispatch } from "../components/AlterMessageContextProvider";
import NuwaTabs from "../components/NuwaTabs";
import { Tab } from "@nextui-org/react";
import FilterIcon from "@/app/icons/FilterIcon";
import VoiceHistoryControl from "./VoiceHistoryControl";

function VoiceHistoryListItem() {
  const router = useRouter();
  const t = useTranslations();
  const amDispatch = useAmDispatch();
  const [selected, setSelected] = useState("Voices");

  return (
		<div className="self-stretch h-[360px] flex-col justify-center items-start gap-6 flex">
				<div className="self-stretch h-[360px] rounded-xl flex-col justify-start items-start gap-2 flex">
						<div className="self-stretch h-[328px] p-6 bg-neutral-800 rounded-xl flex-col justify-start items-start gap-4 flex">
								<div className="self-stretch h-[121px] flex-col justify-start items-start gap-2.5 flex">
										<div className="self-stretch justify-start items-start gap-6 inline-flex">
												<div className="justify-start items-start gap-2 flex">
														<div className="rounded-2xl justify-end items-center flex">
																<img className="w-16 h-16" src="https://via.placeholder.com/64x64" />
														</div>
												</div>
												<div className="grow shrink basis-0 self-stretch flex-col justify-between items-start inline-flex">
														<div className="self-stretch text-white text-lg font-semibold font-['Archivo'] leading-normal">Male Neo Soul</div>
														<div className="px-2 py-1 bg-neutral-800 rounded-md justify-center items-center gap-2 inline-flex">
																<div className="text-white text-sm font-medium font-['Inter']">😀 Joyful</div>
														</div>
												</div>
										</div>
										<div className="self-stretch"><span className="text-primary text-sm font-medium font-['Inter']">Your audio has been successfully generated. You may</span><span className="text-white text-sm font-medium font-['Inter']"> further customize it or simply download it for use.</span></div>
								</div>
								{/* <div className="self-stretch h-[83px] flex-col justify-start items-start gap-2 flex">
										<div className="pl-3.5 pr-[18px] pt-[11px] pb-2.5 bg-neutral-900 rounded-xl justify-start items-center gap-3 inline-flex">
												<div className="w-8 h-8 relative bg-white rounded-[32px] flex-col justify-start items-start flex">
														<div className="w-[3px] h-3 bg-neutral-900 rounded-sm" />
														<div className="w-[3px] h-3 bg-neutral-900 rounded-sm" />
												</div>
												<div className="self-stretch rounded-sm justify-start items-center gap-0.5 inline-flex">
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
												</div>
										</div>
										<div className="self-stretch justify-between items-center inline-flex">
												<div className="text-gray-500 text-xs font-medium font-['Inter']">0:21</div>
												<div className="text-gray-500 text-xs font-medium font-['Inter']">1:02</div>
										</div>
								</div> */}
								<div className="self-stretch justify-start items-start gap-4 inline-flex">
										<div className="px-6 py-3 rounded-xl border-2 border-zinc-700 justify-center items-center gap-2 flex">
												<div className="text-slate-200 text-sm font-semibold font-['Inter']">Download</div>
												<div className="w-5 h-5 relative" />
										</div>
										<div className="px-6 py-3 rounded-xl border-2 border-zinc-700 justify-center items-center gap-2 flex">
												<div className="text-slate-200 text-sm font-semibold font-['Inter']">API</div>
												<div className="w-5 h-5 relative" />
										</div>
								</div>
						</div>
						<div className="self-stretch h-6 flex-col justify-start items-end flex">
								<div className="self-stretch justify-between items-center inline-flex">
										<div className="justify-start items-start gap-2 flex">
												<div className="text-gray-500 text-xs font-medium font-['Inter']">Just now</div>
										</div>
										<div className="px-2 py-0.5 bg-neutral-800 rounded-md justify-center items-center gap-2 flex">
												<div className="text-white text-xs font-medium font-['Inter'] leading-tight">tag</div>
										</div>
								</div>
						</div>
				</div>
		</div>
  );
}

export default VoiceHistoryListItem;
