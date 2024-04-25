"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import NuwaButton from "./NuwaButton";

function InsertUserOrChar({getTextRef, onDone}: {getTextRef: () => any, onDone: (value: string) => void}) {
  const insertTextAtCursor = (text: string) => {
    const textRef = getTextRef();
    const startPos = (textRef as any).selectionStart;
    const endPos = (textRef as any).selectionEnd;
    const value = (textRef as any).value;
    const textBefore = value.substring(0, startPos);
    const textAfter = value.substring(endPos, value.length);
    const newValue = textBefore + text + textAfter;

    (textRef as any).value = newValue;
    (textRef as any).selectionStart = startPos + text.length;
    (textRef as any).selectionEnd = startPos + text.length;

    (textRef as any).focus();
    onDone(newValue);
  };

  return (
    <div className="flex flex-col gap-2">

    <NuwaButton
      shadowghost="white"
      onPress={
        () => {
          insertTextAtCursor('{{char}}');
        }
      }
    >
          &nbsp;&nbsp;插入玩家名称&nbsp;&nbsp;
    </NuwaButton>
    <NuwaButton
      shadowghost="white"
      onPress={
        () => {
          insertTextAtCursor('{{user}}');
        }
      }
    >
          &nbsp;&nbsp;插入数字生命名称&nbsp;&nbsp;
    </NuwaButton>
  </div>
  );
}

export default InsertUserOrChar;
