"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import FlashIcon from "@/app/icons/FlashIcon";
import { Button } from "@nextui-org/react";
import { InstantGenerateParamsterType } from "@/app/lib/definitions.voice";
import { voiceInf } from "@/app/lib/voice.api";

function MainStationInfButton({
  isDisabled,
  value,
  type,
  onSuccess,
} : {
  isDisabled: boolean;
  value: InstantGenerateParamsterType;
  type: "audio" | "code"
  onSuccess: () => void
}) {
  const [loading, setLoading] = useState(false);

  const voiceInfApi = voiceInf();
  const voiceInfApiServer = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    const res = await voiceInfApi.send({
      ...value,
      inf_type: type,
    });
    if (res && res.code === 0) {
      onSuccess();
    }

    setLoading(false);
  };

  return (
    <>
      {type === "audio" && (
        <Button
          isDisabled={isDisabled}
          isLoading={loading}
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
          color="default"
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
