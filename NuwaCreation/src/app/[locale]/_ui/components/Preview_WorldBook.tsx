"use client";
import React from "react";
import { useTranslations } from "next-intl";

import PreviewTitle from "../components/PreviewTitle";
import WorldBook_Preview from "../worldbook/WorldBook_Preview";
import { TypeWorldBook } from "../../_lib/definitions";

function Preview_WorldBook({worldBook}: {worldBook: TypeWorldBook}) {
  const t = useTranslations();

  return (
    <div>   
      <PreviewTitle>{t('Navigation.worldbook')}</PreviewTitle>
      <div className="w-full py-6">
        <WorldBook_Preview worldBook={worldBook} />
      </div>
    </div>
  );
}

export default Preview_WorldBook;
