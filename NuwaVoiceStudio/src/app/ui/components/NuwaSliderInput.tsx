"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useAmDispatch } from "../components/AlterMessageContextProvider";
import { Tooltip } from "@nextui-org/react";
import NuwaInput from "../components/NuwaInput";
import NuwaSlider from "../components/NuwaSlider";

function NuwaSliderInput({
  label,
  step,
  maxValue, 
  minValue,
  value,
  onChange,
}: {
  label: string;
  step: number
  maxValue: number;
  minValue: number;
  value: number;
  onChange: (value: number) => void;
}) {
  const t = useTranslations();
  const amDispatch = useAmDispatch();

  const [inputValue, setInputValue] = React.useState(String(value));

  const handleChange = (value: any) => {
    if (isNaN(Number(value))) return;

    onChange(value);
    setInputValue(value.toString());
  };

  useEffect(() => {
    setInputValue(String(value))
  }, [value])

  return (
    <NuwaSlider 
      label={label} 
      size="sm"
      step={step} 
      maxValue={maxValue} 
      minValue={minValue} 
      color="primary"
      hideValue={true}
      value={value}
      onChange={handleChange}
      // we extract the default children to render the input
      endContent={
        <output>
          <Tooltip
            className="text-tiny text-default-500 rounded-md"
            content="Press Enter to confirm"
            placement="left"
          >
            <NuwaInput
              className="w-16"
              size="sm"
              type="text"
              variant="bordered"
              aria-label="Temperature value"
              value={inputValue}
              onChange={(e) => {
                const v = e.target.value;

                setInputValue(v);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isNaN(Number(inputValue))) {
                  onChange(Number(inputValue));
                }
              }}
              onBlur={(e) => {
                onChange(Number(inputValue));
              }}
            />
          </Tooltip>
        </output>
      }
    />
  );
}

export default NuwaSliderInput;
