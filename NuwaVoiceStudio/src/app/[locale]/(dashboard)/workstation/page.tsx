
import WorkStation from "@/app/ui/workstation/WorkStation";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function workStation() {
  const messages = useMessages();
  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <WorkStation />
      </NextIntlClientProvider>
    </>
  );
}
