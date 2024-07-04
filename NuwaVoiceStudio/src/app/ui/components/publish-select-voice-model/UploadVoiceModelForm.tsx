"use client";
import React, { useState } from "react";
import { Button, Select, SelectItem } from "@nextui-org/react";
import {
  DefaultInstantGenerateParamster,
  TypeInstantGenerateParamster,
  VoiceModelFormDataProps,
} from "@/app/lib/definitions.InstantGenerateParamster";
import VoiceParametersBasics from "../voice-parameters/VoiceParametersBasics";
import VoiceParametersAdvanced from "../voice-parameters/VoiceParametersAdvanced";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import ToneVoiceFile from "../ToneVoiceFile";
import ExportIcon from "@/app/icons/ExportIcon";
import UploadFile from "../UploadFile";
import LabelForm from "../form/LabelForm";
import TitleModal from "./TitleModal";


function PublishUploadVoiceModelModal({
  formData,
  onChange
}: {
  formData: VoiceModelFormDataProps
  onChange?: (newFormData: VoiceModelFormDataProps) => void,
}) {
  const [parameters, setParameters] = useState<TypeInstantGenerateParamster>(
    DefaultInstantGenerateParamster
  );

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
            <LabelForm label='GPT Model{" "}' isRequired={true}>
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
            <LabelForm label='Sovits Model{" "}' isRequired={true}>
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
          <LabelForm label='Basic Parameters{" "}' isRequired={true}>
            <VoiceParametersBasics
              value={formData.basic_params}
              onChange={(newBasicParams) => {
                onChange && onChange({
                  ...formData,
                  basic_params: newBasicParams
                } as VoiceModelFormDataProps)
              }}
            />
          </LabelForm>
          <LabelForm label='Advanced Parameters{" "}' isRequired={true}>
            <VoiceParametersAdvanced
              value={formData.dvance_params}
              onChange={(newDvance_params) => {
                onChange && onChange({
                  ...formData,
                  dvance_params: newDvance_params
                } as VoiceModelFormDataProps)
              }}
            />
          </LabelForm>

          <LabelForm label='Tone Audio Files（Sentimental Voices）{" "}' subTitle="You may add up to 21 different tones, and the first one will be set as default." isRequired={true}>
            <div className="w-full flex flex-col gap-3">
              {formData.tone.map((toneItem, index) => (
                <ToneVoiceFile
                  key={index}
                  hideTrash={false}
                  voiceSrc={toneItem.audio_url}
                  text={toneItem.text}
                  toneType={toneItem.tone_type}
                  onTextChange={(newText) => {
                    onChange && onChange({
                      ...formData,
                      tone: formData.tone.map((toneItem, toneIndex) => {
                        if (index === toneIndex) {
                          return {
                            ...toneItem,
                            text: newText
                          }
                        }
                        return toneItem;
                      })
                    } as VoiceModelFormDataProps)
                  }}
                  onToneTypeChange={(newToneType) => {
                    onChange && onChange({
                      ...formData,
                      tone: formData.tone.map((toneItem, toneIndex) => {
                        if (index === toneIndex) {
                          return {
                            ...toneItem,
                            tone_type: newToneType
                          }
                        }
                        return toneItem;
                      })
                    } as VoiceModelFormDataProps)
                  }}
                  onTrashClick={() => {
                    onChange && onChange({
                        ...formData,
                        tone: formData.tone.filter((toneItem, toneIndex) => index !== toneIndex)
                      } as VoiceModelFormDataProps)
                    }
                  }
                />
              ))}
              <Button
                color="primary"
                variant="bordered"
                onPress={() => {
                  onChange && onChange({
                    ...formData,
                    tone: [
                      ...formData.tone,
                      {
                        audio_url: "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3",
                        text: (Math.floor(Math.random() * 1000) + 1).toString(),
                        tone_type: "1"
                      }
                    ]
                  })
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
          </LabelForm>
        </div>
      </div>
    </div>
  );
}

export default PublishUploadVoiceModelModal;
