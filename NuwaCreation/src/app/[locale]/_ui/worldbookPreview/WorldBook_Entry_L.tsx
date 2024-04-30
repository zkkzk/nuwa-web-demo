"use client";
import React from "react";
import { useTranslations } from "next-intl";
import NuwaTextareaWrapper from "../components/NuwaTextareaWrapper";
import { TypeWorldBookEntriy } from "../../_lib/definitions";

export default function WorldBook_Entry_L({value, isPreview = false, onChange}: {
  value?: TypeWorldBookEntriy,
  isPreview?: boolean,
  onChange: (value: TypeWorldBookEntriy) => void,
}) {
  const t = useTranslations();


  return (
    <div className="h-[620px] flex flex-col divide-y">
      <div className="h-[120px] w-full flex items-center flex-row p-8">
        <div>{value?.comment}</div>
      </div>
      <div className="grow">
        <div>{value?.content}</div>
      </div>
    </div>
  );
}
