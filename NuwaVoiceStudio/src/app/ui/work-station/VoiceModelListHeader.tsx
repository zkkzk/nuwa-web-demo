"use client";
import React, { useState } from "react";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { useAmDispatch } from "../components/alter-message/AlterMessageContextProvider";
import { Tab, Tabs } from "@nextui-org/react";
import NuwaChipRadioGroup from "../components/NuwaChipRadioGroup";
import { voiceModelFilterType } from "@/app/lib/definitions.InstantGenerateParamster";

type TypeFilterItem = {
  label: string;
  value: string;
};

function VoiceListHeader({
  filters= {
    type: "",
    name: "",
  },
  onChange
}: {
  filters: voiceModelFilterType,
  onChange: (newFilters: voiceModelFilterType) => void
}) {
  const router = useRouter();

  return (
    <div className="self-stretch justify-between items-center inline-flex bg-neutral-900 px-8 pt-10 w-full">
      <div className="h-[41px] justify-start items-center gap-6 flex">
        <div className="text-white text-xl font-semibold font-['Archivo'] leading-normal">
          Voices
        </div>
      </div>

      <Tabs
        aria-label="Options"  
        selectedKey={filters.type}
        onSelectionChange={(key) => {
          onChange({
            ...filters,
            type: key as any
          })
        }}
        classNames={{
          panel: "p-0 w-full"
        }}
      >
        <Tab key="browse" title="Recent">
        </Tab>
        <Tab key="collection" title="Collection">
        </Tab>
      </Tabs>
    </div>
  );
}

export default VoiceListHeader;
