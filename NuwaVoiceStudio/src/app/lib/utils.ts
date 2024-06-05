"use client";

import { useState } from "react";

export const uuid = () => {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] as any & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}

export const useCoverHandler = () => {

  const [isReplacingTheCoverLoding, setIsReplacingTheCoverLoding] = useState(false);
  const handleReplacingTheCover = async (e: any, setCover: (data: string) => void) => {
    setIsReplacingTheCoverLoding(true);
    if(typeof window !== "undefined"){
      const file = e.target.files[0];
      const res = await fetch("/api/upcover", {
        method: "POST",
        body: file,
      });
      if(res.ok){
        const data = await res.text();
        // localStorage.setItem("cover", data);
        setCover(data);
        setIsReplacingTheCoverLoding(false);
      }else{
        setIsReplacingTheCoverLoding(false);
        alert("Failed to upload: please make sure you are uploading an image");
      }
    }else{
      setIsReplacingTheCoverLoding(false);
      alert('Please change your browser');
    }
  };

  return { isReplacingTheCoverLoding, handleReplacingTheCover };
};