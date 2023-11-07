"use client"
import {useState} from "react";
import NewBot from "@/app/bots/new-bot";

export default function Bots() {
  const [mode, setMode] = useState('');
  return (
    <div className={"flex flex-col h-full"}>
      <div className={"flex flex-row"}>
        <div className={"w-16 ml-2 mr-2 cursor-pointer hover:underline " + (mode === 'new' ? 'underline' : '')}
             onClick={() => setMode('new')}>
          new
        </div>
        <div className={"w-16 ml-2 mr-2 cursor-pointer hover:underline " + (mode === 'search' ? 'underline' : '')}
             onClick={() => setMode('search')}>
          search
        </div>
      </div>
      <div className={"flex flex-col h-full"}>
        {mode === 'new' && <NewBot></NewBot>}
      </div>
    </div>
  );
}