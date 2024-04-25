"use client";
import React from "react";

import WorldBook from "./WorldBook";
import { TypeWorldBook } from "../../_lib/definitions";

function Preview_WorldBook({worldBook}: {worldBook: TypeWorldBook | undefined}) {

  return (
    <div>   
        <WorldBook isPreview={true} worldBooka={worldBook}/>
    </div>
  );
}

export default Preview_WorldBook;
