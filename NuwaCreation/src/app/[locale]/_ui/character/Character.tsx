'use client'
import React from "react";
import {Tabs, Tab, Card, CardBody, Button} from "@nextui-org/react";
import { Link } from '@/navigation';
import { useTranslations, useLocale } from "next-intl";
import {
  PaperAirplaneIcon
} from '@heroicons/react/24/outline'
import { usePathname } from "next/navigation";
import dynamic from 'next/dynamic'

const InforMation = dynamic(() => import('./InforMation'), { ssr: false })
const Scenario = dynamic(() => import('./Scenario'), { ssr: false })
const Mes_Example = dynamic(() => import('./Mes_Example'), { ssr: false })
const Avatar = dynamic(() => import('./Avatar'), { ssr: false })
const Voice = dynamic(() => import('./Voice'), { ssr: false })
const Prompt_Overrides = dynamic(() => import('./Prompt_Overrides'), { ssr: false })
const Depth_Prompt = dynamic(() => import('./Depth_Prompt'), { ssr: false })

export default function Character() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  
  return (
      <div className="relative flex w-full flex-col">
        <Link href="/previews" className="absolute right-0 top-0">
          <Button className="bg-black text-white" startContent={<PaperAirplaneIcon className="h-4 w-4"/>}>{t('Navigation.previews')}</Button>
        </Link>
        <div className="flex w-full flex-col">
          <Tabs
            aria-label="Options"
            selectedKey={pathname}
            variant="solid"
            classNames={{
              base: "mr-32",
              tabList: "bg-[#D9D9D9]",
              cursor: "w-full bg-[#0C0C0C] text-white",
              tab:"group-data-[selected=true]:bg-[#0C0C0C] p-0",
              tabContent: "text-zinc-800 group-data-[selected=true]:text-white w-full h-full",
            }}
          >
            <Tab key={`/${locale}/character`} id="information" title={
              <Link className="w-full h-full px-4 block leading-8" href={`/character`}>{t('Character.information')}</Link>
            }>
              <InforMation />
            </Tab>
            <Tab key={`/${locale}/character/scenario`} id="scenario" title={
              <Link className="w-full h-full px-4 block leading-8" href={`/character/scenario`}>{t('Character.scenario')}</Link>
            }>
              <Scenario />
            </Tab>
            <Tab key={`/${locale}/character/mesexample`} id="mesexample" title={
              <Link className="w-full h-full px-4 block leading-8" href={`/character/mesexample`}>{t('Character.mesexample')}</Link>
            }>
              <Mes_Example />
            </Tab>
            <Tab key={`/${locale}/character/avatar`} id="avatar" title={
              <Link className="w-full h-full px-4 block leading-8" href={`/character/avatar`}>{t('Character.avatar')}</Link>
            }>
              <Avatar />
            </Tab>
            <Tab key={`/${locale}/character/voice`} id="voice" title={
              <Link className="w-full h-full px-4 block leading-8" href={`/character/voice`}>{t('Character.voice')}</Link>
            }>
              <Voice />
            </Tab>
            <Tab key={`/${locale}/character/promptoverrdies`} id="promptoverrdies" title={
              <Link className="w-full h-full px-4 block leading-8" href={`/character/promptoverrdies`}>{t('Character.promptoverrdies')}</Link>
            }>
              <Card>
                <CardBody>
                  <Prompt_Overrides/>
                </CardBody>
              </Card>  
            </Tab>
            <Tab key={`/${locale}/character/depthprompt`} id="depthprompt" title={
              <Link className="w-full h-full px-4 block leading-8" href={`/character/depthprompt`}>{t('Character.depthprompt')}</Link>
            }>
              <Card>
                <CardBody>
                  <Depth_Prompt/>
                </CardBody>
              </Card> 
            </Tab>
          </Tabs>
        </div>
        
      </div>
  );
}
