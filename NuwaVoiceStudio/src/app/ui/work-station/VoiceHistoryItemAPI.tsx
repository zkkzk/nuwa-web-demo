"use client";
import React, { useState } from "react";
import { TypeVoice } from "@/app/lib/definitions.voice";
import { Tab, Tabs } from "@nextui-org/react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CopyIcon from "@/app/icons/CopyIcon";

function VoiceHistoryItemAPI({voice}: {
  voice: TypeVoice
}) {
	const tagsList = voice.tags.split(",");
  const [selected, setSelected] = useState("GET");

  return (
		<div className="w-[268px] rounded-xl border border-zinc-700 flex-col justify-start items-start inline-flex overflow-hidden">
			<Tabs
				aria-label="Options"     
				selectedKey={selected}
				onSelectionChange={(key) => setSelected(key as string)}
				classNames={{
					panel: "p-0 w-full"
				}}
				fullWidth
			>
				<Tab key="GET" title="get">
					
					<div className="w-full bg-zinc-900 h-full relative">
						<CopyIcon className=" cursor-pointer w-5 h-5 fill-neutral-900 stroke-neutral-900 absolute top-5 right-6" />
						<SyntaxHighlighter
							language="javascript"
							style={a11yDark}
							customStyle={{
								margin: '0 0',
								background: 'transparent',
							}}
						>
							{"function get(classNames) {\n  return classNames.join(' ');\n}\n"}
						</SyntaxHighlighter>
					</div>
				</Tab>
				<Tab key="POST" title="Post">

					<div className="w-full bg-zinc-900 h-full">
						<SyntaxHighlighter
							language="javascript"
							style={a11yDark}
							customStyle={{
								margin: '0 0',
								background: 'transparent',
							}}
						>
							{"function post(classNames) {\n  return classNames.join(' ');\n}\n"}
						</SyntaxHighlighter>
					</div>
				</Tab>
			</Tabs>
		</div>
  );
}

export default VoiceHistoryItemAPI;
