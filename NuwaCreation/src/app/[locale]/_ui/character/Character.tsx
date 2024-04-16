'use client'
import React from "react";
import {Tabs, Tab, Card, CardBody, Button} from "@nextui-org/react";
import { Link } from '@/navigation';
import InforMation from "./InforMation";
import Description from "./Description";
import Scenario from "./Scenario";
import First_Message from "./First_Message";
import Prompt_Overrides from "./Prompt_Overrides";
import { useTranslations } from "next-intl";
import Mes_Example from "./Mes_Example";
import Depth_Prompt from "./Depth_Prompt";
import Avatar from "./Avatar";
import {
  PaperAirplaneIcon
} from '@heroicons/react/24/outline'
import Voice from "./Voice";

export default function Character() {
  const t = useTranslations();
  return (
      <div className="relative flex w-full flex-col">
        <Link href="/previews" className="absolute right-0 top-0">
          <Button className="bg-black text-white" startContent={<PaperAirplaneIcon className="h-4 w-4"/>}>{t('Navigation.previews')}</Button>
        </Link>
        <div className="flex w-full flex-col">
          <Tabs
            aria-label="Options"
            variant="solid"
            classNames={{
              base: "mr-32",
              tabList: "bg-[#D9D9D9]",
              cursor: "w-full bg-[#0C0C0C] text-white",
              tab:"group-data-[selected=true]:bg-[#0C0C0C]",
              tabContent: "text-zinc-800 group-data-[selected=true]:text-white",
            }}
          >
            <Tab key="inforMation" title={t('Character.information')}>
              <InforMation/>
            </Tab>
            <Tab key="scenario" title={t('Character.scenario')}>
              <Scenario/>
            </Tab>
            <Tab key="mes_example" title={t('Character.mesexample')}>
              <Mes_Example/>
            </Tab>
            <Tab key="avatar" title={t('Character.avatar')}>
              <Avatar />
            </Tab>
            <Tab key="voice" title={t('Character.voice')}>
              <Voice />
            </Tab>
            <Tab key="prompt_overrides" title={t('Character.promptoverrdies')}>
              <Card>
                <CardBody>
                  <Prompt_Overrides/>
                </CardBody>
              </Card>  
            </Tab>
            <Tab key="depth_prompt" title={t('Character.depthprompt')}>
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
