'use client'
import React from "react";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import InforMation from "./InforMation";
import Description from "./Description";
import First_Message from "./First_Message";
import Prompt_Overrides from "./Prompt_Overrides";
import { useTranslations } from "next-intl";
import Mes_Example from "./Mes_Example";
import Depth_Prompt from "./Depth_Prompt";

export default function Character() {
  const t = useTranslations();
  return (
      <Tabs
        aria-label="Options"
        classNames={{
          tab: "",
          tabContent: "text-zinc-800",
        }}
      >
        <Tab key="inforMation" title={t('Character.information')}>
          <InforMation/>
        </Tab>
        <Tab key="description" title={t('Character.description')}>
          <Card>
            <CardBody>
              <Description/>
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="first_mes" title={t('Character.firstmessage')}>
          <Card>
            <CardBody>
              <First_Message/>
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="prompt_overrides" title={t('Character.promptoverrdies')}>
          <Card>
            <CardBody>
              <Prompt_Overrides/>
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="mes_example" title={t('Character.mesexample')}>
          <Card>
            <CardBody>
              <Mes_Example/>
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
  );
}
