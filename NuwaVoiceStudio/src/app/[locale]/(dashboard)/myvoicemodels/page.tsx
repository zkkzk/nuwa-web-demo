import MyVoiceModels from "@/app/ui/my-voice-models/MyVoiceModels";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function myVoiceModels() {
  const messages = useMessages();
  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <MyVoiceModels />
      </NextIntlClientProvider>
    </>
  );
}
