"use client"
import {useState} from "react";
import Bots from "./bots/bots"

export default function Home() {
  const [mode, setMode] = useState();
  return (
    <div className="flex flex-col p-2 text-sm">
      <div className="mb-2 pb-3 flex flex-row font-bold w-full border-b border-white pl-2 pr-2" data-testid="home-title">botrealms</div>
      <div className={"flex flex-row pl-2 "}>
        <div className={"flex flex-col w-2/12"}>
          <div className={"hover:underline cursor-pointer " + (mode === 'bots' ? 'underline' : '')}
               onClick={()=>setMode('bots')}>bots</div>
          <div className={"hover:underline cursor-pointer " + (mode === 'matches' ? 'underline' : '')}
               onClick={()=>setMode('matches')}>matches</div>
        </div>
        <div className={"h-screen flex flex-col w-10/12 border-l border-white"}>
          <div className={"pl-2 pr-2"}>
            {mode === 'bots' && <Bots></Bots>}
          </div>
        </div>
      </div>
    </div>
  );
}