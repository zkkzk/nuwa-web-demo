"use client";
import React from "react";
import { useTranslations } from "next-intl";

import PreviewTitle from "./PreviewTitle";
import PreviewWrapper from "./PreviewWrapper";
import { useCharaListItem } from "../charas/CharaContext";

function Preview_AdvancedSet() {
  const t = useTranslations();
  const charaListItem = useCharaListItem();
  const { chara } = charaListItem;

  return (
    <div>   
      <PreviewTitle>{t('Character.advancedset')}</PreviewTitle>
      <div className="grid grid-rows-2 grid-cols-2 gap-4 w-full">
        <div className="row-span-1 col-span-1 min-h-[156px]">
          <PreviewWrapper>
            <div className="h-full px-9 py-7 flex flex-col justify-between">
              <div className="grow">{chara.data.extensions.depth_prompt.depth}</div>
              <div className="text-neutral-800 text-2xl font-semibold leading-[43.49px] tracking-tight text-right">{t('Character.depthprompt')}</div>
            </div>
          </PreviewWrapper>
        </div>
        <div className="row-span-1 col-span-1 min-h-[156px]">
          <PreviewWrapper>
            <div className="h-full px-9 py-7 flex flex-col justify-between">
              <div className="grow">{chara.data.extensions.talkativeness}</div>
              <div className="text-neutral-800 text-2xl font-semibold leading-[43.49px] tracking-tight text-right">{t('Character.talkativeness')}</div>
            </div>
          </PreviewWrapper>
        </div>
        <div className="row-span-1 col-span-1 min-h-[156px]">
          <PreviewWrapper>
            <div className="h-full px-9 py-7 flex flex-col justify-between">
              <div className="grow">{chara.data.post_history_instructions}</div>
              <div className="text-neutral-800 text-2xl font-semibold leading-[43.49px] tracking-tight text-right">{t('Character.jailbreak')}</div>
            </div>
          </PreviewWrapper>
        </div>
        <div className="row-span-1 col-span-1 min-h-[156px]">
          <PreviewWrapper>
            <div className="h-full px-9 py-7 flex flex-col justify-between">
              <div className="grow">{chara.data.system_prompt}</div>
              <div className="text-neutral-800 text-2xl font-semibold leading-[43.49px] tracking-tight text-right">{t('Character.mainprompt')}</div>
            </div>
          </PreviewWrapper>
        </div>
      </div>
    </div>
  );
}

export default Preview_AdvancedSet;