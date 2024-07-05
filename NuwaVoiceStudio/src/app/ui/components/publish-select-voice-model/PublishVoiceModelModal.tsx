"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import DrawerModal from "../DrawerModal";
import {
  ArrowRightIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/solid";
import SelectVoiceModelForm from "./SelectVoiceModelForm";
import VoiceInformationForm from "./VoiceInformationForm";
import confetti from 'canvas-confetti';
import UploadVoiceModelForm from "./UploadVoiceModelForm";
import { DefaultVoiceModelFormData, VoiceModelFormDataProps, VoiceModelInfoType } from "@/app/lib/definitions.InstantGenerateParamster";
import { z } from "zod";
import { useAmDispatch } from "../alter-message/AlterMessageContextProvider";
import { getModelId, voiceModelPublish } from "@/app/lib/voice.api";

function PublishVoiceModelModal({
  isOpen = false,
  variant,
  onChange = () => {},
}: {
  isOpen: boolean
  variant: 'SELECT' | 'UPLOAD'
  onChange: (isOpen: boolean) => void // 类型定义为函数，用于处理模态框的打开和关闭
}) {
  const handleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const uploadModal = useDisclosure({
    isOpen,
    onClose: () => onChange(false),
    onOpen: () => onChange(true),
  });

  const [step, setStep] = useState<1|2>(1);
  const amDispatch = useAmDispatch();
  const [loading, setLoading] = useState(false);
  const [isInit, setInit] = useState(false);

  const [formData, setFormData] = useState({
    ...DefaultVoiceModelFormData,
    publish_type: variant === 'UPLOAD' ? 1 : 2
  } as VoiceModelFormDataProps);

  const UploadFormSchema = z.object({
    gptWeightsUrl: z.string({
      required_error: "gptWeightsUrl is required",
      invalid_type_error: "gptWeightsUrl must be a string",
    }).url({message: 'Please enter a valid URL for the GPT weights'}), 
    sovitsWeightsUrl: z.string({
      required_error: "sovitsWeightsUrl is required",
      invalid_type_error: "sovitsWeightsUrl must be a string",
    }).url({message: 'Please enter a valid URL for the Sovits weights'}), 
    tone: z.array(z.object({
      tone_type: z.string({
        required_error: "tone_type is required",
        invalid_type_error: "tone_type must be a string",
      }),
      audio_url: z.string({
        required_error: "audio_url is required",
        invalid_type_error: "audio_url must be a string",
      }).url({message: 'Please enter a valid URL for the tone'}),
      text: z.string({
        invalid_type_error: "text must be a string",
      }),
    })).min(1, {message: 'Please upload at least one tone'}),
  });

  const SelectFormSchema = z.object({
    modelId: z.string({
      required_error: "select model is required",
    }).min(1, { message: "select model is required" }),
    gptWeightsUrl: z.string({
      required_error: "gptWeightsUrl is required",
      invalid_type_error: "gptWeightsUrl must be a string",
    }).url({message: 'Please enter a valid URL for the GPT weights'}), 
    sovitsWeightsUrl: z.string({
      required_error: "sovitsWeightsUrl is required",
      invalid_type_error: "sovitsWeightsUrl must be a string",
    }).url({message: 'Please enter a valid URL for the Sovits weights'}), 
    tone: z.array(z.object({
      tone_type: z.string({
        required_error: "tone_type is required",
        invalid_type_error: "tone_type must be a string",
      }),
      audio_url: z.string({
        required_error: "audio_url is required",
        invalid_type_error: "audio_url must be a string",
      }).url({message: 'Please enter a valid URL for the tone'}),
      text: z.string({
        invalid_type_error: "text must be a string",
      }),
    })).min(1, {message: 'Please upload at least one tone'}),
  });

  const VoiceInfoSchema = z.object({
    cover:z.string({
      required_error: "cover is required",
      invalid_type_error: "cover must be a string",
    }).url({message: 'Please enter a valid URL for the cover'}),
    name:z.string({
      required_error: "name is required",
      invalid_type_error: "name must be a string",
    }).min(1, { message: "name is required" }),
    type:z.string({
      required_error: "type is required",
      invalid_type_error: "type must be a string",
    }).min(1, { message: "type is required" }),
  });

  const getModelIdApi = getModelId();
  const getModelIdToServer = async () => {

    if (loading) {
      return;
    }
    setLoading(true);
    const res = await getModelIdApi.send({
    });
    if (res && res.code === 0) {
      setFormData({
        ...formData,
        model_id: res.data,
      })
    }

    setLoading(false);
    if (!isInit) {
      setInit(true);
    }
  };

  const voiceModelPublishApi = voiceModelPublish();

  useEffect(() => {
    if (isOpen) {
      if (variant === 'UPLOAD') {
        getModelIdToServer();
      } else {
        setFormData({
          ...formData,
          model_id: '',
        })
      }
    }
    
  }, [isOpen]);

  return (
    <>
      <DrawerModal modalDisclosure={uploadModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader></ModalHeader>
              <ModalBody>
                <div className="px-[198px]">
                  {step === 1 && (
                    <>
                      {variant === 'SELECT' && (
                        <SelectVoiceModelForm
                          formData={formData}
                          onChange={(newFormData: VoiceModelFormDataProps) => setFormData(newFormData) }
                        />
                      )}
                      {variant === 'UPLOAD' && (
                        <UploadVoiceModelForm
                          formData={formData}
                          onChange={(newFormData: VoiceModelFormDataProps) => setFormData(newFormData) }
                        />
                      )}
                    </>
                  )}
                  {step === 2 && (
                    <VoiceInformationForm
                      value={formData.publish_info}
                      onChange={(newPublishInfo: VoiceModelInfoType) => setFormData({
                        ...formData,
                        publish_info: newPublishInfo,
                      }) }
                    />
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="px-[198px]">
                  <div className="px-8 inline-flex gap-4">
                    {step === 1 && (
                      <Button
                        size="lg"
                        color="primary"
                        variant="solid"
                        endContent={<ArrowRightIcon className="w-6 h-6 fill-white" />}
                        onPress={() => {
                          let validatedFields; 
                          if (variant === 'UPLOAD') {
                            validatedFields = UploadFormSchema.required().safeParse({
                              gptWeightsUrl: formData.local_model["gpt-weights_url"], 
                              sovitsWeightsUrl: formData.local_model["sovits-weights_url"],
                              tone: formData.tone
                            });
                          } else {
                            validatedFields = SelectFormSchema.required().safeParse({
                              gptWeightsUrl: formData.local_model["gpt-weights_url"], 
                              sovitsWeightsUrl: formData.local_model["sovits-weights_url"],
                              tone: formData.tone
                            });
                          }
                          
              
                          if (validatedFields.success) {
                            setStep(2);
                          } else {
                            validatedFields.error.issues.map((item) => {
                              amDispatch({
                                type: "add",
                                payload: {
                                  type: "error",
                                  message: item.message,
                                },
                              })
                            })
                          }

                          
                        }}
                      >Next</Button>
                    )}
                    {step === 2 && (
                      <>
                        <Button
                          size="lg"
                          color="default"
                          variant="ghost"
                          startContent={<ArrowLeftIcon className="w-6 h-6 fill-white" />}
                          onPress={() => setStep(1)}
                        >Previous</Button>
                        <Button
                          size="lg"
                          color="primary"
                          variant="solid"
                          onPress={async () => {
                            const validatedFields = VoiceInfoSchema.required().safeParse({
                              cover: formData.publish_info.cover_url, 
                              name: formData.publish_info.name,
                              type: formData.publish_info.type
                            });
                          
                            if (validatedFields.success) {
                              const res = await voiceModelPublishApi.send(formData);
                              if (res && res.code === 0) {
                                handleConfetti()
                              }
                            } else {
                              validatedFields.error.issues.map((item) => {
                                amDispatch({
                                  type: "add",
                                  payload: {
                                    type: "error",
                                    message: item.message,
                                  },
                                })
                              })
                            }
                          }}
                        >Publish</Button>
                      </>
                    )}
                    
                  </div>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </DrawerModal>
    </>
  );
}

export default PublishVoiceModelModal;
