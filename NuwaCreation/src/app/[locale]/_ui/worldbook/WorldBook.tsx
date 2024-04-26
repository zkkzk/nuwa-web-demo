"use client";
import React, { useEffect } from "react";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { defaultWorldBookEntry, uuid } from "../../_lib/utils";
import { useTranslations } from "next-intl";
import { clone, isNull } from "lodash-es";
import { TypeWorldBook, TypeWorldBookEntriy } from "../../_lib/definitions";
import WorldBook_Entry from "./WorldBook_Entry";
import { useWorldBookItem, useWorldBookItemDispatch } from "./WorldBookContext";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

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

    let newEntry = clone(defaultWorldBookEntry);
    newEntry.uid = uid;
    newEntry.extensions.display_index = uid;

    setWorldBookItemInNewEntries(newEntry);
    setSelectedEntry(newEntry)
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

    // const newEntriesArray = map(worldBook, (value, key) => {
    //   return {value};
    // })

    // const newEntries = keyBy(newEntriesArray, "id");


    // const updatedEntries = (worldBook?.entries || []).filter(
    //   (entry) => entry.uid !== entryId
    // );

    // Update ids and display_index in sequential order
    // const updatedEntriesWithIds = updatedEntries.map((entry, index) => ({
    //   ...entry,
    //   id: index + 1,
    //   extensions: {
    //     ...entry.extensions,
    //     display_index: index + 1,
    //   },
    // }));
    
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
      <div className="relative">
        {!isPreview && (
          <div className="h-10 w-20 flex flex-row justify-center bg-white p-0 z-40 absolute top-0 right-0 pb-2">
            <Button
              onClick={handleAddNewBookClick}
              className="bg-transparent"
              type="button"
              color="default"
              variant="flat"
              isIconOnly
            >
              <PlusCircleIcon className="h-8 w-8" aria-hidden="true" />
            </Button>
          </div>
        )}
      </div>
      {(!worldBook || Object.keys(worldBook.entries).length === 0) && (
        <div className="h-40"></div>
      )}
      <Tabs
          aria-label="Options"
          variant="underlined"
          size="lg"
          classNames={{
            base: "sticky top-0 ml-0 z-30 overflow-x-scroll bg-white w-full h-full shrink-0",
            tabList: "overflow-x-scroll gap-10 py-0 border-b border-solid border-black/20 w-full pr-20 h-full",
            cursor: "w-full bg-[#0C0C0C] text-white",
            tab:"h-10 group-data-[selected=true]:bg-[#0C0C0C]",
            tabContent: " text-neutral-700 w-full h-full group-data-[selected=true]:text-neutral-800 group-data-[selected=true]:font-bold",
            panel: "overflow-y-scroll",
          }}
        >

          {worldBook && Object.keys(worldBook.entries).map((key) => (
            <Tab
              key={`${uid}${worldBook.entries[key].uid}`}
              id={`${uid}${worldBook.entries[key].uid}`}
              title={
                <div className="flex flex-row items-center group">
                  <div>{worldBook.entries[key].comment || t('WorldBook.untitledbook')}</div>
                  {!isPreview && 
                    <Popover
                      key={`${worldBook.entries[key].uid}-${worldBook?.entries.length}`}
                      placement="top"
                      color="danger"
                      className=""
                    >
                      <PopoverTrigger>
                        <Button className="opacity-0 group-hover:opacity-100 h-4 w-4 bg-transparent" size="sm" isIconOnly>
                          <XMarkIcon className="h-4 w-4 text-black" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>  
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteButtonClick(worldBook.entries[key].uid)
                          }}
                          size="sm"
                          color="danger"
                        >
                          {t('Previews.mymindismadeup')}
                        </Button>
                      </PopoverContent>
                    </Popover>
                  }
                </div>
              }
            >
              <div key={`${uid}${worldBook.entries[key].uid}`}>
                <WorldBook_Entry
                  value={worldBook.entries[key]}
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
              </div>
            </Tab>
          ))}
        </Tabs>
      
    </>
  );
}
