"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Slider } from "@nextui-org/react";
import { useCharaListItem, useCharaListItemDispatch } from "../charas/CharaContext";
import { textareaProps } from "../components/NuwaTextarea";

function AdvancedSet_Talkativeness() {
  const t = useTranslations();
 
  const charaListItem = useCharaListItem();
  const charaListItemDispatch = useCharaListItemDispatch();
  const setCharaListItem = (newValue: string) => {
    charaListItemDispatch({
      type: "changed",
      payload: {
        ...charaListItem,
        chara: {
          ...charaListItem.chara,
          data: {
            ...charaListItem.chara.data,
            extensions: {
              ...charaListItem.chara.data.extensions,
              talkativeness: newValue
            }
          }
        }
      },
    })
  }

  return (
    
    <div className="h-full w-full relative">
      <div className="flex flex-col items-start">
        <label className={`${textareaProps.classNames.label} mb-0 mr-4`}>
          {t('Character.talkativeness')}
        </label>
        <Slider 
          showTooltip={false}
          step={0.1} 
          maxValue={1}
          minValue={0}
          marks={[
            {
              value: 0,
              label: t('Character.talkativeness0'),
            },
            {
              value: 0.5,
              label: t('Character.talkativeness05'),
            },
            {
              value: 1,
              label: t('Character.talkativeness1'),
            },
          ]}
          defaultValue={0.5}
          classNames={{
            base: "max-w-md",
            track: "border-l-black",
            mark: "text-nowrap w-8",
            filler: "bg-black",
            labelWrapper: "mb-2",
            label: "font-medium text-default-700 text-medium",
            value: "font-medium text-default-500 text-small",
            thumb: [
              "transition-size",
              "bg-black",
              "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
              "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6"
            ],
            step: "data-[in-range=true]:bg-black/30"
          }}
          value={charaListItem.chara.data.extensions.talkativeness as unknown as number}
          onChange={(value) => {
            setCharaListItem(value.toString())
          }}
          ></Slider>
      </div>
    </div>
  );
}

export default AdvancedSet_Talkativeness;
