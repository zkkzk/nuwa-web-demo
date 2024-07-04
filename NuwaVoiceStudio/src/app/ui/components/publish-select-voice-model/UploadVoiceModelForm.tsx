"use client";
import React, { useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import {
  languageListEn,
  VoiceModelFormDataProps,
} from "@/app/lib/definitions.InstantGenerateParamster";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import UploadFile from "../UploadFile";
import LabelForm from "../form/LabelForm";
import TitleModal from "./TitleModal";
import ToneVoiceFileList from "../ToneVoiceFileList";


function UploadVoiceModelForm({
  formData,
  onChange
}: {
  formData: VoiceModelFormDataProps
  onChange?: (newFormData: VoiceModelFormDataProps) => void,
}) {

  const modalTypeList = [
    {
      value: "shide",
      label: "GPT-Sovits",
    }
  ];

  return (
    <div className="w-full px-8 py-16 flex-col justify-start items-end gap-12 inline-flex">
      <div className="w-full flex-col justify-start items-start gap-12 flex">
        <TitleModal title="Upload Model" />
        <div className="self-stretch flex-col justify-start items-start gap-8 flex">
          <LabelForm label='Type' isRequired={true}>
            <Select
              variant="bordered"
              size="md"
              isRequired
              placeholder="Select type"
              selectedKeys={[formData.local_model.type as string]}
              onChange={(e) => {
                onChange && onChange({
                  ...formData,
                  local_model: {
                    ...formData.local_model,
                    type: e.target.value
                  }
                } as VoiceModelFormDataProps)
              }}
              isDisabled
            >
              {modalTypeList.map((mtItem) => (
                <SelectItem
                  key={mtItem.value}
                  value={mtItem.value}
                  classNames={{
                    base: "h-12 pl-2 pr-3 py-2 rounded-xl gap-4",
                  }}
                >
                  {mtItem.label}
                </SelectItem>
              ))}
            </Select>
          </LabelForm>

          <div className="w-full grid grid-cols-2 gap-12">
            <LabelForm label='GPT Model' isRequired={true}>
              <UploadFile
                label={
                  <div>
                    Drag and drop files here or click to upload
                    <br />
                    CKPT format
                  </div>
                }
                onClick={() => {
                  //setSelectModalOpen(true);
                }}
                icon={<ArrowUpTrayIcon className="w-6 h-6 fill-zinc-400 " />}
              ></UploadFile>
            </LabelForm>
            <LabelForm label='Sovits Model' isRequired={true}>
              <UploadFile
                label={
                  <div>
                    Drag and drop files here or click to upload
                    <br />
                    CKPT format
                  </div>
                }
                onClick={() => {
                  //setSelectModalOpen(true);
                }}
                icon={<ArrowUpTrayIcon className="w-6 h-6 fill-zinc-400 " />}
              ></UploadFile>
            </LabelForm>
          </div>
          <LabelForm label='Basic Parameters' isRequired={true}>
            <Select
              disallowEmptySelection={true}
              variant="bordered"
              size="lg"
              label="Language"
              placeholder="Select an language"
              labelPlacement="outside"
              selectedKeys={[formData.basic_params.language as string]}
              classNames={{
                label: "group[data-filled=true]:text-gray-500 group-data-[filled=true]:text-gray-500 text-gray-500 text-sm font-semibold font-['Inter'] leading-normal",
              }}
              onChange={(e) => {
                onChange && onChange({
                  ...formData,
                  basic_params: {
                    ...formData.basic_params,
                    language: e.target.value,
                  }
                } as VoiceModelFormDataProps)
              }}
            >
              {languageListEn.map((Language) => (
                  <SelectItem
                    key={Language.value}
                    value={Language.value}
                    classNames={{
                      base: 'h-12 pl-2 pr-3 py-2 rounded-xl gap-4',
                    }}
                  >
                    {Language.label}
                  </SelectItem>
              ))}
            </Select>
          </LabelForm>

          <LabelForm label='Tone Audio Files（Sentimental Voices）' subTitle="You may add up to 21 different tones, and the first one will be set as default." isRequired={true}>
            <ToneVoiceFileList toneList={formData.tone} onChange={(newTone) => {
              onChange && onChange({
                ...formData,
                tone: newTone
              } as VoiceModelFormDataProps)
            }} />
          </LabelForm>
        </div>
      </div>
    </div>
  );
}

export default UploadVoiceModelForm;
