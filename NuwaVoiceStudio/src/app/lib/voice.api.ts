import { baseApiHander } from "@/app/lib/base.api";
import { useTranslations } from "next-intl";


const voiceUrlList = {
  getPublishSquare: `/ddream/api/v1/voice/publish/square`,
  getModelId: `/ddream/api/v1/voice/get_model_id`,
  publish: `/ddream/api/v1/voice/publish`,
  getModelList: `/ddream/api/v1/voice/model/list`,
  getMyPublish: `/ddream/api/v1/voice/publish/my_publish`,
  getVoiceTrainRecords: `/ddream/api/v1/voice/train/records`,
  createVoiceTrain: `/ddream/api/v1/voice/train`,
  getVoiceInfHistory: `/ddream/api/v1/voice/inf/history`,
  uploadModelFile: `/ddream/api/v1/voice/upload_model_file`,
}

export function getPublishSquare() {
  const t = useTranslations();
  return baseApiHander({
    url: voiceUrlList.getPublishSquare,
    mustLogin: true,
    noLoginGotoLogin: true,
  })
}

export function getModelId() {
  const t = useTranslations();
  return baseApiHander({
    url: voiceUrlList.getModelId,
    mustLogin: true,
    noLoginGotoLogin: true,
  })
}

export function voiceModelPublish() {
  const t = useTranslations();
  return baseApiHander({
    url: voiceUrlList.publish,
    mustLogin: true,
    noLoginGotoLogin: true,
  })
}

export function getModelList() {
  const t = useTranslations();
  return baseApiHander({
    url: voiceUrlList.getModelList,
    mustLogin: true,
    noLoginGotoLogin: true,
  })
}

export function getMyPublish() {
  const t = useTranslations();
  return baseApiHander({
    url: voiceUrlList.getMyPublish,
    mustLogin: true,
    noLoginGotoLogin: true,
  })
}

export function getVoiceTrainRecords() {
  const t = useTranslations();
  return baseApiHander({
    url: voiceUrlList.getVoiceTrainRecords,
    mustLogin: true,
    noLoginGotoLogin: true,
  })
}

export function createVoiceTrain() {
  const t = useTranslations();
  return baseApiHander({
    url: voiceUrlList.createVoiceTrain,
    mustLogin: true,
    noLoginGotoLogin: true,
    isBody: true,
    isUpload: true,
  })
}

export function getVoiceInfHistory() {
  const t = useTranslations();
  return baseApiHander({
    url: voiceUrlList.createVoiceTrain,
    mustLogin: true,
    noLoginGotoLogin: true,
  })
}

export function uploadModelFile() {
  const t = useTranslations();
  return baseApiHander({
    url: voiceUrlList.uploadModelFile,
    mustLogin: true,
    noLoginGotoLogin: true,
    isBody: true,
    isUpload: true,
  })
}

