"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import { mailCode, register } from "@/app/lib/user.api";
import { z } from "zod";
import { md5 } from "js-md5"


const CountLimit = 10;

const InputClassNames = {
  base: "w-full",
  input: [
    "text-white", 
    "bg-transparent",
    "group-data-[has-value=true]:text-white"
  ],
  innerWrapper: "bg-transparent",
  inputWrapper: [
    "rounded-2xl",
    "bg-zinc-800",
    "group-hover:bg-zinc-700",
    "focus-within:!bg-zinc-700/80",

  ]
}

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  code: z.string().length(5),
  password: z.string().min(6),
  requestId: z.string()
});

export default function Register() {
  const t = useTranslations();
  const [ email, setEmail ] = useState('');
  const [ code, setCode ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ requestId, setRequestId] = useState('');
  const [ count, setCount ] = useState(CountLimit);

  const mailCodeApi = mailCode();
  const registerApi = register();

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
      <div className="w-[350px] flex flex-col gap-5">
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
          errorMessage="Please enter a valid email"
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
              const res = await mailCodeApi.send({email: email});
              if (res && res.request_id) {
                setRequestId(res.request_id)
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
          type="passward"
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
        <Button
          color="default"
          size="lg"
          isLoading={registerApi.loading}
          className="mt-16 w-full bg-zinc-800 rounded-2xl text-white"
          onClick={async () => {
            const validatedFields = FormSchema.omit({email: true, code: true, password: true, requestId: true}).safeParse({
              email: email,
              code: code,
              password: password,
              requestId: requestId,
            });

            if (validatedFields.success) {
              const res = await registerApi.send({
                email: email,
                code: code,
                password: md5(password),
                requestId: requestId,
              });
            }

            
          }}
        >
          {t("User.registersubmit")}
        </Button>
      </div>
    </div>
    
  );
}
