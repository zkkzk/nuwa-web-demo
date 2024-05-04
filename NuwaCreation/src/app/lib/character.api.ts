
import { useTranslations } from "next-intl";
import { baseApiHander } from "./base.api";


const apiUrlList = {
  create: `/api/v1/ai/create`,
  delete: `/api/v1/ai/delete`,
  getAll: `/api/v1/ai/get_all`,
  getInfo: `/api/v1/ai/get_info`
}

export function create() {
  const t = useTranslations();
  return baseApiHander({
    url: apiUrlList.create,
    successMsg: t("User.mailcodesuccess")
  })
}

export function deleteByUid() {
  const t = useTranslations();
  return baseApiHander({
    url: apiUrlList.delete,
    successMsg: t("User.registersuccess")
  })
}

export function getAll() {
  const t = useTranslations();
  return baseApiHander({
    url: apiUrlList.getAll,
    successMsg: t("User.resetpasswordsuccess")
  })
}

export function getInfo() {
  const t = useTranslations();
  return baseApiHander({
    url: apiUrlList.getInfo,
    successMsg: t("User.resetpasswordsuccess")
  })
}