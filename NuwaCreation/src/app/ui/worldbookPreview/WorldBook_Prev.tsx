"use client";
import React, { useEffect } from "react";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@nextui-org/react";
import { uuid } from "@/app/lib/utils";
import { useTranslations } from "next-intl";
import { isNull } from "lodash-es";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import NuwaButton from "../components/NuwaButton";
import { TypeWorldBook, TypeWorldBookEntriy } from "@/app/lib/definitions";
import WorldBook_Entry from "./WorldBook_Entry";
import { useWorldBookItem, useWorldBookItemDispatch } from "../worldbook/WorldBookContext";

export default function WorldBook_Prev({worldBooka, isPreview = false}: {
  worldBooka?: TypeWorldBook | undefined,
  isPreview?: boolean,
}) {
  const t = useTranslations();
  const worldBookItem = useWorldBookItem();
  const worldBook = worldBooka;
  const uid = worldBooka?.name;
  const worldBookItemDispatch = useWorldBookItemDispatch();

  let initSelectedEntry = undefined;

  if (worldBook?.entries && Object.keys(worldBook.entries).length > 0) {
    initSelectedEntry = worldBook.entries[Object.keys(worldBook.entries)[0]] 
  }
  const [selectedEntry, setSelectedEntry] = React.useState(initSelectedEntry);

  const handleDeleteButtonClick = (id: any) => {
    // Implement the logic to delete the entry with the given id
    setWorldBookItemDeleteEntries(id);
    if (selectedEntry?.uid === id) {
      setSelectedEntry(worldBook?.entries[Object.keys(worldBook?.entries)[0]])
    }
  };

  const handleAddNewBookClick = () => {
    const uid = uuid();
    const defaultTemplate: TypeWorldBookEntriy = {
      uid: uid,
      keys: [],
      secondary_keys: [],
      comment: "",
      content: "",
      constant: true,
      selective: true,
      insertion_order: 100,
      enabled: true,
      position: 0,
      depth: 4,
      extensions: {
        exclude_recursion: false,
        display_index: uid,
        probability: 100,
        useProbability: true,
      },
    };

    setWorldBookItemInNewEntries(defaultTemplate);
    setSelectedEntry(defaultTemplate)
  };

  useEffect(() => {
    isNull(selectedEntry) && worldBook?.entries && Object.keys(worldBook.entries).length > 0 &&setSelectedEntry(worldBook?.entries[0])
  }, [worldBook])

  const setWorldBookItem = (newValue:TypeWorldBook) => {
    worldBookItemDispatch({
      type: "changed",
      payload: {
        ...worldBookItem,
        worldBook: newValue
      },
    })
  }
  const setWorldBookItemInNewEntries = (newValue:TypeWorldBookEntriy) => {
    worldBookItemDispatch({
      type: "changed",
      payload: {
        ...worldBookItem,
        worldBook: {
          ...worldBook,
          entries: {
            ...worldBook?.entries,
            [newValue.uid]: newValue
          }
        }
      },
    })
  }
  const setWorldBookItemDeleteEntries = (key: string) => {

    delete worldBook?.entries[key];

    
    worldBookItemDispatch({
      type: "changed",
      payload: {
        ...worldBookItem,
        worldBook: {
          ...worldBook,
        }
      },
    })
  }
  const setWorldBookItemName = (newValue:string) => {
    worldBookItemDispatch({
      type: "changed",
      payload: {
        ...worldBookItem,
        worldBook: {
          ...worldBook,
          name: newValue
        }
      },
    })
  }
  
  return (
    <>
      <div>
        <div className="flex flex-col">     
          <div
            className="z-10 -mb-9 pb-9 px-2 w-7/12 h-[132px] rounded-t-[40px] flex justify-center items-center bg-[#313131] text-white font-semibold text-[20px]"
          >
            
            <Tooltip showArrow={true} color="primary" content={worldBook?.name || t('WorldBook.untitledbook')} className="text-lg">
              <div className="px-4 w-full bg-transparent outline-none disabled:bg-transparent truncate" >{worldBook?.name}</div>
            </Tooltip>
          </div>
          <div className="flex flex-row">
            <div className="relative flex flex-col shrink-0 gap-y-4 w-52 bg-[#D9D9D9]/30 rounded-xl pt-32 pb-12 -mr-2 h-[570px] pl-1">
            {worldBook && Object.keys(worldBook.entries).map((key) => (
              <NuwaButton
                key={`${uid}${worldBook.entries[key].uid}`}
                className={`${
                  selectedEntry?.uid === worldBook.entries[key].uid ? "h-12" : "h-7"
                }  w-full rounded-l-xl bg-black text-white flex justify-center items-center cursor-pointer`}
                onClick={() => {
                  setSelectedEntry(worldBook.entries[key]);
                }}
              >
                <Tooltip showArrow={true} color="primary" content={worldBook.entries[key].comment || t('WorldBook.untitledbook')} className="text-lg">
                  <div className="mx-2 w-full truncate">{worldBook.entries[key].comment || t('WorldBook.untitledbook')}</div>
                </Tooltip>
              </NuwaButton>
            ))}
          </div>
          <div className="grow z-40">
            {worldBook?.entries && Object.keys(worldBook.entries).map((key) => (
              <div key={`${uid}${worldBook.entries[key].uid}`}>
                {selectedEntry?.uid === worldBook.entries[key].uid && (
                  <WorldBook_Entry
                    value={selectedEntry}
                    isPreview={isPreview}
                    onChange={(newSelectedEntry) => {
                      const newWorldBook =  {
                        ...worldBook,
                        entries: {
                          ...worldBook.entries,
                          [newSelectedEntry.uid]: newSelectedEntry
                        }
                      }
                      setWorldBookItem(newWorldBook)
                      setSelectedEntry(newSelectedEntry);
                    }}
                  />
                )}
              </div>
            ))}
            
          </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
