"use client";
import React, { useState } from "react";
import { Chip, Input } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { TagIcon } from "@heroicons/react/24/solid";
import NuwaButton from "../components/NuwaButton";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { trim } from "lodash-es";
import { useCharaListItem, useCharaListItemDispatch } from "../charas/CharaContext";
import { TypeCharaListItem } from "../../_lib/definitions";

function Preview_AddTags() {
  const t = useTranslations();

  const charaListItem = useCharaListItem();
  const charaDispatch = useCharaListItemDispatch();


  const handleTagsChange = (newValue: string) => {
    const newChara:TypeCharaListItem = {
      ...charaListItem,
      chara: {
        ...charaListItem.chara,
        name: newValue,
        data: {
          ...charaListItem.chara.data,
          tags: newValue
        }
      }
    };

    charaDispatch({
      type: "changed",
      payload: newChara,
    })
  };

  
  const [tagsList, setTagsList ] = useState<string[]>(charaListItem.chara.data.tags.toString().split(',').filter((item) => (trim(item) !== '')) || []);
  const [inputVal, setInputVal ] = useState<string>("");
  
  return (
    <>   
      <div className="flex flex-row items-center">
        <div className="text-black text-3xl font-semibold leading-[54.36px] tracking-tight mr-6 shrink-0">{t('Preview.tags')}</div>
        <div className="text-black text-sm font-normal leading-relaxed tracking-tight">{t('Preview.tagTip')}</div>
      </div>

      <div>

      <Input
        placeholder={t('Preview.tagsinputplaceholder')}
        classNames={{
          base: 'mb-2',
          inputWrapper: 'h-16 bg-zinc-100'
        }}
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        startContent={
          <TagIcon className="h-5 w-5 text-default-400 pointer-events-none flex-shrink-0" />
        }
        endContent={
          <NuwaButton className=" h-14 w-20 text-xl" color="black" variant="flat" onClick={() => {
            const newTagsList = [...tagsList, inputVal]
            setTagsList(newTagsList);
            handleTagsChange(newTagsList.join(','))
            setInputVal("");

          }}>{t('Preview.tagAddButton')}</NuwaButton>
        }
      />

      <div className="flex flex-wrap gap-4">
        {tagsList.map((item: string, index: number) => (
          <Chip
            key={index}
            classNames={{
              base: "h-9 cursor-pointer bg-zinc-300 bg-opacity-40 rounded-[11px] w-auto px-4",
            }}
            endContent={<XMarkIcon className="h-4 w-4" onClick={() => {
              tagsList.splice(index, 1)
              setTagsList(tagsList);
              handleTagsChange(tagsList.join(','))
            }} />}
            variant="flat" 
          >
            {item}
          </Chip>
        ))}
      </div>
      </div>
    </>
  );
}

export default Preview_AddTags;
