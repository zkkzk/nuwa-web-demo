"use client"

import React from "react";
import { useTranslations } from "next-intl";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { TypeWorldBook, TypeWorldBookItem } from "@/app/lib/definitions";
import WorldBookItem from "./WorldBookItem"

export default function WorldBookOperateWrapper({worldBookItem, onEdit, onDelete}: {
  worldBookItem: TypeWorldBook;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const t = useTranslations();

  return (
    <>
      <div className="relative group w-full h-full">
        <WorldBookItem worldBookItem={worldBookItem} />

        <div className="absolute top-4 right-4 flex flex-col gap-4">
          <Popover placement="top" color='danger'>
            <PopoverTrigger>
              <Button
                className="bg-black text-white opacity-0 group-hover:opacity-100"
                startContent={<TrashIcon className="h-5 w-5"/>}
                isIconOnly
              ></Button>
            </PopoverTrigger>
            <PopoverContent>
              <Button 
                className="w-full font-semibold" 
                size="sm" 
                color="danger"
                onClick={() => {
                  onDelete();
                }}
              >    
                {t('Previews.mymindismadeup')}
              </Button>
            </PopoverContent>
          </Popover>

          <Button
            className="bg-black text-white opacity-0 group-hover:opacity-100"
            startContent={<PencilSquareIcon className="h-5 w-5"/>}
            isIconOnly
            onClick={() => {
              onEdit();
            }}
          ></Button>
        </div>
      </div>
    </>
  );
}
