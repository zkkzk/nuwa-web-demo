"use client";
import { Textarea } from "@nextui-org/react";
import React from "react";

export const textareaProps = {
  variant: "bordered",
  labelPlacement: "outside",
  size: "lg",
  minRows: 5,
  classNames: {
    label: "text-2xl text-neutral-800 text-2xl font-bold tracking-tight",
    input: "text-black text-sm font-normal leading-relaxed tracking-tight",
  },
  className: "border-none outline-none w-full h-full resize-none text-[#272727] disabled:bg-transparent break-all",
}

function NuwaTextarea(...props: any) {
  return (
    <>
      <label className="text-neutral-800 text-2xl font-bold tracking-tight mb-6 block">
        {props[0].label}
      </label>
      <Textarea
        {...props[0]}
        {...textareaProps}
        label=""
      />
    </>
      
  );
}

export default NuwaTextarea;
