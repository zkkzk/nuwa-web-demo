"use client";
import React, { useEffect, useRef } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Textarea,
  Input,
  RadioGroup,
  Radio,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Kbd,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import { useCharacterBook } from "../../_lib/utils";
import { useTranslations } from "next-intl";
import WorldBook_Title from "./WorldBook_Title";
import NuwaTextareaWrapper from "../components/NuwaTextareaWrapper";
import { isEmpty } from "lodash-es";
import NuwaRadioWrapper from "../components/NuwaRadioWrapper";
import NuwaFormWrapper from "../components/NuwaFormWrapper";

export default function WorldBook() {
  const t = useTranslations();
  const { character_book, setCharacter_Book } = useCharacterBook();

  const handleDeleteButtonClick = (id: any) => {
    // Implement the logic to delete the entry with the given id
    setCharacter_Book((prevChara) => {
      const updatedEntries = (prevChara.entries || []).filter(
        (entry) => entry.id !== id
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

      return {
        ...prevChara,
        entries: updatedEntriesWithIds,
      };
    });
  };

  const handleAddNewBookClick = () => {
    // Determine the next available id and display_index based on existing entries
    const nextId = (character_book.entries || []).length + 1;
    const nextDisplayIndex = nextId;

    // Default template for new entries
    const defaultTemplate = {
      id: nextId,
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
        display_index: nextDisplayIndex,
        probability: 100,
        useProbability: true,
        depth: 4,
      },
    };

    setCharacter_Book((prevChara) => ({
      ...prevChara,
      entries: [...(prevChara.entries || []), defaultTemplate],
    }));
  };
  
  const [selectedEntry, setSelectedEntry] = React.useState({});

  useEffect(() => {
    isEmpty(selectedEntry) && setSelectedEntry(character_book?.entries[0])
  }, [character_book])
  // const selectedValue = React.useMemo(
  //   () => Array.from(selectedEntry).join(", "),
  //   [selectedEntry]
  // );
  
  return (
    <>
      <div>
        <div className="flex flex-row">
          
          <div className="flex flex-col shrink-0 gap-y-4 w-[200px] bg-[#D9D9D9]/30 rounded-[14px] py-12 mt-32 -mr-2 h-[570px] pl-1">
            {character_book.entries?.map((entry) => (
              <div
                key={entry.id}
                className={`${
                  selectedEntry.id === entry.id ? "h-12" : "h-7"
                } w-full rounded-l-[12px] bg-black text-white flex justify-center items-center cursor-pointer`}
                onClick={() => {
                  setSelectedEntry(entry);
                }}
              >
                <div className="mx-2 overflow-x-scroll">{entry.comment || t('WorldBook.untitledbook')}</div>
              </div>
            ))}
          </div>
          <div className="grow">
            <div
              className="-mb-9 pb-9 w-5/12 h-[132px] rounded-[40px] flex justify-center items-center bg-[#313131] text-white font-semibold text-[20px]"
            >{character_book.name}世界书名称</div>
            {character_book?.entries.map((entrys) => (
              <div  key={entrys.id}>
                {selectedEntry.id === entrys.id && (
                <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                  <div className="h-[620px] rounded-[40px] bg-white flex flex-col divide-y">
                    <div className="grow">
                      <NuwaTextareaWrapper
                        label={t('WorldBook.titlememo')}
                        textareaProps={{
                          value: entrys.comment,
                          onChange: (e) => (
                            setCharacter_Book((prevChara) => ({
                              ...prevChara,
                              entries: (prevChara.entries || []).map((entry) =>
                                entry.id === entrys.id
                                  ? { ...entry, comment: e.target.value }
                                  : entry
                              ),
                            })
                          ))
                        }}
                      >
                      </NuwaTextareaWrapper>
                    </div>
                    <div className="grow">
                      <NuwaTextareaWrapper
                        label={t('WorldBook.content')}
                        textareaProps={{
                          value: entrys.content,
                          onChange: (e) => (
                            setCharacter_Book((prevChara) => ({
                              ...prevChara,
                              entries: (prevChara.entries || []).map((entry) =>
                                entry.id === entrys.id
                                  ? { ...entry, content: e.target.value }
                                  : entry
                              ),
                            })
                          ))
                        }}
                      >
                      </NuwaTextareaWrapper>
                    </div>
                    <div className="grow">
                      <NuwaTextareaWrapper
                        label={t('WorldBook.primarykeywords')}
                        textareaProps={{
                          value: entrys.keys,
                          onChange: (e) => (
                            setCharacter_Book((prevChara) => ({
                              ...prevChara,
                              entries: (prevChara.entries || []).map((entry) =>
                                entry.id === entrys.id
                                  ? { ...entry, keys: e.target.value }
                                  : entry
                              ),
                            })
                          ))
                        }}
                      >
                      </NuwaTextareaWrapper>
                    </div>
                  </div>
                  <div className="h-[620px] rounded-[40px] bg-white flex flex-col divide-y">
                    <div className="grow">
                      <NuwaTextareaWrapper
                        label={t('WorldBook.optionalfilter')}
                        textareaProps={{
                          value: entrys.secondary_keys,
                          onChange: (e) => (
                            setCharacter_Book((prevChara) => ({
                              ...prevChara,
                              entries: (prevChara.entries || []).map((entry) =>
                                entry.id === entrys.id
                                  ? { ...entry, secondary_keys: e.target.value }
                                  : entry
                              ),
                            })
                          ))
                        }}
                      >
                      </NuwaTextareaWrapper>
                    </div>
                    <div className="grow">
                      <NuwaFormWrapper
                        label={<div className="flex flex-row justify-between">
                          <div>{t('WorldBook.orfer')}</div><div>{t('WorldBook.depth')}</div>
                        </div>}
                      >
                        <div className="flex flex-row justify-between">
                          <input
                            className="grow border-none outline-none "
                            color="primary"
                            autoComplete="off"
                            value={entrys.insertion_order}
                            onChange={(e) =>
                              setCharacter_Book((prevChara) => ({
                                ...prevChara,
                                entries: (prevChara.entries || []).map((entry) =>
                                  entry.id === entrys.id
                                    ? { ...entry, insertion_order: e.target.value }
                                    : entry
                                ),
                              }))
                            }
                            type="number"
                            max={1000}
                            min={0}
                            step={1}
                          />
                          <input
                            className="grow border-none outline-none text-right"
                            autoComplete="off"
                            value={entrys.extensions.depth}
                            onChange={(e) =>
                              setCharacter_Book((prevChara) => ({
                                ...prevChara,
                                entries: (prevChara.entries || []).map((entry) =>
                                  entry.id === entrys.id
                                    ? { ...entry, extensions: { ...entry.extensions, depth: e.target.value } }
                                    : entry
                                ),
                              }))
                            }
                            type="number"
                            max={4}
                            min={0}
                            step={1}
                          />
                        </div>
                      </NuwaFormWrapper>
                    </div>
                    <div className="grow">
                      <NuwaRadioWrapper
                        label={t('WorldBook.position')}
                        radioList={[
                          {
                            value: '1',
                            name: t('WorldBook.beforechar'),
                          },
                          {
                            value: '2',
                            name: t('WorldBook.afterchar'),
                          },
                          {
                            value: '3',
                            name: t('WorldBook.berforean'),
                          },
                          {
                            value: '4',
                            name: t('WorldBook.afteran'),
                          },
                          {
                            value: '5',
                            name: t('WorldBook.D'),
                          },
                        ]}
                        radioProps={{
                          value: String(entrys.extensions.position),
                          onChange: (e) => (
                            setCharacter_Book((prevChara) => ({
                              ...prevChara,
                              entries: (prevChara.entries || []).map((entry) =>
                                entry.id === entrys.id
                                  ? { ...entry, extensions: { ...entry.extensions, position: Number(e.target.value)  } }
                                  : entry
                              ),
                            }))
                          )
                        }}
                      >
                      </NuwaRadioWrapper>
                    </div>
                    <div className="grow">
                      <NuwaRadioWrapper
                        label={t('WorldBook.status')}
                        radioList={[
                          {
                            value: 'true',
                            name: t('WorldBook.constan'),
                          }, 
                          {
                            value: 'false',
                            name: t('WorldBook.normal'),
                          }
                        ]}
                        radioProps={{
                          value: String(entrys.constant),
                          onChange: (e) => (
                            setCharacter_Book((prevChara) => ({
                              ...prevChara,
                              entries: (prevChara.entries || []).map((entry) =>
                                entry.id === entrys.id
                              ? { ...entry, constant: Boolean(e.target.value === 'true') }
                                  : entry
                              ),
                            }))
                          )
                        }}
                      >
                      </NuwaRadioWrapper>
                    </div>
                  </div>
                </div>
              )}
              </div>
            ))}
            
          </div>
        </div>
      </div>
    </>
  );
}
