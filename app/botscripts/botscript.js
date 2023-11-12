"use client"
import {useState} from "react";
import NewBotscript from "@/app/botscripts/new-botscript";
import BotscriptDetails from "@/app/botscripts/botscript-details";
import SearchBotscripts from "@/app/botscripts/search-botscripts";
import ListBotscripts from "@/app/botscripts/list-botscripts";

export default function Botscripts() {
  const [mode, setMode] = useState('');
  const [botscript, setBotscript] = useState();
  const [botscripts, setBotscripts] = useState();

  const onCreate = (created) => {
    setBotscript(created);
    setMode('selected');
  }

  const onUpdate = (updated) => {
    setBotscript(updated);
    setMode('selected');
  }

  const onSelectBotscript = (selected) => {
    setBotscript(selected);
    setMode('selected')
  }

  const onBotscripts = (botscripts) => {
    setBotscripts(botscripts);
    console.log(`botscripts: ${JSON.stringify(botscripts)}`);
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
        {mode === 'new' && <NewBotscript onCreate={onCreate}></NewBotscript>}
        {mode === 'selected' && <BotscriptDetails botscript={botscript} onUpdate={onUpdate}></BotscriptDetails>}
        {mode === 'search' &&
          <div className={"flex flex-col"}>
            <SearchBotscripts onBotscripts={onBotscripts}></SearchBotscripts>
            <div className={"mt-3 ml-2"}>
              <ListBotscripts botscripts={botscripts} onSelect={onSelectBotscript}></ListBotscripts>
            </div>
          </div>
        }
      </div>
    </div>
  );
}