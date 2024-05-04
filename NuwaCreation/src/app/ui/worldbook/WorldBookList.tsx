"use client"

import React, { useState } from "react";
import { getWorldBookList, pushWorldBookList } from "@/app/lib/utils";
import { useTranslations } from "next-intl";
import WorldBookEdit from "./WorldBookEdit";
import { TypeWorldBookItem, TypeWorldBookList } from "@/app/lib/definitions";
import WorldBookCreate from "./WorldBookCreate";
import WorldBookOperateWrapper from "./WorldBookOperateWrapper";
import { getIsLogin } from "@/app/lib/base.api";
import { getAll } from "@/app/lib/worldbook.api";

export default function WorldBookList() {
  const t = useTranslations();

  const initWorldBookList = getWorldBookList();
  const [ worldBookList, setWorldBookList ] = useState<TypeWorldBookList>(initWorldBookList);
  const [ editWorldBook, setEditWorldBook ] = useState<TypeWorldBookItem>();

  const isLogin = getIsLogin();
  if (isLogin) {
    const getAllApi = getAll()
  }

  const deleteWorldBook = ({index}: {index: number}) => {
    const newWorldBookList = worldBookList.filter((_, i) => i !== index);
    pushWorldBookList(newWorldBookList);
    setWorldBookList(newWorldBookList);
  }

  return (
    <>
      <div className="relative bg-white h-full w-full pb-40 rounded-[40px] min-h-[80vh]">
        <div className="flex flex-row justify-end mt-2 z-40 mr-8">
          <WorldBookCreate
            onCreateDone={(newWorldBook) => {
              setWorldBookList(getWorldBookList());
              setEditWorldBook(newWorldBook);
            }} />
        </div>

        <div>
          <div className="text-black text-3xl font-semibold">草稿箱</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-4 3xl:grid-cols-4 gap-4 py-10 overflow-visible h-auto">
            {worldBookList.map((worldBookItem, index) => (
              <div key={worldBookItem.uid} className="w-auto h-[280px]">
                <WorldBookOperateWrapper
                  worldBookItem={worldBookItem.worldBook}
                  onEdit={() => {
                    setEditWorldBook(worldBookItem);
                  }}
                  onDelete={() => {
                    deleteWorldBook({index})
                  }}
                />
              </div>
            ))}
          </div>
          <div className="text-black text-3xl font-semibold">已发布</div>
        </div>
      </div>

      <WorldBookEdit worldBook={editWorldBook} onDone={() => {
        setEditWorldBook(undefined);
        setWorldBookList(getWorldBookList());
      }} />
    </>
  );
}
