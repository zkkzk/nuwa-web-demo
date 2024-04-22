"use client";
import React from "react";
import { useTranslations } from "next-intl";
import NuwaTextareaWrapper from "../components/NuwaTextareaWrapper";
import { TypeCharacterBookEntriy } from "../../_lib/definitions";

export default function WorldBook_Entry_L({value, isPreview = false, onChange}: {
  value?: TypeCharacterBookEntriy,
  isPreview?: boolean,
  onChange: (value: TypeCharacterBookEntriy) => void,
}) {
  const t = useTranslations();


  return (
    <div className="h-[620px] flex flex-col divide-y">
      <div className="grow">
        <NuwaTextareaWrapper
          label={t('WorldBook.titlememo')}
          textareaProps={{
            disabled: isPreview,
            value: value?.comment,
            onChange: (e: { target: { value: any; }; }) => (
              onChange({ ...value, comment: e.target.value } as TypeCharacterBookEntriy)
            )
          }}
        >
        </NuwaTextareaWrapper>
      </div>
      <div className="grow">
        <NuwaTextareaWrapper
          label={t('WorldBook.content')}
          textareaProps={{
            disabled: isPreview,
            value: value?.content,
            onChange: (e: { target: { value: any; }; }) => (

              onChange({ ...value, content: e.target.value } as TypeCharacterBookEntriy)
            )
          }}
        >
        </NuwaTextareaWrapper>
      </div>
      <div className="grow">
        <NuwaTextareaWrapper
          label={t('WorldBook.primarykeywords')}
          textareaProps={{
            disabled: isPreview,
            value: value?.keys,
            onChange: (e: { target: { value: any; }; }) => (

              onChange({ ...value, keys: e.target.value } as TypeCharacterBookEntriy)
            )
          }}
        >
        </NuwaTextareaWrapper>
      </div>
    </div>
  );
}