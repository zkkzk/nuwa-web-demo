"use client"

import React, { createRef, RefObject, useEffect, useRef } from "react";
import { useChara } from "../../_lib/utils";
import { useTranslations, useMessages, useLocale } from "next-intl";
import { NoSymbolIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import MicrosoftTTSIcon from "../icons/MicrosoftTTSIcon";
import Image from "next/image";
import { Divider, Listbox, ListboxItem, Tab, Tabs } from "@nextui-org/react";
import { Link } from "@/navigation";

enum TypeVoiceType {
  None = 'None',
  Microsoft = 'Microsoft',
}
enum voiceSex {
  Male = 'male',
  Female = 'female',
}

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

type TypeVoiceName = {
  audio: string;
  name: string;
  value: string,
}

type TypeVoiceNameList = {
  [key in voiceSex]: TypeVoiceName[]
}

const locales = ["en", "zh-CN"];


const voiceNameListData : any= {
  "en": {
    "male": [
      { "name": "xiaoming", "value": "ming1", audio: "https://cvoiceprodeus.blob.core.windows.net/acc-public-files/285eecc3370e47dcb1a3263c3b6de892/52a21082-b98d-4f5d-8671-989490e588ec.wav"},
      { "name": "xiaohei", "value": "hei2", audio: "https://cvoiceprodeus.blob.core.windows.net/acc-public-files/285eecc3370e47dcb1a3263c3b6de892/52a21082-b98d-4f5d-8671-989490e588ec.wav"}
    ],
    "female": [
      { "name": "xiaohong", "value": "hong3",audio: "https://cvoiceprodeus.blob.core.windows.net/acc-public-files/285eecc3370e47dcb1a3263c3b6de892/52a21082-b98d-4f5d-8671-989490e588ec.wav"},
      { "name": "xiaomei", "value": "mei4", audio: "https://cvoiceprodeus.blob.core.windows.net/acc-public-files/285eecc3370e47dcb1a3263c3b6de892/52a21082-b98d-4f5d-8671-989490e588ec.wav"}
    ]
  },
  "zh-CN": {
    "male": [
      { "name": "小明", "value": "ming5", audio: "https://cvoiceprodeus.blob.core.windows.net/acc-public-files/285eecc3370e47dcb1a3263c3b6de892/52a21082-b98d-4f5d-8671-989490e588ec.wav"},
      { "name": "小黑", "value": "hei6", audio: "https://cvoiceprodeus.blob.core.windows.net/acc-public-files/285eecc3370e47dcb1a3263c3b6de892/e8f4c1c0-c6f6-43d0-9885-8e0a87ebd9cb.wav"}
    ],
    "female": [
      { "name": "小红", "value": "hong7", audio: "https://cvoiceprodeus.blob.core.windows.net/acc-public-files/285eecc3370e47dcb1a3263c3b6de892/52a21082-b98d-4f5d-8671-989490e588ec.wav"},
      { "name": "小美", "value": "mei8", audio: "https://cvoiceprodeus.blob.core.windows.net/acc-public-files/285eecc3370e47dcb1a3263c3b6de892/52a21082-b98d-4f5d-8671-989490e588ec.wav"}
    ]
  }
}

export default function Voice() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const t = useTranslations();
  const messsage = useMessages();
  const locale = useLocale();
  const { chara , setChara } = useChara();
  const initVoiceNameList = voiceNameListData[locale];

  const [selectedVoiceType, setSelectedVoiceType] = React.useState<TypeVoiceType>(chara.data.extensions.voice?.type as TypeVoiceType || TypeVoiceType.None);
  
  const [selectedVoiceSex, setSelectedVoiceSex] = React.useState<voiceSex>(chara.data.extensions.voice?.sex as voiceSex || voiceSex.Male);
  const [selectedVoiceName, setSelectedVoiceName] = React.useState<string>(chara.data.extensions.voice?.name || '');

  const [voiceNameList, setVoiceNameList] = React.useState<TypeVoiceNameList>(initVoiceNameList);

  const handleSetSelectedVoiceType = (voiceType : TypeVoiceType) => {
    setSelectedVoiceType(voiceType)
    setChara((prevChara) => ({
      ...prevChara,
      data: {
        ...prevChara.data,
        extensions: {
          ...prevChara.data.extensions,
          voice: null
        }
      },
    }));
  }

  useEffect(() => {
    // console.log(selectedVoiceName);
    setVoiceToChar();
  }, [selectedVoiceName]);

  const setVoiceToChar = () => {
    setChara((prevChara) => ({
      ...prevChara,
      data: {
        ...prevChara.data,
        extensions: {
          ...prevChara.data.extensions,
          voice: {
            type: selectedVoiceType,
            sex: selectedVoiceSex,
            name: selectedVoiceName,
          }
        }
      },
    }));
  };
 

  return (
    <>
      <div className="relative bg-white h-full w-full py-20 rounded-[40px]">
        <div className="px-7">
          <h2 className="text-lg font-semibold">{t('Character.voice')}</h2>
          <div className="text-stone-500 text-[8.50px] font-normal leading-none tracking-tight mt-2">{t('Character.voicetab.desc')}</div>
          <div className="flex flex-row gap-[42px] mt-[20px]">
            <div
              onClick={() => handleSetSelectedVoiceType(TypeVoiceType.None)}
              className={classNames('flex flex-col items-center justify-center border border-neutral-400 border-opacity-50 cursor-pointer w-[174px] h-[206px] rounded-[14px]', (
                selectedVoiceType === TypeVoiceType.None ? 'bg-black': 'bg-white'
              ))}
            >
              <NoSymbolIcon className={classNames('h-32 w-32  font-black', (
                selectedVoiceType === TypeVoiceType.None ? 'text-white' : 'text-stone-950'
              ))} aria-hidden="true" />
              <div className={classNames('text-center text-base font-normal leading-[29px] tracking-tight', (
                selectedVoiceType === TypeVoiceType.None ? 'text-white' : 'text-stone-950'
              ))} >None</div>
            </div>
            <div
              onClick={() => handleSetSelectedVoiceType(TypeVoiceType.Microsoft)}
              className={classNames('flex flex-col items-center justify-center border border-neutral-400 border-opacity-50 cursor-pointer w-[174px] h-[206px] rounded-[14px]', (
                selectedVoiceType === TypeVoiceType.Microsoft ? 'bg-black': 'bg-white'
              ))}
            >
              <MicrosoftTTSIcon color={selectedVoiceType === TypeVoiceType.Microsoft ? 'white' : 'black'} className={classNames('h-32 w-32')} aria-hidden="true" />
              <div className={classNames('text-center text-base font-normal leading-[29px] tracking-tight', (
                selectedVoiceType === TypeVoiceType.Microsoft ? 'text-white' : 'text-stone-950'
              ))} >Microsoft TTS API</div>
            </div>
            <div className="flex flex-col items-center justify-center w-[174px] h-[206px] ">
              <Image width={96} height={20} src="/character-voice-more.png" alt="" />
              <div className="text-center text-stone-950 text-base font-normal leading-[29px] tracking-tight">MORE TO COME</div>
            </div>
          </div>
        </div>
        {selectedVoiceType !== TypeVoiceType.None && (
          <>
            <Divider className="my-4 px-2" />
            <div className="py-8 px-7">
              <div className="mb-5 text-black text-base font-semibold leading-[29px] tracking-tight">{t('Character.voicetab.sex')}</div>
              <Tabs
                aria-label="Options"         
                selectedKey={selectedVoiceSex}
                onSelectionChange={(key) => setSelectedVoiceSex(key as voiceSex)}
                classNames={{
                  base: "",
                  tabList: "w-[313px] h-[62px] bg-black rounded-[17px] justify-center",
                  
                  tab:"w-[136px] h-[35px] bg-black rounded-[10px] group-data-[selected=true]:bg-white",
                  tabContent: "text-zinc-800 text-white group-data-[selected=true]:text-black",
                }}
              >
                  <Tab key={voiceSex.Male} title={t(`Character.voicetab.${voiceSex.Male}`)} />
                  <Tab key={voiceSex.Female} title={t(`Character.voicetab.${voiceSex.Female}`)} />
              </Tabs>
            </div>
            <Divider className="my-4 px-2" />
            <div className="py-8 px-7">
              <div className="mb-5 text-black text-base font-semibold leading-[29px] tracking-tight">{t('Character.voicetab.type')}</div>
              <div  className="w-[260px] px-1 py-2">
                <Listbox 
                  aria-label="Single selection example"
                  variant="light"
                  hideSelectedIcon={true}
                  shouldHighlightOnFocus={false}
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selectedVoiceName}
                  classNames={{
                    list: 'gap-4 w-auto'
                  }}
                  onSelectionChange={(key : any) => {
                    setSelectedVoiceName(key.currentKey)
                  }}
                >
                  {voiceNameList[selectedVoiceSex].map((item: TypeVoiceName) => {
                    return (
                      <ListboxItem 
                      classNames={{
                        "base": classNames('w-[356px] h-[62px] text-end rounded-full px-4 hadow border border-black', (
                          selectedVoiceName === item.value ? 'text-white bg-black' : 'text-black bg-white'
                        )),
                        "title": classNames('text-[18px] font-semibold leading-[29px] tracking-tight', (
                          selectedVoiceName === item.value ? 'text-white' : 'text-black'
                        ))
                      }}
                      shouldHighlightOnFocus={false}
                      key={item.value}
                      value={item.value}
                      startContent={
                        <PlayCircleIcon
                          className={classNames('h-8 w-8 font-black', (
                            selectedVoiceName === item.value ? 'text-white' : 'text-black'
                          ))}
                          aria-hidden="true"
                          onClick={() => {
                            (audioRef.current as any).src = item.audio;
                            (audioRef.current as any).play();
                          }}
                        />
                      }
                    >
                      {item.name}
                    </ListboxItem>
                    )
                  })}
                </Listbox>
              </div>
            </div>
          </>
        )}
        
        <audio
          ref={audioRef}
          preload="none"
        />

        <Link href='/character/avatar'>
          <Image className=" absolute right-10 -bottom-1 cursor-pointer" width={120} height={114} src="/character-nexttab.png" alt="" />
        </Link>
      </div>
    </>
  );
}
