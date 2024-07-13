import { baseApiHander } from "@/app/lib/base.api";
import { useTranslations } from "next-intl";


const apiUrlList = {
  getUserInfo: `/ddream/api/v1/user/info/get`,
  editUserInfo: `/ddream/api/v1/user/info/edit`,
  getBags: '/ddream/api/v1/finance/get_bags',
}

export function getUserInfo({noLoginGotoLogin = false}: {noLoginGotoLogin?: boolean}) {
  const t = useTranslations();
  return baseApiHander({
    url: apiUrlList.getUserInfo,
    mustLogin: true,
    noLoginGotoLogin: false,
  })
}

export function editUserInfo() {
  const t = useTranslations();
  return baseApiHander({
    url: apiUrlList.editUserInfo,
    mustLogin: true,
    successMsg: t("User.edituserinfosuccess")
  })
}

export function getBags() {
  const t = useTranslations();
  return baseApiHander({
    url: apiUrlList.getBags,
    mustLogin: true,
    noLoginGotoLogin: true
  })
}