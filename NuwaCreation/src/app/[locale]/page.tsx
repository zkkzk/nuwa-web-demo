import Homepage from "@/app/ui/Homepage";
import { redirect } from "@/navigation";
import { NextIntlClientProvider, useMessages } from "next-intl";
export default function Home() {
  const messages = useMessages();
  
  redirect(`/overview`)
  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <Homepage />
      </NextIntlClientProvider>
    </>
  );
}
