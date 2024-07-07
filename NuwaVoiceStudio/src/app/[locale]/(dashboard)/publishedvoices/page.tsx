
import PublishedVoices from "@/app/ui/published-voices/PublishedVoices";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function publishedVoices() {
  const messages = useMessages();
  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <PublishedVoices />
      </NextIntlClientProvider>
    </>
  );
}
