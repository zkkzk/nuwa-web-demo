import { useState } from "react";
import { useAmDispatch } from "@/app/ui/components/AlterMessageContextProvider";
import { useLocale, useTranslations } from "next-intl";
import { getCookie, removeCookie, setCookie } from 'typescript-cookie'
import { usePathname, useRouter } from "@/navigation";


export const NUWAUID = "nuwa_uid"
export const NUWASESSION = "nuwa_session"

// const baseUrl = 'http://47.88.59.68:443';
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getIsLogin = () => {
  if (typeof document !== "undefined") {
    const uid = getCookie(NUWAUID)
    const session = getCookie(NUWASESSION)
    return !!(uid && session)
  }
  return false;
}

export const deleteLoginCookie = () => {
  removeCookie(NUWAUID)
  removeCookie(NUWASESSION)
}

export const baseApiHander = ({
  url,
  mustLogin = false,
  successMsg
}: {
  url: string,
  mustLogin?: boolean,
  successMsg?: string
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const amDispatch = useAmDispatch();
  const send = async (params?: any) => {
    const isLogin = getIsLogin();
    setLoading(true);
    let fetchUrl = `${baseUrl}${url}`;
    if (mustLogin) {
      const uid = getCookie(NUWAUID)
      const session = getCookie(NUWASESSION)
      if (!uid || !session) {
        router.replace('/login?callbackUrl=' + pathname);
        return;
      }
      fetchUrl = `${baseUrl}${url}?${new URLSearchParams({
        uid: uid,
        session: session,
      }).toString()}`;
    }
    
    try {
      let body = null;
      if (params) {
        body = JSON.stringify(params);
      }
      
      const response = await fetch(fetchUrl, {
          method: 'POST',
          body: body,
          headers: {
            'Accept-Language': locale,
            'Content-Type': 'application/json'
          }
        }
      );

      if(response.ok){
        const data = await response.json();
        if (data.code === 0) {
          successMsg && amDispatch({
            type: "add",
            payload: successMsg,
          })
          setLoading(false)
          return data;
        } else {
          amDispatch({
            type: "add",
            payload: data.msg,
          })
          setLoading(false)
        }
  
        setLoading(false)
        return data;
      }
      setLoading(false)
    } catch (e) {
      amDispatch({
        type: "add",
        payload: t("User.sysfail"),
      })
      setLoading(false)
    }    
  }

  return { loading, send };
}