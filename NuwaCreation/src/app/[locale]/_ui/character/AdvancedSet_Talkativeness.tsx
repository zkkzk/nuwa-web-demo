"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Slider } from "@nextui-org/react";
import { useCharaListItem, useCharaListItemDispatch } from "../charas/CharaContext";

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
    <div className="bg-white h-full w-full rounded-[40px] relative flex flex-col">
      <div className="flex grow flex-col h-auto w-full py-7 px-7 rounded-[40px]">
        <label
          className="text-neutral-950 text-lg font-semibold leading-loose tracking-tight"
        >
          {t('Character.talkativeness')}
        </label>
        <div className="mt-10">
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
    </div>
  );
}

export default AdvancedSet_Talkativeness;
