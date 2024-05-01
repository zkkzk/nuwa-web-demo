"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { useEffect } from "react";
import { Input } from "@nextui-org/react";

const styles = {
  item: "flex flex-row justify-between items-center h-20"
}

export default function Login() {
  const t = useTranslations();
  const [ usernameIsEdit, setUsernameIsEdit ] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const [ emailIsEdit, setEmailIsEdit ] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (usernameIsEdit) {
      usernameRef.current?.focus();
    }
  }, [usernameIsEdit])
  useEffect(() => {
    if (emailIsEdit) {
      emailRef.current?.focus();
    }
  }, [emailIsEdit])

  return (
    <div className="px-4 md:px-10 lg:px-16 xl:px-36 relative min-h-[80vh]">
    <Input
      ref={emailRef}
      type="text"
      size="sm"
      variant="underlined"
      placeholder={t('Me.usenametoken')}
      className=""
      onBlur={() => {

      }}
    />
    <Input
      ref={usernameRef}
      type="text"
      size="sm"
      variant="underlined"
      placeholder={t('Me.usenametoken')}
      className=""
      onBlur={() => {

      }}
    />
    </div>
  );
}
