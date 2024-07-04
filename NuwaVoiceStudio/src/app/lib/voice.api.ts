import { baseApiHander } from "@/app/lib/base.api";
import { useTranslations } from "next-intl";


const voiceUrlList = {
  getPublishSquare: `/ddream/api/v1/voice/publish/square`,
}

export function getPublishSquare() {
  const t = useTranslations();
  return baseApiHander({
    url: voiceUrlList.getPublishSquare,
    mustLogin: true,
    noLoginGotoLogin: true,
  })
}
