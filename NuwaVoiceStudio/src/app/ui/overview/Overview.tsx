"use client";
import React, { useState } from "react";
import { Link, useRouter } from "@/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useAmDispatch } from "../components/AlterMessageContextProvider";

function Overview() {
  const router = useRouter();
  const t = useTranslations();
  const amDispatch = useAmDispatch();

  return (
    <div className="mx-auto max-w-7xl pb-32 flex flex-col">
      <div>
        1231
      </div>
      
    </div>
  );
}

export default Overview;
