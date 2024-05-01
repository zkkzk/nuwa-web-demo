import React from 'react'
import Register from '@/app/ui/register/Register'
import { NextIntlClientProvider,useMessages } from 'next-intl'
require('@solana/wallet-adapter-react-ui/styles.css');

function RegisterPage() {
  const messages = useMessages();
  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <Register />
      </NextIntlClientProvider>
    </>
  )
}

export default RegisterPage