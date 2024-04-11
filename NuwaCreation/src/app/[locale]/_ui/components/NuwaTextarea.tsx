import React from "react";
import { useTranslations } from "next-intl";

export default function NuwaTextarea() {
  const t = useTranslations();

  return (
    <div className="h-32 py-4 flex flex-col">
      <label
        className="block text-lg font-medium leading-8 mb-1"
      >
        {t('Character.personalitysummary')}
      </label>
      <div className="flex flex-row mt-2 grow">  
        <div className="mr-4 grow">
          <textarea
            placeholder="First Message"
            // value={chara.data.personality}
            // onChange={handlePersonalityChange}
            className="border-none outline-none w-full h-full resize-none mb-6"
          />
        </div>
      </div>
      
    </div>
  );
}
