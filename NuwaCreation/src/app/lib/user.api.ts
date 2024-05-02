import { useState } from "react";
import { useAmDispatch } from "../ui/components/AlterMessageContextProvider";
import { useLocale, useTranslations } from "next-intl";
import { locales } from "@/navigation";


const baseUrl = 'http://47.88.59.68:443';
const apiUrlList = {
  register: `/api/v1/user/registered`,
  mailCode: `/api/v1/user/mail_code`,
  login: `/api/v1/user/login`,
  logout: `/api/v1/user/logout`,
  getUserInfo: `/api/v1/user/get_user_info`,
  updateUserInfo: `/api/v1/user/update_user_info`,
}

const baseApiHander = ({
  url,
  successMsg
}: {
  url: string,
  successMsg?: string
}) => {
  const t = useTranslations();
  const locale = useLocale();

  const [loading, setLoading] = useState(false);
  
  const amDispatch = useAmDispatch();
  const send = async (params: any) => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}${url}`, {
        method: 'POST',
          headers: {
            'Accept-Language': locale,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
        }
      );

      if(response.ok){
        const data = await response.json();
        if (data.code === 0) {
          amDispatch({
            type: "open",
            payload: successMsg,
          })
          setLoading(false)
          return data.data;
        } else {
          amDispatch({
            type: "open",
            payload: data.msg,
          })
          setLoading(false)
        }
  
        setLoading(false)
      }
      setLoading(false)
    } catch (e) {
      amDispatch({
        type: "open",
        payload: t("User.sysfail"),
      })
      setLoading(false)
    }
    
    
  }

  return { loading, send };
}


export function mailCode() {
  const t = useTranslations();
  return baseApiHander({
    url: apiUrlList.mailCode,
    successMsg: t("User.mailcodesuccess")
  })
}

export function register() {
  const t = useTranslations();
  return baseApiHander({
    url: apiUrlList.register,
    successMsg: t("User.registersuccess")
  })
}