"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import FlashIcon from "@/app/icons/FlashIcon";
import { Button } from "@nextui-org/react";
import { InfType, InstantGenerateParamsterType, VoiceInfHistoryType } from "@/app/lib/definitions.voice";
import { voiceInf } from "@/app/lib/voice.api";

function MainStationInfButton({
  isDisabled,
  value,
  type,
  onSuccess,
  onSendingChange,
} : {
  isDisabled: boolean;
  value: InstantGenerateParamsterType;
  type: "audio" | "code"
  onSuccess: (newInf: VoiceInfHistoryType) => void
  onSendingChange?: ({sending, infType} : {sending: boolean, infType: InfType}) => void
}) {
  const [sending, setSending] = useState(false);

  const voiceInfApi = voiceInf();
  const voiceInfApiServer = async () => {
    if (sending) {
      return;
    }
    setSending(true);
    onSendingChange && onSendingChange({
      sending: true,
      infType: type,
    });

    const res = await voiceInfApi.send({
      ...value,
      inf_type: type,
    });
    if (res && res.code === 0) {
      onSuccess(res.data.inf_info);
    }

    onSendingChange && onSendingChange({
      sending: false,
      infType: type,
    });
    setSending(false);
  };

  return (
    <>
      {type === "audio" && (
        <Button
          isDisabled={isDisabled}
          isLoading={sending}
          color="primary"
          size="lg"
          endContent={
            <div className="h-6 pl-1 pr-2 py-0.5 bg-green-500 rounded-md justify-center items-center gap-1 flex">
              <FlashIcon className="w-4 h-4 fill-neutral-900 stroke-neutral-900 relative" />
              <div className="text-center text-neutral-900 text-xs font-semibold font-['Inter']">
                X 4
              </div>
            </div>
          }
          onPress={() => {
            voiceInfApiServer()
          }}
        >Instant Generate</Button>
      )}
      {type === "code" && (
        <Button
          isDisabled={isDisabled}
          color="primary"
          size="lg"
          onPress={() => {
            voiceInfApiServer()
          }}
        >Generate API Address</Button>
      )}
    </>
  );
}

export default MainStationInfButton;
