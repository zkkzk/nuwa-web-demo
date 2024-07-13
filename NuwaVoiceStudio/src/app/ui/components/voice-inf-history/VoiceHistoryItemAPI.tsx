"use client";
import React, { useState } from "react";
import { Snippet, Tab, Tabs } from "@nextui-org/react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { VoiceInfHistoryType } from "@/app/lib/definitions.voice";

function VoiceHistoryItemAPI({code}: {
  code: Array<{
    code: string,
    type: string,
  }>

}) {
  const [selected, setSelected] = useState("GET");

  return (
		<div className="w-full rounded-xl border border-zinc-700 flex-col justify-start items-start inline-flex overflow-hidden">
			<Tabs
				aria-label="Options"     
				selectedKey={selected}
				onSelectionChange={(key) => setSelected(key as string)}
				classNames={{
					panel: "p-0 w-full"
				}}
				fullWidth
			>
				{code.map((code, index) => (
					<Tab key={code.type} title={code.type}>				
						<Snippet
							classNames={{
								base: "bg-zinc-900 rounded-none overflow-scroll w-full relative",
								content: "",
								copyButton: " top-5 right-6 absolute",
								pre: "w-full overflow-scroll",
							}}
							hideSymbol={true}
						>
							{/* <CopyIcon className=" cursor-pointer w-5 h-5 fill-neutral-900 stroke-neutral-900 absolute top-5 right-6" /> */}				
								<SyntaxHighlighter
									language={code.type}
									style={a11yDark}
									wrapLongLines={true}
									customStyle={{
										margin: '0 0',
										background: 'transparent',
									}}
								>
									{code.code}
								</SyntaxHighlighter>
						</Snippet>
					</Tab>
				))}
			</Tabs>
		</div>
  );
}

export default VoiceHistoryItemAPI;
