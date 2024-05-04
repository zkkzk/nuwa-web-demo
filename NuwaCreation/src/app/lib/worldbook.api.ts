
import { useTranslations } from "next-intl";
import { baseApiHander } from "./base.api";


const apiUrlList = {
  create: `/api/v1/world/create`,
  delete: `/api/v1/world/delete`,
  getAll: `/api/v1/world/get_all`
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