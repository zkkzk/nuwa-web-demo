"use client";
import React from "react";
import Scenario_Scenario from "./Scenario_Scenario";
import Scenario_WorldBook from "./Scenario_WorldBook";

function Scenario() {
  
  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-10">
        <div className="sm:col-start-3 sm:col-end-9 grid gap-20">
          <Scenario_Scenario />
          <Scenario_WorldBook />
        </div>
      </div>
    </>
  );
}

export default Scenario;
