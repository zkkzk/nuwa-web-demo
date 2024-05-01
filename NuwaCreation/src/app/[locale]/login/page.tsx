import React from 'react'
import Login from '@/app/ui/login/Login'
import { NextIntlClientProvider,useMessages } from 'next-intl'
require('@solana/wallet-adapter-react-ui/styles.css');

function LoginPage() {
  const messages = useMessages();
  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <Login />
      </NextIntlClientProvider>
    </>
  )
}

export default LoginPage