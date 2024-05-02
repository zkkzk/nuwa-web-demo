import React from 'react'
import Register from '@/app/ui/register/Register'
import { NextIntlClientProvider,useMessages } from 'next-intl'
import { AlterMessageContextProvider } from '@/app/ui/components/AlterMessageContextProvider';
require('@solana/wallet-adapter-react-ui/styles.css');

function RegisterPage() {
  const messages = useMessages();
  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <AlterMessageContextProvider>
          <Register />
        </AlterMessageContextProvider>
      </NextIntlClientProvider>
    </>
  )
}

export default RegisterPage