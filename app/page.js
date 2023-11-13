"use client"
import {useState, createContext, useReducer} from "react";
import Bots from "./bots/bots"
import Equipments from './equipment/equipment';
import SayingContext from "@/app/context/saying-context";
import Botscripts from "@/app/botscripts/botscript";
import Realms from "@/app/realms/realms";


export default function Home() {


  const [mode, setMode] = useState();
  return (
    <SayingContext.Provider value="have a nice day">
      <div className="flex flex-col p-2 text-sm">
        <div className="mb-2 pb-3 flex flex-row font-bold w-full border-b border-white pl-2 pr-2" data-testid="home-title">botrealms</div>
        <div className={"flex flex-row pl-2 "}>
          <div className={"flex flex-col w-2/12"}>
            <div className={"pl-2 mr-2 hover:underline cursor-pointer " + (mode === 'bots' ? 'underline bg-amber-950' : '')}
                 onClick={()=>setMode('bots')}>bots</div>
            <div className={"pl-2 mr-2 hover:underline cursor-pointer " + (mode === 'equipment' ? 'underline bg-amber-950' : '')}
                 onClick={()=>setMode('equipment')}>equipment</div>
            <div className={"pl-2 mr-2 hover:underline cursor-pointer " + (mode === 'botscripts' ? 'underline bg-amber-950' : '')}
                 onClick={()=>setMode('botscripts')}>botscripts</div>
            <div className={"pl-2 mr-2 hover:underline cursor-pointer " + (mode === 'matches' ? 'underline bg-amber-950' : '')}
                 onClick={()=>setMode('matches')}>matches</div>
            <div className={"pl-2 mr-2 hover:underline cursor-pointer " + (mode === 'realms' ? 'underline bg-amber-950' : '')}
                 onClick={()=>setMode('realms')}>realms</div>
          </div>
          <div className={"h-screen flex flex-col w-10/12 border-l border-white"}>
            <div className={"pl-2 pr-2"}>
              {mode === 'bots' && <Bots></Bots>}
              {mode === 'botscripts' && <Botscripts></Botscripts>}
              {mode === 'equipment' && <Equipments></Equipments>}
              {mode === 'realms' && <Realms></Realms>}

            </div>
          </div>
        </div>
      </div>

    </SayingContext.Provider>
  );
}