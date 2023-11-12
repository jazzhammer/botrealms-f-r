"use client"

import {useState} from "react";

export default function BotscriptDetails({botscript, onUpdate}) {
  const [mode, setMode] = useState('view');
  const [name, setName] = useState(botscript.name);
  const [type, setType] = useState(botscript.type);
  const [logic, setLogic] = useState(botscript.logic);
  const updateBotscript = async () => {
    const updateResult = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/botscripts`, {
      method: 'PUT',
      body: JSON.stringify({
        ... botscript,
        name, type, logic
      })
    });
    const updateJson = await updateResult.json();
    onUpdate(updateJson);
    setMode('view');
    setName(updateJson.name)
  }
  return (
    <div>
      {mode === 'view' &&
        <div className={"flex flex-col border border-1 pl-2 mt-2 pb-2"}>
          <div className={"flex flex-row"}>
            <div className={"w-24"}>id</div>
            <div className={"w-108"}>{botscript.botscript_id}</div>
          </div>
          <div className={"flex flex-row"}>
            <div className={"w-24"}>name</div>
            <div className={"w-108"}>{botscript.name}</div>
          </div>
          <div className={"flex flex-row"}>
            <div className={"w-24"}>logic</div>
            <div className={"w-108"}>{botscript.logic}</div>
          </div>
          <div className={"flex flex-row"}>
            <div className={"w-124"}><button className={"bg-amber-600 text-black pl-2 pr-2"} onClick={() => setMode('edit')}>edit</button></div>
          </div>
        </div>
      }
      {mode === 'edit' &&
        <div className={"flex flex-col border border-1 border-amber-600 pl-2 mt-2 pb-2"}>
          <div className={"flex flex-row"}>
            <div className={"w-24"}>id</div>
            <div className={"w-108"}>{botscript.botscript_id}</div>
          </div>
          <div className={"flex flex-row mt-2"}>
            <div className={"w-24"}>name</div>
            <div className={"w-108 text-black"}>
              <input className="pl-2" onChange={(e)=>setName(e.target.value)} value={name}/>
            </div>
          </div>
          <div className={"flex flex-row mt-2"}>
            <div className={"w-24"}>logic</div>
            <div className={"w-108 text-black"}>
              <textarea onChange={(e)=>setLogic(e.target.value)}
                        value={logic}
                        className="pl-2 font-mono"
                        style={{"margin-left": 0, height: 400, width: 500, resize: 'auto'}}
              />
            </div>
          </div>
          <div className={"flex flex-row mt-2"}>
            <div className={"w-124"}>
              <button className={"bg-amber-600 text-black pl-2 pr-2"} onClick={updateBotscript}>
                update
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  );
}