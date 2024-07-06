"use client";
import DCubeIcon from "@/app/icons/3DCubeIcon";
import { ArrowDownTrayIcon, ShareIcon } from "@heroicons/react/24/solid";
import { CheckBadgeIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { voicePublishInfoType } from "@/app/lib/definitions.InstantGenerateParamster";
import { downloadVoiceModel } from "@/app/lib/voice.api";
import { getStarNumStr } from "@/app/lib/utils";
import moment from 'moment';
import { useAmDispatch } from "../components/alter-message/AlterMessageContextProvider";
import VoiceModelCollectButton from "./VoiceModelCollectButton";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";

function VoiceAssetDetailRight({
  voicePublishInfo, 
}: {
  voicePublishInfo: voicePublishInfoType
}) {
  const [downlanding, setDownlanding] = useState(false);
  const amDispatch = useAmDispatch();

  const downloadVoiceModelApi = downloadVoiceModel();
  const downloadVoiceModelServer = async () => {
    if (downlanding) {
      return;
    }
    setDownlanding(true);

    const res = await downloadVoiceModelApi.send({
      "publish_id": voicePublishInfo.publish_id,
      // gpt_path
      // sovits_path
    });
    if (res && res.code === 0) {
      setDownlanding(true);

      if (res.data.gpt_path) {
        const gptA = document.createElement("a");
        gptA.href = res.data.gpt_path;
        gptA.download = res.data.gpt_path;
        document.body.appendChild(gptA);
        gptA.click();
        document.body.removeChild(gptA);
      } else {
        amDispatch({
          type: "add",
          payload: {
            message: 'gpt file not exist',
            type: "error"
          },
        })
      }

      if (res.data.sovits_path) {
        const sovitsA = document.createElement("a");
        sovitsA.href = res.data.sovits_path;
        sovitsA.download = res.data.sovits_path;
        document.body.appendChild(sovitsA);
        sovitsA.click();
        document.body.removeChild(sovitsA);
      } else {
        amDispatch({
          type: "add",
          payload: {
            message: 'sovits file not exist',
            type: "error"
          },
         })
      }
      setDownlanding(false);
    }

    setDownlanding(false);
  };
  return (
    <div className="flex-col justify-start items-start gap-6 inline-flex">
      <div className="self-stretch justify-between items-end inline-flex">
        <div className="w-full shrink-0 self-stretch justify-end items-center gap-2 flex">
          <VoiceModelCollectButton like={voicePublishInfo.like} publishId={voicePublishInfo.publish_id} starNum={voicePublishInfo.star_num} />
					<Button size="lg" variant="bordered"  startContent={<EllipsisHorizontalIcon className="fill-zinc-400 w-6 h-6" />} isIconOnly={true} />
        </div>
      </div>
      <div className="justify-start items-start gap-2 inline-flex">
        <Button size="lg" color="primary" variant="solid" className="w-[230px]" startContent={<DCubeIcon className="h-6 w-6 fill-white" />}>Run on WorkStation</Button>
        {voicePublishInfo.publish_info.permission.download_permission && (<Button size="lg" variant="bordered" startContent={<ArrowDownTrayIcon className="fill-zinc-400 w-6 h-6" />} isIconOnly={true} onPress={downloadVoiceModelServer} />) }
        <Button size="lg" variant="bordered" startContent={<ShareIcon className="fill-zinc-400 w-6 h-6" />} isIconOnly={true} />
      </div>
      <div className="self-stretch h-[396px] flex-col justify-start items-start flex">
        <div className="self-stretch justify-start items-start inline-flex">
          <div className="grow shrink basis-0 py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 inline-flex">
            <div className="self-stretch text-zinc-400 text-xs font-normal font-['Inter'] leading-none">
              Runnings
            </div>
            <div className="self-stretch text-white text-sm font-semibold font-['Inter'] leading-tight">
              {getStarNumStr(voicePublishInfo.inf_num)}
            </div>
          </div>
          <div className="grow shrink basis-0 py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 inline-flex">
            <div className="self-stretch text-zinc-400 text-xs font-normal font-['Inter'] leading-none">
              Downloads
            </div>
            <div className="self-stretch text-white text-sm font-semibold font-['Inter'] leading-tight">
              {getStarNumStr(voicePublishInfo.d_num)}
            </div>
          </div>
          <div className="grow shrink basis-0 py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 inline-flex">
            <div className="self-stretch text-zinc-400 text-xs font-normal font-['Inter'] leading-none">
              Sharing
            </div>
            <div className="self-stretch text-white text-sm font-semibold font-['Inter'] leading-tight">
              {getStarNumStr(voicePublishInfo.star_num)}
            </div>
          </div>
        </div>
        <div className="self-stretch h-[68px] py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 flex">
          <div className="self-stretch text-zinc-400 text-xs font-normal font-['Inter'] leading-none">
            By
          </div>
          <div className="self-stretch justify-center items-start gap-2.5 inline-flex">
            <div className="text-white text-sm font-semibold font-['Inter'] leading-tight">
              fuhsi Voice Studio
            </div>
            <div className="grow shrink basis-0 text-white text-sm font-semibold font-['Inter'] leading-tight">
              Self-trained
            </div>
          </div>
        </div>
        <div className="self-stretch h-[68px] py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 flex">
          <div className="self-stretch text-zinc-400 text-xs font-normal font-['Inter'] leading-none">
            Time
          </div>
          <div className="text-white text-sm font-semibold font-['Inter'] leading-tight">
          {moment(voicePublishInfo.created_at).format('hh:mm MMMM DD YYYY')}
          </div>
        </div>
        <div className="self-stretch h-[68px] py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 flex">
          <div className="self-stretch text-zinc-400 text-xs font-normal font-['Inter'] leading-none">
            Source
          </div>
          <div className="self-stretch justify-start items-center gap-2.5 inline-flex">
            <div className="text-white text-sm font-semibold font-['Inter'] leading-tight">
              {voicePublishInfo.publish_info.source === 'original' ? 'Original' : 'Reprint'}
            </div>
            {voicePublishInfo.publish_info.source !== 'original' && voicePublishInfo.publish_info.source.length > 0 && (
              <div className="grow shrink basis-0 text-white text-sm font-semibold font-['Inter'] leading-tight">
                From: {voicePublishInfo.publish_info.source}
              </div>
            )} 
            
          </div>
        </div>
        <div className="self-stretch py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 flex">
          <div className="self-stretch text-zinc-400 text-xs font-normal font-['Inter'] leading-none">
            Permissions
          </div>
          <div className="flex-col justify-center items-start gap-2 flex">
            <div className="w-full justify-start items-center gap-2 inline-flex">
              {voicePublishInfo.publish_info.permission.download_permission ? (
                <CheckCircleIcon className="w-5 h-5 fill-green-500" />
              ): (
                <XCircleIcon className="w-5 h-5 fill-rose-600" />
              )}
              <div className="text-white text-sm font-semibold font-['Inter'] leading-tight">
                {voicePublishInfo.publish_info.permission.download_permission ? 'Free download' : 'Do not allow downloads'}
              </div>
            </div>
            <div className="w-full justify-start items-center gap-2 inline-flex">
              {voicePublishInfo.publish_info.permission.credit_free ? (
                <CheckCircleIcon className="w-5 h-5 fill-green-500" />
              ): (
                <XCircleIcon className="w-5 h-5 fill-rose-600" />
              )}
              <div className="text-white text-sm font-semibold font-['Inter'] leading-tight">
                {voicePublishInfo.publish_info.permission.credit_free ? 'Credit Free' : 'Credit Free'}
              </div>
            </div>
            <div className="w-full justify-start items-center gap-2 inline-flex">
              {voicePublishInfo.publish_info.permission.reprint_allowed ? (
                <CheckCircleIcon className="w-5 h-5 fill-green-500" />
              ): (
                <XCircleIcon className="w-5 h-5 fill-rose-600" />
              )}
              <div className="text-white text-sm font-semibold font-['Inter'] leading-tight">
                {voicePublishInfo.publish_info.permission.reprint_allowed ? 'Reprint Allowed' : 'Reprint Allowed'}
              </div>
            </div>
            <div className="w-full justify-start items-center gap-2 inline-flex">
              {voicePublishInfo.publish_info.permission.modification_allowed ? (
                <CheckCircleIcon className="w-5 h-5 fill-green-500" />
              ): (
                <XCircleIcon className="w-5 h-5 fill-rose-600" />
              )}
              <div className="text-white text-sm font-semibold font-['Inter'] leading-tight">
                {voicePublishInfo.publish_info.permission.modification_allowed ? 'Modification Allowed' : 'Modification Declined'}
              </div>
            </div>
            <div className="w-full justify-start items-center gap-2 inline-flex">
              {voicePublishInfo.publish_info.permission.permission_change_allowed ? (
                <CheckCircleIcon className="w-5 h-5 fill-green-500" />
              ): (
                <XCircleIcon className="w-5 h-5 fill-rose-600" />
              )}
              <div className="text-white text-sm font-semibold font-['Inter'] leading-tight">
                {voicePublishInfo.publish_info.permission.permission_change_allowed ? 'Permission Change Allowed' : 'Permission Change Declined'}
              </div>
            </div>
            <div className="w-full justify-start items-center gap-2 inline-flex">
              {voicePublishInfo.publish_info.permission.commercial_license ? (
                <CheckBadgeIcon className="w-5 h-5 fill-amber-500" />
              ): (
                <XCircleIcon className="w-5 h-5 fill-rose-600" />
              )}
              <div className="text-white text-sm font-semibold font-['Inter'] leading-tight">
                {voicePublishInfo.publish_info.permission.commercial_license ? 'Commercial Use Allowed' : 'Commercial Use Declined'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoiceAssetDetailRight;
