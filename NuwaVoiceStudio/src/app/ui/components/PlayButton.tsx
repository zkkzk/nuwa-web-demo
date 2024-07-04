"use client";
import React, { useState } from "react";
import { PlayIcon } from "@heroicons/react/24/outline";
import { PauseIcon } from "@heroicons/react/24/solid";

function PlayButton({
	isPlay = false,
  onChange,
  classNames= {
    base: 'w-8 h-8',
  }
}: {
	isPlay?: boolean,
  onChange?: (isPlay: boolean) => void,
  classNames?: {
    base?: string
  }
}) {
  const [play, setPlay] = useState(isPlay);

  return (
    <div>
      {isPlay 
        ? (
          <div
            className={`${classNames.base} cursor-pointer bg-white rounded-full flex items-center justify-center`}
            onClick={() => {
              onChange && onChange(false);
              setPlay(false);
            }} 
          >
            <PauseIcon className="h-5 w-5 fill-black stroke-black stroke-1" />
          </div>
        )
        : (
          <div
            className={`${classNames.base} cursor-pointer bg-white rounded-full flex items-center justify-center`}
            onClick={() => {
              onChange && onChange(true);
              setPlay(true);
            }}
          >
            <PlayIcon className="h-5 w-5 fill-black stroke-black ml-0.5" />
          </div>
        )
      }
    </div>
  );
}

export default PlayButton;
