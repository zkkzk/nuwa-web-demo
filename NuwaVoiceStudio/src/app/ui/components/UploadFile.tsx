"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";
import { uploadImage, uploadFile } from "@/app/lib/oss";
import { getOssToken } from "@/app/lib/oss.api";
import { useAmDispatch } from "./AlterMessageContextProvider";

function UploadFile({
  label,
  accept = ".jpg,.jpeg,.png",
  icon,
  fileName,
  fileNameIcon,
  onClick,
  onDone,
}: {
  label:ReactNode
  accept?: string
  icon?: ReactNode
  fileName?: ReactNode
  fileNameIcon?: ReactNode
  onClick?: () => void
  onDone?: (url:string)=>void
}) {

  const [fileNameStr, setFileNameStr] = React.useState(fileName);

  const t = useTranslations();

  const getOssTokenApi = getOssToken();

  const [ isUploading, setIsUploading ] = useState(false);
  const [ isUnmount, setIsUnmount ] = useState(false);
  const amDispatch = useAmDispatch();

  useEffect(() => {
    setIsUnmount(false);
    return () => {
      setIsUnmount(true);
    };
  }, [])
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setIsUploading(true)
    const ossToken = await getOssTokenApi.send({
      visitor: true,
    });
    if (file) {
      try {
        const res = await uploadImage(file, ossToken);
        if (!isUnmount) {
          onDone && onDone(res[1])
        }
      } catch(e:any) {
        amDispatch({
          type: "add",
          payload: t(e.message),
        })
        setIsUploading(false)
      }
    }
    
    setIsUploading(false)
  }

  return (
    <div className="w-full h-full">
      <input
        accept={accept}
        type="file"
        id="UploadInput"
        style={{ display: 'none' }}
        className="h-12 w-12"
        onChange={async (e) => {
          handleUpload(e)
        }}
      />
    {fileNameStr ? (
      <div className="w-full h-full px-6 bg-zinc-800 rounded-xl justify-between items-center gap-3 inline-flex">
        <div className="justify-start items-center gap-3 flex text-slate-100 text-base font-normal font-['Inter'] leading-normal">
          {fileNameIcon && (
            <div className="w-6 h-6 justify-center items-center flex">
              {fileNameIcon}
            </div>
          )}
          <div className="text-slate-100 text-base font-normal font-['Inter'] leading-normal">
            {fileName}
          </div>
        </div>
        <div className=" cursor-pointer p-1 bg-black w-6 h-6 rounded-full justify-center items-center gap-2 flex">
          <XMarkIcon className="h-4 w-4 fill-white stroke-white" onClick={() => {
            setFileNameStr("")
          }} />
        </div>
      </div>
    ): (
      <div
        onClick={() => {
          const UploadInput = document.getElementById("UploadInput");
          if (UploadInput) {
            UploadInput.click();
          }
          // onClick && onClick();
        }}
        className=" cursor-pointer grow shrink basis-0 w-full h-full p-4 rounded-2xl border-dashed border-2 border-zinc-700 flex-col justify-center items-center gap-2 inline-flex"
      >
        {icon}
        <div className="text-center text-zinc-400 text-xs font-medium font-['Inter']">
          {label}
        </div>
      </div>
    )}
    </div>
  );
}

export default UploadFile;
