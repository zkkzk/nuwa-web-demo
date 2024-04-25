"use client";
import React, { useEffect, useRef } from "react";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useWorldBook, uuid } from "../../_lib/utils";
import { useTranslations } from "next-intl";
import { isEmpty, isNull } from "lodash-es";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import NuwaButton from "../components/NuwaButton";
import { TypeWorldBook, TypeWorldBookEntriy } from "../../_lib/definitions";
import WorldBook_Entry from "./WorldBook_Entry";
import { useWorldBookItem, useWorldBookItemDispatch } from "./WorldBookContext";

export default function WorldBook({worldBooka, isPreview = false}: {
  worldBooka?: TypeWorldBook | undefined,
  isPreview?: boolean,
}) {
  const t = useTranslations();
  const worldBookItem = useWorldBookItem();
  const worldBook = isPreview ? worldBooka : worldBookItem.worldBook;
  const uid = isPreview ? worldBooka?.name : worldBookItem.uid;
  const worldBookItemDispatch = useWorldBookItemDispatch();

  let initSelectedEntry = undefined;

  if (worldBook?.entries && worldBook?.entries.length > 0) {
    initSelectedEntry = worldBook.entries[0] 
  }
  const [selectedEntry, setSelectedEntry] = React.useState(initSelectedEntry);

  const handleDeleteButtonClick = (id: any) => {
    // Implement the logic to delete the entry with the given id
    setWorldBookItemDeleteEntries(id);
    if (selectedEntry?.id === id) {
      setSelectedEntry(worldBook?.entries[0])
    }
  };

  const handleAddNewBookClick = () => {
    const uid = uuid();
    const defaultTemplate: TypeWorldBookEntriy = {
      id: uid,
      keys: [],
      secondary_keys: [],
      comment: "New Book",
      content: "",
      constant: true,
      selective: true,
      insertion_order: 100,
      enabled: true,
      position: "after_char",
      extensions: {
        position: 3,
        exclude_recursion: false,
        display_index: uid,
        probability: 100,
        useProbability: true,
        depth: 4,
      },
    };

    setWorldBookItemInNewEntries(defaultTemplate);
    setSelectedEntry(defaultTemplate)
  };

  useEffect(() => {
    isNull(selectedEntry) && worldBook?.entries && worldBook?.entries.length > 0 &&setSelectedEntry(worldBook?.entries[0])
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
          entries: [
            ...(worldBook?.entries || []),
            newValue
          ]
        }
      },
    })
  }
  const setWorldBookItemDeleteEntries = (entryId: string) => {

    const updatedEntries = (worldBook?.entries || []).filter(
      (entry) => entry.id !== entryId
    );

    // Update ids and display_index in sequential order
    const updatedEntriesWithIds = updatedEntries.map((entry, index) => ({
      ...entry,
      id: index + 1,
      extensions: {
        ...entry.extensions,
        display_index: index + 1,
      },
    }));
    
    worldBookItemDispatch({
      type: "changed",
      payload: {
        ...worldBookItem,
        worldBook: {
          ...worldBook,
          entries: updatedEntriesWithIds
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
        <div className="flex flex-row">
          
          <div className="relative flex flex-col shrink-0 gap-y-4 w-[200px] bg-[#D9D9D9]/30 rounded-[14px] py-12 mt-32 -mr-2 h-[570px] pl-1">
            {!isPreview && (
              <Button
                onClick={handleAddNewBookClick}
                className="absolute top-2 right-4 bg-transparent p-0 z-40"
                type="button"
                color="default"
                variant="flat"
                isIconOnly
              >
                <PlusCircleIcon className="h-12 w-12" aria-hidden="true" />
              </Button>
            )}
            {worldBook?.entries.map((entry) => (
              <NuwaButton
                key={`${uid}${entry.id}`}
                className={`${
                  selectedEntry?.id === entry.id ? "h-12" : "h-7"
                } w-full rounded-l-[12px] bg-black text-white flex justify-center items-center cursor-pointer`}
                onClick={() => {
                  setSelectedEntry(entry);
                }}
                endContent={!isPreview &&
                  <Popover key={`${entry.id}-${worldBook?.entries.length}`} placement="top" color="warning">
                    <PopoverTrigger>
                      <Button className="h-4 w-4 bg-transparent" size="sm" isIconOnly>
                        <XMarkIcon className="h-4 w-4 text-white" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>  
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteButtonClick(entry.id)
                        }}
                        size="sm"
                        color="warning"
                      >
                        {t('Previews.mymindismadeup')}
                      </Button>
                    </PopoverContent>
                  </Popover>
                }
              >
                <div className="mx-2 overflow-x-scroll">{entry.comment || t('WorldBook.untitledbook')}</div>
              </NuwaButton>
            ))}
          </div>
          <div className="grow z-40">
            <div
              className="-mb-9 pb-9 px-2 w-5/12 h-[132px] rounded-[40px] flex justify-center items-center bg-[#313131] text-white font-semibold text-[20px]"
            >
              <input
                value={worldBook?.name}
                disabled={isPreview}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setWorldBookItemName(newValue);
                }}
                className="w-full h-full bg-transparent outline-none disabled:bg-transparent"
              />
            </div>
            {worldBook?.entries && worldBook?.entries.map((entrys) => (
              <div key={`${uid}${entrys.id}`}>
                {selectedEntry?.id === entrys.id && (
                  <WorldBook_Entry
                    value={selectedEntry}
                    isPreview={isPreview}
                    onChange={(newSelectedEntry) => {

                      const newWorldBook =  {
                        ...worldBook,
                        entries: (worldBook.entries || []).map((item) =>
                          item.id === newSelectedEntry.id
                            ? newSelectedEntry
                            : item
                        )
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
    </>
  );
}
