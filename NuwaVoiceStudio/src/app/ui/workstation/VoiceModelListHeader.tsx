"use client";
import React, { useState } from "react";
import { Link, useRouter } from "@/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useAmDispatch } from "../components/AlterMessageContextProvider";
import VoiceHistory from "./VoiceHistory";
import VoiceList from "./VoiceList";
import MainStationControl from "./MainStationControl";
import NuwaTabs from "../components/NuwaTabs";
import { Tab } from "@nextui-org/react";
import { classNames } from "@/app/lib/utils";
import NuwaChipRadioGroup from "../components/NuwaChipRadioGroup";

type TypeFilterItem = {
  label: string;
  value: string;
};


function VoiceListHeader() {
  const router = useRouter();
  const t = useTranslations();
  const amDispatch = useAmDispatch();
  const [selected, setSelected] = useState("recent");
  const [selectedFilter, setSelectedFilter] = useState<TypeFilterItem | null>();
  const [filters, setFilters] = useState<Array<TypeFilterItem>>([{
    label: "Girl-12",
    value: "gril",
  }, {
    label: "Boy-23",
    value: "boy",
  }, {
    label: "Male-23",
    value: "male",
  }, {
    label: "Female-23",
    value: "female",
  }]);

  return (
    <div className="self-stretch justify-between items-center inline-flex bg-neutral-900 p-8 w-full">
      <div className="h-[41px] justify-start items-center gap-6 flex">
        <div className="text-white text-xl font-semibold font-['Archivo'] leading-normal">
          Voices
        </div>
        <div className="justify-start items-center gap-2.5 flex">
          <NuwaChipRadioGroup
            items={filters}
            value={selectedFilter}
            onChange={(e: any) => {
              if (e) {
                setSelectedFilter(e.target.value)
              } else {
                setSelectedFilter(null)
              }
            }}
          />
        </div>
      </div>

      <NuwaTabs
        aria-label="Options"
        variant="bordered"        
        selectedKey={selected}
        onSelectionChange={(key) => setSelected(key as string)}
      >
        <Tab key="recent" title="Recent">
        </Tab>
        <Tab key="collection" title="Collection">
        </Tab>
      </NuwaTabs>
    </div>
  );
}

export default VoiceListHeader;
