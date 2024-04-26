"use client";
import React from "react";
import AdvancedSet_Talkativeness from "./AdvancedSet_Talkativeness";
import AdvancedSet_Depthprompt from "./AdvancedSet_Depthprompt";
import AdvancedSet_Jailbreak from "./AdvancedSet_Jailbreak";
import AdvancedSet_Mainprompt from "./AdvancedSet_Mainprompt";

function AdvancedSet() {
  
  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-10">
        <div className="sm:col-start-3 sm:col-end-9 grid gap-20 mb-20">
          <AdvancedSet_Depthprompt />
          <AdvancedSet_Talkativeness />
          <AdvancedSet_Mainprompt />
          <AdvancedSet_Jailbreak />
        </div>
      </div>
    </>
  );
}

export default AdvancedSet;
