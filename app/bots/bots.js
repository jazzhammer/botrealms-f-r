"use client"
import {useState} from "react";
import NewBot from "@/app/bots/new-bot";
import BotDetails from "@/app/bots/bot-details";

export default function Bots() {
  const [mode, setMode] = useState('');
  const [bot, setBot] = useState();

  const onCreate = (created) => {
    setBot(created);
    setMode('selected');
  }
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
        {mode === 'new' && <NewBot onCreate={onCreate}></NewBot>}
        {mode === 'selected' && <BotDetails bot={bot}></BotDetails>}
      </div>
    </div>
  );
}