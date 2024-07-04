"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";
import { uploadImage, uploadFile } from "@/app/lib/oss";
import { getOssToken } from "@/app/lib/oss.api";
import { useAmDispatch } from "../alter-message/AlterMessageContextProvider";
import Dropzone from 'react-dropzone'
import { uploadFileToServer } from "@/app/lib/common.api";
import { Spinner } from "@nextui-org/react";
import { customAlphabet } from "nanoid";

export function generateId() {
  /**
   * 需要 url 安全， html 安全的字符，也不能是 - ，因为协同要用
   * url 安全： $-_.+!*'(),
   * html 安全：-_
   */
  return customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_', 16)()
}

function UploadFile({
  label,
  accept = "image",
  icon,
  fileName,
  fileNameIcon,
  onDone,
}: {
  label:ReactNode
  accept?: string
  icon?: ReactNode
  fileName?: ReactNode
  fileNameIcon?: ReactNode
  onDone?: (url:string)=>void
}) {

  const [fileNameStr, setFileNameStr] = React.useState(fileName);

  const t = useTranslations();

  const [ isUploading, setIsUploading ] = useState(false);
  const [ isUnmount, setIsUnmount ] = useState(false);

  let initDropzoneAccept = {};
  if (accept === "image") {
    initDropzoneAccept = {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif'],
    }
  }
  if (accept === "audio") {
    initDropzoneAccept = {
      'audio/mp3': ['.mp3', '.wav', '.flac'],
    }
  }

  const [ dropzoneAccept, setDropzoneAccept ] = useState(initDropzoneAccept);
  const amDispatch = useAmDispatch();

  useEffect(() => {
    setIsUnmount(false);
    return () => {
      setIsUnmount(true);
    };
  }, [])

  const uploadFileApi = uploadFileToServer();

  const onDropHander = async (acceptedFiles: any) => {
    console.log(acceptedFiles)

    const file = acceptedFiles[0]; // 获取文件
    if (!file) return;

    const formData = new FormData(); // 创建FormData对象
    formData.append('file', file); // 将文件添加到FormData中
    if (accept === "image") {
      formData.append('type', 'picture')
    }
    if (accept === "audio") {
      formData.append('type', 'audio')
    }
    if (accept === "live2d") {
      formData.append('type', 'live2d')
    }

    const filename = file.name
    setFileNameStr(filename);
    // const modelname = filename.split('.')[0]
    // const extName = filename.split('.')[1]

    // const newFilenameWithoutExt = generateId()
    // const newFilename = `${newFilenameWithoutExt}.${extName}`

    try {
      setIsUploading(true)
      const response =  await uploadFileApi.send(formData)

      onDone && onDone(response.data.url)
      setIsUploading(false)
    } catch (error) {
      setIsUploading(false)
      amDispatch({
        type: "add",
        payload: "Error",
      })
    }
  }

  return (
    <div className="w-full h-full relative">
      {fileNameStr ? (
        <div className="w-full h-full px-6 bg-zinc-800 rounded-xl justify-between items-center gap-3 inline-flex">
          <div className="justify-start items-center gap-3 flex text-slate-100 text-base font-normal font-['Inter'] leading-normal">
            {fileNameIcon && (
              <div className="w-6 h-6 justify-center items-center flex">
                {fileNameIcon}
              </div>
            )}
            <div className="text-slate-100 text-base font-normal font-['Inter'] leading-normal">
              {fileNameStr}
            </div>
            
          </div>
          {isUploading ? (
            <Spinner />
            ) : (
            <div className=" cursor-pointer p-1 bg-black w-6 h-6 rounded-full justify-center items-center gap-2 flex">
              <XMarkIcon className="h-4 w-4 fill-white stroke-white" onClick={() => {
                setFileNameStr("")
              }} />
            </div>
          )}
        </div>
      ): (
        <div className="w-full h-full">
          <Dropzone onDrop={onDropHander} accept={dropzoneAccept}>
            {({getRootProps, getInputProps}) => (
              <section className="w-full h-full">
                <div className="cursor-pointer w-full h-full p-4 rounded-2xl border-dashed border-2 border-zinc-700 flex-col justify-center items-center gap-2 inline-flex" {...getRootProps()}>
                  <input {...getInputProps()} />
                  {icon}
                  <div className="text-center text-zinc-400 text-xs font-medium font-['Inter']">
                    {label}
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        
      )}
    </div>
  );
}

export default UploadFile;
