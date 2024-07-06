"use client";
import React, { useEffect, useState } from "react";
import { voicePublishInfoType } from "@/app/lib/definitions.InstantGenerateParamster";
import { downloadVoiceModel } from "@/app/lib/voice.api";
import { useAmDispatch } from "../alter-message/AlterMessageContextProvider";

function VoiceModelDownloadButton({
  publishId,
  modelId,
  startDownload = 0,
}: {
  publishId?: string
  modelId?: string
  startDownload: number
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
      "model_if": modelId || '',
      "publish_id": publishId || ''
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

  useEffect(() => {
    if (startDownload > 0) {
      downloadVoiceModelServer();
    }
  }, [startDownload])
  return (
    <div className="hidden"></div>
  );
}

export default VoiceModelDownloadButton;
