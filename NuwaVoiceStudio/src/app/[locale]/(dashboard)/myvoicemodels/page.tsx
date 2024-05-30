import WorkStation from "@/app/ui/workstation/WorkStation";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function MyVoiceModels() {
  const messages = useMessages();
  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <WorkStation />
      </NextIntlClientProvider>
    </>
  );
}
