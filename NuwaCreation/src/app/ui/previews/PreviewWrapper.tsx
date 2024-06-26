"use client";
import React from "react";

function PreviewWrapper({children}: {
  children: React.ReactNode,
}) {
  return (
    <>   
      <div className="w-full h-full bg-black rounded-[30px] pb-3">
        <div className={`w-full h-full bg-neutral-100 rounded-[30px] border border-black`}>
          {children}
        </div>
      </div>
    </>
  );
}

export default PreviewWrapper;
