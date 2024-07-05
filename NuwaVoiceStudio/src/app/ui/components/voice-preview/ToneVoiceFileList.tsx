"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { toneListEn } from "@/app/lib/definitions.tone";
import { VoiceModelToneType } from "@/app/lib/definitions.InstantGenerateParamster";
import ToneVoiceFile from "./ToneVoiceFile";
import UploadFile from "../upload-file/UploadFile";
import ExportIcon from "@/app/icons/ExportIcon";
import UploadVoiceModelFile from "../upload-file/UploadVoiceModelFile";


function ToneVoiceFileList({
  toneList,
  modelId,
  onChange,
}: {
  toneList: Array<VoiceModelToneType>
  modelId: string
  onChange: (newToneList: Array<VoiceModelToneType>) => void
}) {

  const [uploadKey, setUploadKey] = useState(0)

  return (
    <div className="w-full flex flex-col gap-3">
      {toneList.map((toneItem, index) => (
        <ToneVoiceFile
          key={index}
          hideTrash={false}
          voiceSrc={toneItem.audio_url}
          text={toneItem.text}
          toneType={toneItem.tone_type}
          onTextChange={(newText) => {
            onChange(toneList.map((toneListItem, toneIndex) => {
              if (index === toneIndex) {
                return {
                  ...toneListItem,
                  text: newText
                }
              }
              return toneListItem;
            }))
          }}
          onToneTypeChange={(newToneType) => {
            onChange(toneList.map((toneListItem, toneIndex) => {
              if (index === toneIndex) {
                return {
                  ...toneListItem,
                  tone_type: newToneType
                }
              }
              return toneListItem;
            }))
          }}
          onTrashClick={() => {
            onChange(toneList.filter((toneListItem, toneIndex) => index !== toneIndex))
          }}
        />
      ))}
      <div className="h-32 w-full">
        <UploadVoiceModelFile
          key={uploadKey}
          label={<div>Drag and drop files here or click to upload<br />CKPT format</div>}
          icon={<ExportIcon className="w-6 h-6" />}
          modelId={modelId}
          type="audio"
          onDone={(res) => {
            onChange([
              ...toneList,
              {
                audio_url: res.url,
                text: "",
                tone_type: toneListEn[0].value
              }
            ])
            setUploadKey(uploadKey + 1)
          }}
        >
        </UploadVoiceModelFile>
      </div>
    </div>
  );
}

export default ToneVoiceFileList;
