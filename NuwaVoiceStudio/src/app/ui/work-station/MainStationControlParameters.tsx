"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { useAmDispatch } from "../components/AlterMessageContextProvider";
import { Accordion, AccordionItem, Button, Tab, Tabs } from "@nextui-org/react";
import ResetIcon from "@/app/icons/ResetIcon";
import MainStationControlParametersBasics from "./MainStationControlParametersBasics";
import MainStationControlParametersAdvanced from "./MainStationControlParametersAdvanced";
import { DefaultInstantGenerateParamster, TypeInstantGenerateParamster } from "@/app/lib/definitions.InstantGenerateParamster";
import NuwaTabs from "../components/NuwaTabs";


function MainStationControlParameters() {
  const router = useRouter();
  const t = useTranslations();
  const amDispatch = useAmDispatch();
  const [selected, setSelected] = useState("basics");
  const [isReset, setIsReset] = useState(false);

  const [parameters, setParameters] = useState<TypeInstantGenerateParamster>(DefaultInstantGenerateParamster)

  const handleReset = () => {
    setIsReset(true);
    setParameters(DefaultInstantGenerateParamster)
  };

  useEffect(() => {
    if(isReset) {
      setTimeout(() => {
        setIsReset(false);
      }, 1000)
    }
  }, [isReset])


  return (
    <div className="w-full px-6">

      <Accordion
      >
        <AccordionItem
          key="1"
          aria-label="Parameters"
          title="Parameters"
          classNames={{
            base: "px-8 w-full bg-neutral-800 rounded-tl-2xl rounded-tr-2xl shadow backdrop-blur-[100px]",
            content: "pb-8"
          }}
        >
          <div className="self-stretch flex-col justify-end items-center gap-4 flex relative">
            <div className="absolute right-0 top-0">
              <Button
                variant="light"
                className="text-gray-500 text-sm font-semibold font-['Inter']"
                startContent={<ResetIcon className={`h-5 w-5 text-current ${isReset && "-animate-spin"}`} />}
                onClick={handleReset}
              >
              Reset
              </Button> 
            </div>
            <NuwaTabs
              aria-label="Options"     
              selectedKey={selected}
              onSelectionChange={(key) => setSelected(key as string)}
            >
              <Tab key="basics" title="Basics">
                <MainStationControlParametersBasics value={parameters} onChange={setParameters} />
              </Tab>
              <Tab key="advanced" title="Advanced">
                <MainStationControlParametersAdvanced value={parameters} onChange={setParameters} />
              </Tab>
            </NuwaTabs>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default MainStationControlParameters;