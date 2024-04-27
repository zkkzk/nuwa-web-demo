"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import ClearLocalstorge from "../settings/ClearLocalstorge";
import FeedbackIcon from "../icons/FeedbackIcon";
import NuwaButton from "../components/NuwaButton";
import ClearIcon from "../icons/ClearIcon";
import ContactUsIcon from "../icons/ContactUsIcon";
import Me_Avatar from "./Me_Avatar";
import MeUsernameIcon from "../icons/MeUsernameIcon";
import MeEmailIcon from "../icons/MeEmailIcon";
import MeWeb3WalletIcon from "../icons/MeWeb3WalletIcon";
import MeUpdatePasswordIcon from "../icons/MeUpdatePasswordIcon";
import MeDeleteAccountIcon from "../icons/MeDeleteAccountIcon";
import { Button, Input } from "@nextui-org/react";

export default function Me() {
  const t = useTranslations();
  const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] =
    useState(true);

  return (
    <div className="px-4 sm:px-36 relative">
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
            <div className="flex flex-row justify-between py-5">
              <div className="flex flex-row gap-2 items-center">
                <div className="w-6">
                  <MeUsernameIcon className={""} />
                </div>
                <div className="w-[151px] opacity-80 text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">{t('Me.usename')}</div>
              </div>
              <div className="text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">
                <Input type="text" variant="underlined" placeholder={t('Me.usenametoken')} />
              </div>
            </div>
            <div className="flex flex-row justify-between py-5">
              <div className="flex flex-row gap-2 items-center">
                <div className="w-6">
                  <MeEmailIcon className={""} />
                </div>
                <div className="w-[151px] opacity-80 text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">{t('Me.email')}</div>
              </div>
              <div className="text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">
                <Input type="email" variant="underlined" placeholder={t('Me.emailtoken')}  />
              </div>
            </div>
            <div className="flex flex-row justify-between py-5">
              <div className="flex flex-row gap-2 items-center">
                <div className="w-6">
                  <MeWeb3WalletIcon className={""} />
                </div>
                <div className="w-[151px] opacity-80 text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">{t('Me.web3wallet')}</div>
              </div>
              <div className="text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">
                <NuwaButton
                  size="sm"
                  shadowghost="black"
                  className="w-[140px]"
                >{t('Me.web3walletbtn')}</NuwaButton>
              </div>
            </div>
            <div className="flex flex-row justify-between py-5">
              <div className="flex flex-row gap-2 items-center">
                <div className="w-6">
                  <MeUpdatePasswordIcon className={""} />
                </div>
                <div className="w-[151px] opacity-80 text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">{t('Me.updatepassword')}</div>
              </div>
              <div className="text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">
                <NuwaButton
                  size="sm"
                  shadowghost="black"
                  className="w-[140px]"
                >{t('Me.updatepasswordbtn')}</NuwaButton>
              </div>
            </div>
            <div className="flex flex-row justify-between py-5">
              <div className="flex flex-row gap-2 items-center">
                <div className="w-6">
                  <MeDeleteAccountIcon className={""} />
                </div>
                <div className="w-[151px] opacity-80 text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">{t('Me.deleteaccount')}</div>
              </div>
              <div className="text-neutral-700 text-sm font-normal leading-relaxed tracking-tight">
                <NuwaButton
                  size="sm"
                  shadowghost="black"
                  className="w-[140px]"
                >{t('Me.deleteaccountbtn')}</NuwaButton>
              </div>
            </div>
            <div className="flex flex-row justify-end py-5">
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
