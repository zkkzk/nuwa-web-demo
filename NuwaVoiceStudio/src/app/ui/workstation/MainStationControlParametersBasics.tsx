"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useAmDispatch } from "../components/AlterMessageContextProvider";
import NuwaSelect, { NuwaSelectItem } from "../components/NuwaSelect";
import NuwaSliderInput from "../components/NuwaSliderInput";
import { TypeInstantGenerateParamster } from "@/app/lib/definitions.InstantGenerateParamster";


function MainStationControlParametersBasics({
  value,
  onChange,
}: {
  value:TypeInstantGenerateParamster,
  onChange: (value:TypeInstantGenerateParamster)=>void,
}) {
  const t = useTranslations();
  const amDispatch = useAmDispatch();
  const [selected, setSelected] = useState("photos");
  const [isReset, setIsReset] = useState(false);

  const languageList = [{
    value: "en",
    label: "English"
  }, {
    value: "zh",
    label: "中文"
  }, {
    value: "ja",
    label: "日本語"
  }, {
    value: "ko",
    label: "한국어"
  }, {
    value: "es",
    label: "Español"
  }, {
    value: "fr",
    label: "Français"
  }];

  return (
    <div className="self-stretch rounded-xl justify-end items-center gap-12 grid grid-cols-1 lg:grid-cols-2">
      <NuwaSelect
        variant="bordered"
        size="lg"
        label="Language"
        placeholder="Select an language"
        labelPlacement="outside"
        selectedKeys={[value.language]}
        onChange={(e) => onChange({ ...value, language: e.target.value })}
      >
        {languageList.map((Language) => (
            <NuwaSelectItem
              key={Language.value}
              value={Language.value}
            >
              {Language.label}
            </NuwaSelectItem>
        ))}
      </NuwaSelect>
      <NuwaSliderInput
        label="Speed"
        step={0.01} 
        maxValue={4} 
        minValue={0.25} 
        value={value.speed}
        onChange={(speed) => onChange({ ...value, speed: speed })}
      />
      <NuwaSelect
        variant="bordered"
        size="lg"
        label="Segmentation Method"
        placeholder="Select an segmentation method"
        labelPlacement="outside"
        selectedKeys={[value.segmentationMethod]}
        onChange={(e) => onChange({ ...value, segmentationMethod: e.target.value })}
      >
        {languageList.map((Language) => (
            <NuwaSelectItem
              key={Language.value}
              value={Language.value}
            >
              {Language.label}
            </NuwaSelectItem>
        ))}
      </NuwaSelect>
      <NuwaSliderInput
        label="Max words allowed per sentence"
        step={1} 
        maxValue={500} 
        minValue={5} 
        value={value.maxWords}
        onChange={(maxWords) => onChange({ ...value, maxWords: maxWords })}
      />

    </div>
  );
}

export default MainStationControlParametersBasics;
