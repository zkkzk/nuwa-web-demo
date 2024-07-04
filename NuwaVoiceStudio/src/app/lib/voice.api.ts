import { baseApiHander } from "@/app/lib/base.api";
import { useTranslations } from "next-intl";


const voiceUrlList = {
  getPublishSquare: `/ddream/api/v1/voice/publish/square`,
  getModelId: `/ddream/api/v1/voice/get_model_id`,
  publish: `/ddream/api/v1/voice/publish`,
  getModelList: `/ddream/api/v1/voice/model/list`
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
