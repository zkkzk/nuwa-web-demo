"use client";
import React, { useState } from "react";
import { Link, useRouter } from "@/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useAmDispatch } from "../components/AlterMessageContextProvider";
import NuwaTabs from "../components/NuwaTabs";
import { Tab } from "@nextui-org/react";
import FilterIcon from "@/app/icons/FilterIcon";

function VoiceHistoryControl() {
  const router = useRouter();
  const t = useTranslations();
  const amDispatch = useAmDispatch();
  const [selected, setSelected] = useState("Voices");

  return (
    <div className="p-8 bg-neutral-900">
			<div className="self-stretch justify-between items-center inline-flex w-full mb-5">
					<div className="text-white text-xl font-semibold font-['Archivo'] leading-normal">History</div>
					<div className="w-[106px] self-stretch px-4 py-3 rounded-[48px] border-2 border-neutral-800 justify-start items-center gap-2 flex">
							<div className="text-slate-100 text-sm font-medium font-['Inter']">Filters</div>
							<FilterIcon className="w-6 h-6" />
					</div>
			</div>
			<NuwaTabs
				aria-label="Options"
				variant="bordered"        
				selectedKey={selected}
				onSelectionChange={(key) => setSelected(key as string)}
				fullWidth
			>
				<Tab key="Voices" title="Voices">
				</Tab>
				<Tab key="API" title="API">
				</Tab>
			</NuwaTabs>
		</div>
  );
}

export default VoiceHistoryControl;
