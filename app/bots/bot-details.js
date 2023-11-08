"use client"

import {useState} from "react";

export default function BotDetails({bot, onUpdate}) {
  const [mode, setMode] = useState('view');
  const [name, setName] = useState(bot.name);
  const updateBot = async () => {
    const updateResult = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/bots`, {
      method: 'PUT',
      body: JSON.stringify({
        ... bot,
        name
      })
    });
    const updateJson = await updateResult.json();
    onUpdate(updateJson);
    setMode('view');
  }
  return (
    <div>
      {mode === 'view' &&
        <div className={"flex flex-col border border-1 pl-2 mt-2 pb-2"}>
          <div className={"flex flex-row"}>
            <div className={"w-16"}>id</div>
            <div className={"w-108"}>{bot.bot_id}</div>
          </div>
          <div className={"flex flex-row"}>
            <div className={"w-16"}>name</div>
            <div className={"w-108"}>{bot.name}</div>
          </div>
          <div className={"flex flex-row"}>
            <div className={"w-124"}><button className={"bg-amber-600 text-black pl-2 pr-2"} onClick={() => setMode('edit')}>edit</button></div>
          </div>
        </div>
      }
      {mode === 'edit' &&
        <div className={"flex flex-col border border-1 border-amber-600 pl-2 mt-2 pb-2"}>
          <div className={"flex flex-row"}>
            <div className={"w-16"}>id</div>
            <div className={"w-108"}>{bot.bot_id}</div>
          </div>
          <div className={"flex flex-row"}>
            <div className={"w-16"}>name</div>
            <div className={"w-108 text-black"}>
              <input className="pl-2" onChange={(e)=>setName(e.target.value)} value={name}/>
            </div>
          </div>
          <div className={"flex flex-row mt-2"}>
            <div className={"w-124"}>
              <button className={"bg-amber-600 text-black pl-2 pr-2"} onClick={updateBot}>
                update
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  );
}