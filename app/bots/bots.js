"use client"
import {useState} from "react";
import NewBot from "@/app/bots/new-bot";
import BotDetails from "@/app/bots/bot-details";
import SearchBots from "@/app/bots/search-bots";
import ListBots from "@/app/bots/list-bots";

export default function Bots() {
  const [mode, setMode] = useState('');
  const [bot, setBot] = useState();
  const [bots, setBots] = useState();

  const onCreate = (created) => {
    setBot(created);
    setMode('selected');
  }

  const onBots = (bots) => {
    setBots(bots);
    console.log(`bots: ${JSON.stringify(bots)}`);
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
        {mode === 'selected' && <BotDetails bot={bot} onUpdate={onUpdate}></BotDetails>}
        {mode === 'search' &&
          <div className={"flex flex-col"}>
            <SearchBots onBots={onBots}></SearchBots>
            <div className={"mt-3 ml-2"}>
              <ListBots bots={bots}></ListBots>
            </div>
          </div>
        }
      </div>
    </div>
  );
}