"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useChara,useCover,useCoverHandler } from "../../_lib/utils";
import { Button, Divider, Input, Textarea } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import {
  ArrowUpIcon,
  ArrowUpRightIcon,
} from '@heroicons/react/24/outline'

function InforMation() {
  const t = useTranslations();
  const { chara , setChara } = useChara();
  const { cover , setCover } = useCover();
  const descTextareaRef = useRef(null);
  const { isReplacingTheCoverLoding, handleReplacingTheCover } = useCoverHandler();

  const [personalityValue, setpersonalityValue] = React.useState(chara.data.personality);
  const [descriptionValue, setDescriptionValue] = React.useState(chara.data.description);

  const handleDescriptionChange = (e:any) => {
    const newValue = e.target.value;
    setChara((prevChara) => ({
      ...prevChara,
      data: { ...prevChara.data, description: newValue },
    }));
    setDescriptionValue(newValue);
  };

  const handlePersonalityChange = (e:any) => {
    const newValue = e.target.value;
    setChara((prevChara) => ({
      ...prevChara,
      data: { ...prevChara.data, personality: newValue },
    }));
    setpersonalityValue(newValue);
  };

  const handleNameChange = (e:any) => {
    const newValue = e.target.value;
    setChara((prevChara) => ({
      ...prevChara,
      data: { ...prevChara.data, name: newValue },
    }));
  };

 
  const insertTextAtCursor = (text: string) => {
    const startPos = (descTextareaRef.current as any).selectionStart;
    const endPos = (descTextareaRef.current as any).selectionEnd;
    const value = (descTextareaRef.current as any).value;
    const textBefore = value.substring(0, startPos);
    const textAfter = value.substring(endPos, value.length);
    const newValue = textBefore + text + textAfter;

    (descTextareaRef.current as any).value = newValue;
    (descTextareaRef.current as any).selectionStart = startPos + text.length;
    (descTextareaRef.current as any).selectionEnd = startPos + text.length;

    setChara((prevChara) => ({
      ...prevChara,
      data: { ...prevChara.data, description: newValue },
    }));
    setDescriptionValue(newValue);
  };
 
  // const handleChange = (e) => {
  //   onChange(e.target.value);
  //   setCursorPosition(e.target.selectionStart);
  // };
 
  // const handleClick = () => {
  //   descTextareaRef.current.focus();
  //   descTextareaRef.current.setSelectionRange(cursorPosition, cursorPosition);
  // };
 
//   return (
//     <div>
//       <button onClick={() => insertTextAtCursor('Hello, World! ')}>Insert Text</button>
//       <textarea
//         ref={descTextareaRef}
//         value={value}
//         onChange={handleChange}
//         style={{ height: '100px', width: '300px' }}
//       />
//     </div>
//   );
// };
 
// export default InsertAtCursor;



  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="items-center gap-x-8 relative">
        <Image
          src={cover}
          width={384}
          height={384}
          alt=""
          className="h-auto w-full flex-none rounded-lg object-cover"
        />
        <div className="absolute top-0 right-0 flex content-start justify-end cursor-pointer w-16 h-16 bg-[url('/character-avatar-btn-bg.png')] bg-cover rounded-bl-xl">
          <input
              accept=".jpg,.jpeg,.png,.webp,.gif"
              type="file"
              id="ReplacingTheCover"
              style={{ display: 'none' }}
              className="h-12 w-12"
              onChange={(e) => handleReplacingTheCover(e, setCover)}
            />
            <Button
              isLoading={isReplacingTheCoverLoding}
              onClick={() => {
                const ReplacingTheCover = document.getElementById("ReplacingTheCover");
                if (ReplacingTheCover) {
                  ReplacingTheCover.click();
                }
              }}
              className="h-12 w-12 p-0 rounded-full bg-black relative"
              type="button"
              color="default"
              variant="flat"
              isIconOnly
            >
              <ArrowUpIcon className="h-8 w-8 text-white font-black absolute" aria-hidden="true" />
              {/* {t('Character.replacementofthecover')} */}
            </Button>
        </div>
      </div>
      <div
        className="col-span-2 bg-white rounded-[40px] flex flex-col"
      >
        <div className="flex flex-col justify-center bg-[#313131] rounded-[40px] h-[150px] p-7 bg-[url('/create-digitallife-name-bg.png')] bg-no-repeat bg-[center_right_1rem]">
          <label
            className="block text-3xl text-white"
          >
            {t('Character.charactername')}<span className="text-white">*</span>
          </label>
          <div className="mt-2">
            <input
              className="text-3xl text-right text-white bg-transparent border-none outline-none w-full"
              placeholder="请输入"
              value={chara.data.name}
              onChange={handleNameChange}
            />
          </div>
        </div>

        
        <div className="flex flex-col grow mt-6 px-6">
          <div className="h-6/12 py-4 flex flex-col">
            <label
              className="block text-lg font-medium leading-8 mb-1"
            >
              {t('Character.personalitysummary')}
            </label>
            {/* <div className="absolute top-1 right-10 border border-solid border-[#D8D8D8] h-10 w-50">打开PList生成器</div> */}
            <div className="flex flex-row mt-2 grow">  
              <div className="mr-4 grow">
                <textarea
                  placeholder="First Message"
                  value={chara.data.personality}
                  onChange={handlePersonalityChange}
                  className="border-none outline-none w-full h-full resize-none mb-6"
                />
              </div>
              <Button
                variant="ghost"
                className="border w-44 rounded-full"
                endContent={<ArrowUpRightIcon className="h-6 w-6"/>}
              >
                  打开PList生成器
              </Button> 
            </div>
            
          </div>
          <Divider className="bg-[#E6E6E6]" />
          <div className="h-6/12 py-4 flex flex-col">
            <label
              className="block text-lg font-medium leading-8 mb-1"
            >
              {t('Character.description')}
            </label>
            {/* <div className="absolute top-1 right-10 border border-solid border-[#D8D8D8] h-10 w-50">打开PList生成器</div> */}
            <div className="flex flex-row mt-2 grow">  
              <div className="mr-4 grow">
                <textarea
                  ref={descTextareaRef}
                  placeholder="Description"
                  value={chara.data.description}
                  onChange={handleDescriptionChange}
                  className="border-none outline-none w-full h-full resize-none mb-6"
                />
              </div>
              <div className="w-32 h-32 flex flex-col bg-[#D5D5D5] text-center rounded-xl text-[10px] cursor-pointer">
                <div
                  onClick={() => {
                    insertTextAtCursor('{玩家名称}');
                  }}
                  className="h-1/2 rounded-xl leading-[64px] text-[#272727]"
                >插入玩家名称</div>
                <div
                  onClick={() => {
                    insertTextAtCursor('{数字生命名称}');
                  }}
                  className="h-1/2 rounded-xl leading-[64px] bg-black text-white"
                >
                  插入数字生命名称
                </div>
              </div>
            </div>
            
          </div>
        </div>
        

        {/* <div className="">
          <label
            className="block text-sm font-medium leading-6"
          >
            {t('Character.createdby')}
          </label>
          <div className="mt-2">
            <Input
              value={chara.data.creator}
              onChange={(e) => setChara((prevChara) => ({ ...prevChara, data: { ...prevChara.data, creator: e.target.value } }))}
              maxLength={64}
              autoComplete="off"
              type="text"
              variant="underlined"
            />
          </div>
        </div>

        <div className="">
          <label
            className="block text-sm font-medium leading-6"
          >
            {t('Character.characterversion')}
          </label>
          <div className="mt-2">
            <Input
              value={chara.data.character_version}
              onChange={(e) => setChara((prevChara) => ({ ...prevChara, data: { ...prevChara.data, character_version: e.target.value } }))}
              maxLength={64}
              autoComplete="off"
              type="text"
              variant="underlined"
            />
          </div>
        </div>

        <div className="">
          <label
            className="block text-sm font-medium leading-6"
          >
            {t('Character.tagstoembed')}
          </label>
          <div className="mt-2">
            <Input
              value={chara.data.tags}
              onChange={(e) => setChara((prevChara) => ({ ...prevChara, data: { ...prevChara.data, tags: e.target.value } }))}
              autoComplete="off"
              type="text"
              variant="underlined"
            />
          </div>
        </div>

        <div className="">
          <label
            className="block text-sm font-medium leading-6"
          >
            {t('Character.creatorsnotes')}
          </label>
          <div className="mt-2">
            <Input
              value={chara.data.creator_notes}
              onChange={(e) => setChara((prevChara) => ({ ...prevChara, data: { ...prevChara.data, creator_notes: e.target.value } }))}
              autoComplete="off"
              type="text"
              variant="underlined"
            />
          </div>
        </div>

        <div className="">
          <label
            className="block text-sm font-medium leading-6"
          >
            {t('Character.talkativeness')}
          </label>
          <div className="mt-2">
            <Input
              value={chara.data.extensions.talkativeness}
              onChange={(e) => setChara((prevChara) => ({...prevChara,data: {...prevChara.data,extensions: {...prevChara.data.extensions,talkativeness: e.target.value}}}))}
              step={0.1}
              max={1}
              min={0}
              autoComplete="off"
              type="number"
              variant="underlined"
            />
          </div>
        </div>

        <div className="">
          <label
            className="block text-sm font-medium leading-6"
          >
            {t('Character.scenario')}
          </label>
          <div className="mt-2">
            <Input
              value={chara.data.scenario}
              onChange={(e) => setChara((prevChara) => ({ ...prevChara, data: { ...prevChara.data, scenario: e.target.value } }))}
              autoComplete="off"
              type="text"
              variant="underlined"
            />
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default InforMation;
