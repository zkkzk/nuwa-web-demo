"use client";
import React from "react";
import VoicePreview from "../components/voice-preview/VoicePreview";



function VoiceHistoryItemVoiceRreview({voiceSrc}: {
  voiceSrc: string
}) {

  return (
    <div className="w-full">
		  <VoicePreview voiceSrc={voiceSrc} classNames={{
        voicePreview: "bg-neutral-900",
        playButton: "w-8 h-8"
      }} />
    </div>
  );
}

export default VoiceHistoryItemVoiceRreview;
