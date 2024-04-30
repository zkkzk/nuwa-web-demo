"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import NuwaButton from "../components/NuwaButton";
import Me_Avatar from "./Me_Avatar";
import { Button, Input } from "@nextui-org/react";
import { EnvelopeIcon, LockClosedIcon, PowerIcon, UserIcon, WalletIcon } from "@heroicons/react/24/outline";
import { WalletModalProvider } from "../../_solana/components/WalletModalProvider";
import WalletContextProvider from "../../_solana/contexts/WalletContextProvider";
// import { MintNFTButton } from "../../_solana/components/MintNFTButton";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { useEffect } from "react";
const MintNFTButton = dynamic(() => import('../../_solana/components/MintNFTButton'), { ssr: false })
const WalletMultiButton  = dynamic(() => import('../../_solana/components/WalletMultiButton'), { ssr: false })

const styles = {
  item: "flex flex-row justify-between items-center h-20"
}

export default function Me() {
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
      <div className="absolute right-6 top-6">
        <Button
          className="bg-black text-white"
          size="sm"
          onClick={() => {
          }}
        >{t('Me.savebtn')}</Button>
      </div>
      <div className="gap-8 flex flex-col sm:flex-row mb-20 pt-10">
        <div className="w-full sm:w-[200px]">
          <Me_Avatar />
        </div>
        
        <div
          className="w-full sm:grow"
        >
          <div
            className="mb-16 w-full h-[30px] text-black text-3xl font-bold leading-[54px] tracking-tight"
          >
            {t('Me.title')}
          </div>
          <div className="grid grid-cols-1 divide-y">
            <div className={styles.item}>
              <div className="flex flex-row gap-2 items-center">
                <div className="w-6">
                  <UserIcon className={""} />
                </div>
                <div className="mr-10 opacity-80 text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">{t('Me.usename')}</div>
              </div>
              <div className="text-neutral-700 text-sm font-normal leading-relaxed tracking-tight flex flex-row">
                <Input
                  ref={usernameRef}
                  type="text"
                  size="sm"
                  variant="underlined"
                  placeholder={t('Me.usenametoken')}
                  className={`${usernameIsEdit ? "flex" : "hidden"}`}
                  onBlur={() => {
                    setUsernameIsEdit(false);
                  }}
                />
                <div
                  className={`${!usernameIsEdit ? "block" : "hidden"}`}
                  onClick={() => {
                    setUsernameIsEdit(true);
                  }}
                >{t('Me.usenametoken')}</div>
              </div>
            </div>
            <div className={styles.item}>
              <div className="flex flex-row gap-2 items-center">
                <div className="w-6">
                  <EnvelopeIcon className={""} />
                </div>
                <div className="mr-10 opacity-80 text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">{t('Me.email')}</div>
              </div>
              <div className="text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">
              <Input
                  ref={emailRef}
                  type="email"
                  size="sm"
                  variant="underlined"
                  placeholder={t('Me.emailtoken')}
                  className={`hidden ${emailIsEdit ? "flex" : "hidden"}`}
                  onBlur={() => {
                    setEmailIsEdit(false);
                  }}
                />
                <div
                  className={`${!emailIsEdit ? "block" : "hidden"}`}
                  onClick={() => {
                    setEmailIsEdit(true);
                  }}
                >{t('Me.emailtoken')}</div>
              </div>
            </div>
            <div className={styles.item}>
              <div className="flex flex-row gap-2 items-center">
                <div className="w-6">
                  <WalletIcon className={""} />
                </div>
                <div className="mr-10 opacity-80 text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">{t('Me.web3wallet')}</div>
              </div>
              <div className="text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">

                <WalletContextProvider>
                  <WalletModalProvider>
                    <WalletMultiButton
                      size="sm"
                      shadowghost="black"
                      className="w-[140px]"
                    />
                  </WalletModalProvider>
                  {/* <MintNFTButton /> */}
                </WalletContextProvider>
              </div>
            </div>
            <div className={styles.item}>
              <div className="flex flex-row gap-2 items-center">
                <div className="w-6">
                  <LockClosedIcon className={""} />
                </div>
                <div className="mr-10 opacity-80 text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">{t('Me.updatepassword')}</div>
              </div>
              <div className="text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">
                <NuwaButton
                  size="sm"
                  shadowghost="black"
                  className="w-[140px]"
                >{t('Me.updatepasswordbtn')}</NuwaButton>
              </div>
            </div>
            <div className={styles.item}>
              <div className="flex flex-row gap-2 items-center">
                <div className="w-6">
                  <PowerIcon className={""} />
                </div>
                <div className="mr-10 opacity-80 text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">{t('Me.deleteaccount')}</div>
              </div>
              <div className="text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">
                <NuwaButton
                  size="sm"
                  shadowghost="black"
                  className="w-[140px]"
                >{t('Me.deleteaccountbtn')}</NuwaButton>
              </div>
            </div>
            <div className={styles.item}>
              <div></div>
              <div className="text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">
                <NuwaButton
                  size="sm"
                  shadowghost="black"
                  className="w-[140px]"
                >{t('Me.logoutbtn')}</NuwaButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
