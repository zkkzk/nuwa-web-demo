"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import A3DIcon from "@/app/icons/A3DIcon";
import ImageIcon from "@/app/icons/ImageIcon";
import LIVE2DIcon from "@/app/icons/LIVE2DIcon";
import { useTranslations } from "next-intl";
import { CircularProgress } from "@nextui-org/react";

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export const CharacterAvatarCardType = {
  "LIVE2D": LIVE2DIcon,
  "VRM": A3DIcon,
  "IMAGE": ImageIcon,
}

function CharacterAvatarCard({avatar}: {avatar: any }) {

  const t = useTranslations();
  const [url, setUrl] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  
  useEffect(() => {
    if (avatar.type === "IMAGE") {
      setUrl(avatar.url)
      setIsLoading(false);
    }
    if (avatar.type === "LIVE2D") {
      getLive2DAvatar()
    }
  }, [])

  const getLive2DAvatar = async () => {
    const response = await fetch(avatar.url, {
      method:"get",       
    });

    if(response.ok){
      const data = await response.json();
      const urlObj = new URL(avatar.url);
      const pathname = urlObj.pathname;
      const directoryName = pathname.substring(0, pathname.lastIndexOf('/') + 1);
      const newUrl = `${urlObj.origin}${directoryName}${data.FileReferences.Textures[0]}`;
      await fetch(newUrl, {
        method:"get",       
      })
      setUrl(newUrl);
      setIsLoading(false);
    }
  }


  
  return (
    <div
      className='group overflow-hidden shrink-0 flex flex-col items-center justify-center border border-neutral-400 border-opacity-50 cursor-pointer w-[174px] h-[206px] rounded-[14px]'
    >
    {isLoading && (
      <CircularProgress size="md" aria-label="Loading..."/>
    )}
    {(avatar.type === "LIVE2D" && !isLoading) && (
      <Image fill={true} src={url} alt="" className="rounded-[14px] flex-none object-cover" />
    )}
    {(avatar.type === "VRM" && !isLoading) && (
      <A3DIcon
        className={classNames('w-24 group-hover:fill-white')}
        aria-hidden="true"
      />
    )}
    {(avatar.type === "IMAGE" && !isLoading) && (
      <Image fill={true} src={avatar.url} alt="" className="rounded-[14px] flex-none object-cover" />
    )}

      {/* <div className={classNames('text-center text-base font-normal leading-[29px] tracking-tight group-hover:text-white')} >{t(`Character.${avatar.type}`)}</div> */}
    </div>
  );
}

export default CharacterAvatarCard;
