'use client'
import { useState } from "react";
import { useAmDispatch } from "@/app/ui/components/alter-message/AlterMessageContextProvider";
import { useLocale, useTranslations } from "next-intl";
import { getCookie, removeCookie } from 'typescript-cookie'
import { usePathname, useRouter } from "@/navigation";
import { useLoginDispatch } from "@ddreamland/common";

export const NUWAUID = "nuwa_uid"
export const NUWASESSION = "nuwa_session"

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const stBaseUrl = process.env.NEXT_PUBLIC_ST_API_URL;

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
  noLoginGotoLogin = false,
  isSt = false,
  successMsg
}: {
  url: string,
  mustLogin?: boolean,
  noLoginGotoLogin?: boolean,
  isSt?: boolean,
  successMsg?: string
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const loginDispatch = useLoginDispatch();
  const [loading, setLoading] = useState(false);

  const amDispatch = useAmDispatch();
  const send = async (params?: any) => {
    const apiUrl = isSt ? stBaseUrl : baseUrl;
    const isLogin = getIsLogin();
    setLoading(true);
    let fetchUrl = `${apiUrl}${url}`;
    if (mustLogin) {
      const uid = getCookie(NUWAUID)
      const session = getCookie(NUWASESSION)
      if (!uid || !session) {
        loginDispatch({
          type: "open",
          payload: {
            isCloseable: false,
            onLogin: () => {
              loginDispatch({type: "close"});
              router.refresh();
            }
          },
        })
        return;
      }
      fetchUrl = `${apiUrl}${url}?${new URLSearchParams({
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
        // if (isSt) {
        //   return data;
        // }
        if (data.code === 0) {
          successMsg && amDispatch({
            type: "add",
            payload: {
              message: successMsg,
            },
          })
          setLoading(false)
          return data;
        }

        // session 过期
        if (data.code === 604) {
          if(noLoginGotoLogin) {
            loginDispatch({
              type: "open",
              payload: {
                isCloseable: false,
                onLogin: () => {
                  loginDispatch({type: "close"});
                  router.refresh();
                }
              },
            })
          }
          setLoading(false)
          return data;
        }

        amDispatch({
          type: "add",
          payload: {
            message: data.msg
          },
        })
  
        setLoading(false)
        return data;
      }
      setLoading(false)
    } catch (e) {
      amDispatch({
        type: "add",
        payload: {
          message: t("Error.sysfail")
        },
      })
      setLoading(false)
    }    
  }

  return { loading, send };
}