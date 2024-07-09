"use client";
import React, { useState } from "react";
import { Link, useRouter } from "@/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Tab, Tabs } from "@nextui-org/react";
import FilterIcon from "@/app/icons/FilterIcon";
import { InfType } from "@/app/lib/definitions.voice";

function VoiceHistoryControl({
	type,
  onChange,
}: {
	type: InfType
  onChange?: (infType: InfType) => void;
}) {
  const router = useRouter();
  const t = useTranslations();

  return (
    <>
			<div className="self-stretch justify-between items-center inline-flex w-full mb-5">
					<div className="text-white text-xl font-semibold font-['Archivo'] leading-normal">History</div>
					{/* <div className="w-[106px] self-stretch px-4 py-3 rounded-[48px] border-2 border-neutral-800 justify-start items-center gap-2 flex">
							<div className="text-slate-100 text-sm font-medium font-['Inter']">Filters</div>
							<FilterIcon className="w-6 h-6" />
					</div> */}
			</div>
			<Tabs
				aria-label="Options"     
				selectedKey={type}
				onSelectionChange={(key) => onChange && onChange(key as InfType)}
				classNames={{
					panel: "p-0 w-full"
				}}
				fullWidth
			>
				<Tab key="audio" title="Voices">
				</Tab>
				<Tab key="code" title="API">
				</Tab>
			</Tabs>
		</>
  );
}

export default VoiceHistoryControl;
