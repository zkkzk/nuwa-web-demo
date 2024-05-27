
import Overview from "@/app/ui/overview/Overview";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function VoiceAsset() {
  const messages = useMessages();
  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <Overview />
      </NextIntlClientProvider>
    </>
  );
}
