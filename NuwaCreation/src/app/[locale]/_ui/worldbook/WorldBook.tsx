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

export default function WorldBook({worldBook, isPreview = false}: {
  worldBook?: TypeWorldBook | undefined,
  isPreview?: boolean,
}) {
  const t = useTranslations();
  const worldBookItem = useWorldBookItem();
  const worldBookItemDispatch = useWorldBookItemDispatch();

  let initSelectedEntry = null;

  if (worldBookItem.worldBook?.entries && worldBookItem.worldBook?.entries.length > 0) {
    initSelectedEntry = worldBookItem.worldBook.entries[0] 
  }
  const [selectedEntry, setSelectedEntry] = React.useState(initSelectedEntry);

  const handleDeleteButtonClick = (id: any) => {
    // Implement the logic to delete the entry with the given id
    setWorldBookItemDeleteEntries(id);
    if (selectedEntry?.id === id) {
      setSelectedEntry(worldBookItem.worldBook?.entries[0])
    }
  };

  const handleAddNewBookClick = () => {
    // Determine the next available id and display_index based on existing entries
    // let nextId = (worldBookItem.worldBook.entries || []).length + 1;
    // // if(worldBookItem.worldBook.entries[worldBookItem.worldBook.entries.length - 1].id >= nextId) {
    // //   nextId = worldBookItem.worldBook.entries[worldBookItem.worldBook.entries.length - 1].id + 1;
    // // }
    // const nextDisplayIndex = nextId;

    // Default template for new entries

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
    isNull(selectedEntry) && worldBookItem.worldBook.entries && worldBookItem.worldBook?.entries.length > 0 &&setSelectedEntry(worldBookItem.worldBook?.entries[0])
  }, [worldBookItem.worldBook])

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
          ...worldBookItem.worldBook,
          entries: [
            ...worldBookItem.worldBook.entries,
            newValue
          ]
        }
      },
    })
  }
  const setWorldBookItemDeleteEntries = (entryId: string) => {

    const updatedEntries = (worldBookItem.worldBook.entries || []).filter(
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
          ...worldBookItem.worldBook,
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
          ...worldBookItem.worldBook,
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
            {worldBookItem.worldBook.entries?.map((entry) => (
              <NuwaButton
                key={`${worldBookItem.uid}${entry.id}`}
                className={`${
                  selectedEntry?.id === entry.id ? "h-12" : "h-7"
                } w-full rounded-l-[12px] bg-black text-white flex justify-center items-center cursor-pointer`}
                onClick={() => {
                  setSelectedEntry(entry);
                }}
                endContent={!isPreview &&
                  <Popover key={`${entry.id}-${worldBookItem.worldBook?.entries.length}`} placement="top" color="warning">
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
                value={worldBookItem.worldBook.name}
                disabled={isPreview}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setWorldBookItemName(newValue);
                }}
                className="w-full h-full bg-transparent outline-none disabled:bg-transparent"
              />
            </div>
            {worldBookItem.worldBook.entries && worldBookItem.worldBook?.entries.map((entrys) => (
              <div key={`${worldBookItem.uid}${entrys.id}`}>
                {selectedEntry?.id === entrys.id && (
                  <WorldBook_Entry
                    value={selectedEntry}
                    isPreview={isPreview}
                    onChange={(newSelectedEntry) => {

                      const newWorldBook =  {
                        ...worldBookItem.worldBook,
                        entries: (worldBookItem.worldBook.entries || []).map((item) =>
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
