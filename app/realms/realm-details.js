"use client"

import {useState} from "react";
import RealmTopograph from "@/app/realms/realm-topograph";

export default function RealmDetails({realm, onUpdate, realmSocket}) {
  const [mode, setMode] = useState('view');
  const [name, setName] = useState(realm.name);
  const updateRealm = async () => {
    const updateResult = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/realms`, {
      method: 'PUT',
      body: JSON.stringify({
        ... realm,
        name
      })
    });
    const updateJson = await updateResult.json();
    onUpdate(updateJson);
    setMode('view');
    setName(updateJson.name)
  }
  return (
    <div>
      {mode === 'view' && <div>
        <div className={"flex flex-col border border-1 pl-2 mt-2 pb-2"}>
          <div className={"flex flex-row"}>
            <div className={"w-16"}>id</div>
            <div className={"w-108"}>{realm.realm_id}</div>
          </div>
          <div className={"flex flex-row"}>
            <div className={"w-16"}>name</div>
            <div className={"w-108"}>{realm.name}</div>
          </div>
          <div className={"flex flex-row"}>
            <div className={"w-124"}><button className={"bg-amber-600 text-black pl-2 pr-2"} onClick={() => setMode('edit')}>edit</button></div>
          </div>
        </div>
        <RealmTopograph realmSocket={realmSocket} realm={realm}></RealmTopograph>
        </div>
      }
      {mode === 'edit' &&
        <div className={"flex flex-col border border-1 border-amber-600 pl-2 mt-2 pb-2"}>
          <div className={"flex flex-row"}>
            <div className={"w-16"}>id</div>
            <div className={"w-108"}>{realm.realm_id}</div>
          </div>
          <div className={"flex flex-row"}>
            <div className={"w-16"}>name</div>
            <div className={"w-108 text-black"}>
              <input className="pl-2" onChange={(e)=>setName(e.target.value)} value={name}/>
            </div>
          </div>
          <div className={"flex flex-row mt-2"}>
            <div className={"w-124"}>
              <button className={"bg-amber-600 text-black pl-2 pr-2"} onClick={updateRealm}>
                update
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  );
}