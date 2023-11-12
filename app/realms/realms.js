"use client"
import {useState} from "react";
import NewRealm from "@/app/realms/new-realm";
import RealmDetails from "@/app/realms/realm-details";
import SearchRealms from "@/app/realms/search-realms";
import ListRealms from "@/app/realms/list-realms";

export default function Realms() {
  const [mode, setMode] = useState('');
  const [realm, setRealm] = useState();
  const [realms, setRealms] = useState();

  const onCreate = (created) => {
    setRealm(created);
    setMode('selected');
  }

  const onUpdate = (updated) => {
    setRealm(updated);
    setMode('selected');
  }

  const onSelectRealm = (selected) => {
    setRealm(selected);
    setMode('selected')
  }

  const onRealms = (realms) => {
    setRealms(realms);
    console.log(`realms: ${JSON.stringify(realms)}`);
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
        {mode === 'new' && <NewRealm onCreate={onCreate}></NewRealm>}
        {mode === 'selected' && <RealmDetails realm={realm} onUpdate={onUpdate}></RealmDetails>}
        {mode === 'search' &&
          <div className={"flex flex-col"}>
            <SearchRealms onRealms={onRealms}></SearchRealms>
            <div className={"mt-3 ml-2"}>
              <ListRealms realms={realms} onSelect={onSelectRealm}></ListRealms>
            </div>
          </div>
        }
      </div>
    </div>
  );
}