"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { useEffect } from "react";
import { Input } from "@nextui-org/react";
import NuwaButton from "../components/NuwaButton";

const styles = {
  item: "flex flex-row justify-between items-center h-20"
}

export default function Register() {
  const t = useTranslations();
  const [ email, setEmail ] = useState('');
  const [ code, setCode ] = useState('');
  const [ password, setPassword ] = useState('');
  const [isSendCodeLoding, setIsSendCodeLoding] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(t('Previews.importok'))

  return (
    <div className="px-4 md:px-10 lg:px-16 xl:px-36 relative min-h-[80vh]">
    <Input
      type="text"
      size="sm"
      variant="underlined"
      placeholder={t('Me.usenametoken')}
      className=""
      value={email}
      onChange={(e) => {
        setEmail(e.target.value);
      }}
    />
    <Input
      type="text"
      size="sm"
      variant="underlined"
      placeholder={t('Me.usenametoken')}
      className=""
      value={code}
      onChange={(e) => {
        setCode(e.target.value);
      }}
    />
    <Input
      type="password"
      size="sm"
      variant="underlined"
      placeholder={t('Me.usenametoken')}
      className=""
      value={password}
      onChange={(e) => {
        setPassword(e.target.value);
      }}
    />
    <NuwaButton
      onClick={async () => {
        setIsSendCodeLoding(true);
        const res = await fetch("http://47.88.59.68:443/api/v1/user/mail_code",{
          method:"POST",
          body: JSON.stringify({
            email: email,
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if(res.ok){
          debugger
          const data = await res.json();

          try {
          } catch (e: any) {
            setMessage(t("Error.localstoragefull"));
            setIsOpen(true);
            return
          }
          
          if(data){
            debugger
            try {

            } catch (e: any) {
              setMessage(t("Error.localstoragefull"));
              setIsOpen(true);
              return
            }
          }
          setIsSendCodeLoding(false)
          setMessage(t('Previews.importok'))
          setIsOpen(true);

        }else{
          setIsSendCodeLoding(false)
        }
          // TODO: 发送验证码
        }}
      >
      发送验证码
    </NuwaButton>
    <NuwaButton>
      注册
    </NuwaButton>
    </div>
  );
}
