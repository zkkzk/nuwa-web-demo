
import Homepage from "@/app/ui/Homepage";
import { NextIntlClientProvider, useMessages } from "next-intl";
export default function Home() {
  const messages = useMessages();
  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <Homepage />
      </NextIntlClientProvider>
    </>
  );
}
