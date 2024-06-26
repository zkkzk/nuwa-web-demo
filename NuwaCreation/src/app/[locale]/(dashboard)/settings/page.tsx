import React from 'react'
import Settings from '@/app/ui/settings/Settings'
import { NextIntlClientProvider,useMessages } from 'next-intl'

function SettingsPage() {
  const messages = useMessages();
  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <Settings/>
      </NextIntlClientProvider>
    </>
  )
}

export default SettingsPage