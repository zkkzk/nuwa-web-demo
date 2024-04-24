"use client"

import React, { useState } from "react";
import { getCharaList, useChara, useCharaList, useCover, pushCharaList } from "../../_lib/utils";
import { useTranslations, useMessages } from "next-intl";
import { NoSymbolIcon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Link } from "@/navigation";
import LIVE2DIcon from "../icons/LIVE2DIcon";
import { TypeAvatarType } from "../../_lib/definitions.avatar";
import A3DIcon from "../icons/A3DIcon";
import ImageIcon from "../icons/ImageIcon";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Popover, PopoverContent, PopoverTrigger, useDisclosure } from "@nextui-org/react";
import IconCard, {IconCardType} from "../components/IconCard";
import NuwaButton from "../components/NuwaButton";
import CharacterCreate from "./CharacterCreate";
import { TypeCharaList, TypeCharaListItem } from "../../_lib/definitions";
import CharacterEdit from "./CharacterEdit";

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export default function CharacterList() {
  const t = useTranslations();
  const messages = useMessages();
  let initCharaList = getCharaList();
  const [charaList, setCharaList] = useState<TypeCharaList>(initCharaList);
  const { chara , setChara } = useChara();
  const { cover , setCover } = useCover();
  const [ editChara, setEditChara ] = useState<TypeCharaListItem>();
  const uploadModal = useDisclosure();


  const deleteChara = ({index}: {index: number}) => {
    const newCharaList = charaList.filter((_, i) => i !== index);
    pushCharaList(charaList.filter((_, i) => i !== index));
    setCharaList(newCharaList);
  }


  return (
    <>
      <div className="relative bg-white h-full w-full pt-2 pb-40 rounded-[40px] px-10">
        <div className="flex flex-row justify-end mt-2 z-40">
          <CharacterCreate
            onCreateDone={(newChara) => {
              setCharaList(getCharaList())
            }} />
        </div>
        <div className="flex flex-wrap flex-row gap-4">
          {charaList.map((chara, index) => (
            <div className="w-[212px] group relative" key={chara.uid}>
              <Image
                src={chara.cover}
                width={212}
                height={250}
                alt=""
                className="w-[212px] h-[250px] flex-none object-cover rounded-[14px] border border-neutral-400 border-opacity-50"
              />
              <div className="w-[212px] h-[250px] absolute top-0 bg-gray-50/50 hidden group-hover:block" />
              <div className="w-full h-[36px] text-center text-stone-950 text-lg font-semibold leading-loose tracking-tight">{chara.chara.name}</div>
              <div className="absolute top-4 right-4 flex flex-col gap-4">
                <Popover placement="top" color='warning'>
                  <PopoverTrigger>
                    <Button
                      className="bg-black text-white opacity-0 group-hover:opacity-100"
                      startContent={<TrashIcon className="h-5 w-5"/>}
                      isIconOnly
                    ></Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Button 
                      className="w-full" 
                      size="sm" 
                      color="warning"
                      onClick={() => {
                        deleteChara({index})
                        // setChara(prev => ({
                        //   ...prev,
                        //   data: {
                        //     ...prev.data,
                        //     alternate_greetings: prev.data.alternate_greetings.filter((_, i) => i !== index)  
                        //   }
                        // }))
                        // setDeleteCount(deleteCount + 1);
                      }}
                    >    
                      {t('Previews.mymindismadeup')}
                    </Button>
                  </PopoverContent>
                </Popover>

                <Button
                  className="bg-black text-white opacity-0 group-hover:opacity-100"
                  startContent={<PencilIcon className="h-5 w-5"/>}
                  isIconOnly
                  onClick={() => {
                    setEditChara(chara);
                  }
                  }
                ></Button>
              </div>
            </div>
          ))}
        </div>
        <CharacterEdit chara={editChara} onDone={() => {
          setEditChara(undefined);
          setCharaList(getCharaList());
        }} />
      </div>
    </>
  );
}
