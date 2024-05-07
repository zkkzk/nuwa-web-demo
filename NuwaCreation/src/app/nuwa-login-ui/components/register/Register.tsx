"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import { z } from "zod";
import { md5 } from "js-md5"
import { mailCode, register } from "../../utils/login.api";
import { InputClassNames } from "../InputStyle";
import { useAlterDispatch } from "../Alter/AlterContextProvider";


const CountLimit = 60;

export default function Register({
  onRegister
}: {
  onRegister?: () => void;
}) {
  const t = useTranslations();
  const [ email, setEmail ] = useState('');
  const [ code, setCode ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ requestId, setRequestId] = useState('');
  const [ count, setCount ] = useState(CountLimit);
  const alterDispatch = useAlterDispatch();

  const mailCodeApi = mailCode();
  const registerApi = register();
  
  const FormSchema = z.object({
    email: z.string().email({ message: t("UserFormSchema.email") }),
    code: z.string().length(5, { message: t("UserFormSchema.code") }),
    password: z.string().min(6, { message: t("UserFormSchema.password") })
  });

  useEffect(() => {
    if (count === CountLimit) {
      return;
    }
    if (count === 0) {
      setCount(CountLimit)
    } else {
      setTimeout(() => {
        setCount(count - 1)
      }, 1000)
    }
  }, [count])

  return (
    <div className="flex flex-row justify-center items-center h-full w-full">
      <div className="w-full h-full flex flex-col justify-between">
        <div className="w-full flex flex-col gap-5">
          <div className="w-full flex flex-row justify-center items-center gap-2">
            <Image width={37} height={50} src="/registerIcon1.png" alt="" />
            <Image width={149} height={50} src="/registerIcon2.png" alt="" />
          </div>
          <div className="w-full text-center text-white text-2xl font-bold mb-8 mt-5">{t("User.registertitle")}</div>
          <Input
            color="default"
            type="email"
            size="md"
            classNames={InputClassNames}
            isInvalid={false}
            errorMessage=""
            placeholder={t('User.email')}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            endContent={
            <Button
              variant="solid"
              className="text-white bg-transparent"
              color="default"
              isLoading={mailCodeApi.loading}
              isDisabled={count !== CountLimit}
              onClick={async () => {
                const res = await mailCodeApi.send({email: email, type: 1});
                if (res && res.code === 0) {
                  setRequestId(res.data.request_id)
                  setCount(CountLimit - 1)
                }
              }}
            >
              {(count !== CountLimit) ? `${count}s` : t("User.registersend")}
            </Button>
            }
          />
          <Input
            color="default"
            type="text"
            size="md"
            classNames={InputClassNames}
            placeholder={t('User.code')}
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
          <Input
            color="default"
            type="password"
            size="md"
            classNames={InputClassNames}
            placeholder={t('User.password')}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <Button
          color="default"
          size="lg"
          isDisabled={(!code || !email || !password)}
          isLoading={registerApi.loading}
          className="mt-16 w-full bg-zinc-800 rounded-2xl text-white"
          onClick={async () => {
            const validatedFields = FormSchema.safeParse({
              email: email,
              code: code,
              password: password
            });

            if (validatedFields.success) {
              const res = await registerApi.send({
                email: email,
                code: code,
                passwd: md5(password),
                request_id: requestId,
              });
              if (res && res.code === 0) {
                onRegister && onRegister();
              }
            } else {
              validatedFields.error.issues.map((item) => {
                alterDispatch({
                  type: "add",
                  payload: item.message,
                })
              })
            }
          }}
        >
          {t("User.registersubmit")}
        </Button>
      </div>
    </div>
    
  );
}
