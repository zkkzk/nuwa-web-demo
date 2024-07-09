"use client";
import DCubeIcon from "@/app/icons/3DCubeIcon";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { CheckBadgeIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { Button, Snippet, Avatar } from "@nextui-org/react";
import React, { useState } from "react";
import { VoiceModelPublishType } from "@/app/lib/definitions.voice";
import { getStarNumStr } from "@/app/lib/utils";
import moment from 'moment';
import VoiceModelCollectButton from "./VoiceModelCollectButton";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import VoiceModelDownloadButton from "../voice-model-download-button/VoiceModelDownloadButton";
import VoiceInfDrawerModal from "../voice-inf/VoiceInfDrawerModal";
import ShareIcon from "@/app/icons/ShareIcon";
import { StarIcon } from "@heroicons/react/24/solid";
import DownloadIcon from "@/app/icons/DownloadIcon";
import { BeakerIcon } from "@heroicons/react/24/outline";

function VoiceAssetDetailRight({
  voicePublishInfo, 
}: {
  voicePublishInfo: VoiceModelPublishType
}) {
  const [startDownload, setStartDownload] = useState(0);
  const [downloading, setDownlanding] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = typeof window !== 'undefined' && window.location.pathname ? window.location.pathname : '';
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const url = `${origin}${pathname}?publishId=${voicePublishInfo.publish_id}`

  return (
    <div className="flex-col justify-start items-start gap-6 inline-flex">
      <div className="self-stretch justify-between items-end inline-flex">
        <div className="w-full shrink-0 self-stretch justify-end items-center gap-2 flex">
          <VoiceModelCollectButton like={voicePublishInfo.like} publishId={voicePublishInfo.publish_id} starNum={voicePublishInfo.star_num} />
					{/* <Button size="lg" variant="bordered"  startContent={<EllipsisHorizontalIcon className="fill-zinc-400 w-6 h-6" />} isIconOnly={true} /> */}
        </div>
      </div>
      <div className="justify-start items-start gap-2 inline-flex">
        <Button
          size="lg"
          color="primary"
          variant="solid"
          className="w-[230px]"
          startContent={<DCubeIcon className="h-6 w-6 fill-white" />}
          onPress={() => {
            setIsOpen(true)
          }}
        >Run on WorkStation</Button>
        {voicePublishInfo.publish_info.permission.download_permission && (
          <>
            <VoiceModelDownloadButton
              publishId={voicePublishInfo.publish_id}
              startDownload={startDownload}
              onDownloading={(newDownloading) => {
                setDownlanding(newDownloading);
              }}
            />
            <Button
              disableRipple={false}
              size="lg"
              variant="bordered"
              startContent={<ArrowDownTrayIcon className="fill-zinc-400 w-6 h-6" />}
              isIconOnly={true}
              onPress={() => {
                setStartDownload(startDownload + 1);
              }}
              isDisabled={downloading}
            />
          </>
        ) }
        <Snippet
          variant="bordered"
          copyIcon={<ShareIcon className="fill-zinc-400 w-4 h-4" />}
          classNames={{
            pre: 'hidden',
            base: 'px-1.5'
          }}
          size="md"
          hideSymbol={true}
        >
          {url}
        </Snippet>
      </div>
      <div className="self-stretch flex-col justify-start items-start flex">
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
            {/* <div className="text-white text-sm font-semibold font-['Inter'] leading-tight">
              fuhsi Voice Studio
            </div> */}
            <div className="grow shrink basis-0 text-white text-sm font-semibold font-['Inter'] leading-tight">
            { voicePublishInfo.publish_type === 1  && 'DDream Voice Studio'}
            { voicePublishInfo.publish_type === 2  && 'Self-trained'}
            </div>
          </div>
        </div>
        <div className="self-stretch h-[68px] py-3 border-t border-white/opacity-10 flex-col justify-center items-start gap-2 flex">
          <div className="self-stretch text-zinc-400 text-xs font-normal font-['Inter'] leading-none">
            Time
          </div>
          <div className="text-white text-sm font-semibold font-['Inter'] leading-tight">
          {moment(voicePublishInfo.seq, "X").format('hh:mm MMMM DD YYYY')}
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

      <div className="w-full px-4 py-3 bg-zinc-800 rounded-xl border border-zinc-700 justify-start items-start gap-4 inline-flex">
        <div className="justify-start items-start flex">
          {/* {voicePublishInfo.publisher.avatar && (
            <div className="h-10 rounded-full justify-center items-center flex">
              <Image className="grow shrink basis-0 h-10 rounded-full" src={voicePublishInfo.publisher.avatar} />
            </div>
          )}
          {!voicePublishInfo.publisher.avatar && ( */}
            <Avatar name={voicePublishInfo.publisher.name} size="md" src={voicePublishInfo.publisher.avatar} />
          {/* )} */}
        </div>
        <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex divide-y">
          <div className="flex-col justify-start items-start gap-0.5 flex pb-2">
            <div className="text-white text-base font-medium font-['Inter'] leading-normal">{voicePublishInfo.publisher.name}</div>
            <div className="text-zinc-400 text-xs font-normal font-['Inter'] leading-none">Joined {moment(voicePublishInfo.publisher.created_at, "X").format('MMMM DD YYYY')}</div>
          </div>
          <div className="justify-start items-center gap-2.5 inline-flex pt-2">
            <div className="h-4 justify-start items-center gap-1 flex">
                <StarIcon className="w-4 h-4 fill-zinc-400" />
                <div className="text-white text-xs font-normal font-['Inter'] leading-none">{getStarNumStr(2352352)}</div>
            </div>
            <div className="h-4 justify-start items-center gap-1 flex">
              <div className="w-4 h-4 justify-center items-center flex">
                <DownloadIcon className="w-4 h-4 relative" />
              </div>
              <div className="text-white text-xs font-normal font-['Inter'] leading-none">{getStarNumStr(235235224)}</div>
            </div>
              <div className="h-4 justify-start items-center gap-1 flex">
                <BeakerIcon className="w-4 h-4 relative" />
                <div className="text-white text-xs font-normal font-['Inter'] leading-none">{getStarNumStr(23424)}</div>
              </div>
            </div>
          </div>
        </div>

      <VoiceInfDrawerModal
        key={voicePublishInfo.publish_id}
        isOpen={isOpen}
        publishId={voicePublishInfo.publish_id}
        modelId={voicePublishInfo.model_id}
        tones={voicePublishInfo.tone}
        onChange={(isOpen) => { setIsOpen(isOpen); }}
        onSuccess={() => { setIsOpen(false); }}
      />
    </div>
  );
}

export default VoiceAssetDetailRight;
