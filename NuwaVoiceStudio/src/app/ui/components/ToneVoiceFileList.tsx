"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { toneListEn } from "@/app/lib/definitions.tone";
import { VoiceModelToneType } from "@/app/lib/definitions.InstantGenerateParamster";
import ToneVoiceFile from "./ToneVoiceFile";
import UploadFile from "./UploadFile";
import ExportIcon from "@/app/icons/ExportIcon";


function ToneVoiceFileList({
  toneList,
  onChange,
}: {
  toneList: Array<VoiceModelToneType>
  onChange: (newToneList: Array<VoiceModelToneType>) => void
}) {

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
      <Button
        color="primary"
        variant="bordered"
        onPress={() => {
          onChange([
            ...toneList,
            {
              audio_url: "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3",
              text: "",
              tone_type: toneListEn[0].value
            }
          ])
        }}
      >add</Button>
      <UploadFile
        label={<div>Drag and drop files here or click to upload<br />CKPT format</div>}
        onClick={() => {
          // setSelectModalOpen(true);
        }}
        icon={<ExportIcon className="w-6 h-6" />}
      >
      </UploadFile>
    </div>
  );
}

export default ToneVoiceFileList;
