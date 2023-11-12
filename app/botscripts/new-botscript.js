"use client"
import {useContext, useEffect, useState} from "react";
import {API_BASE_URL} from "@/app/env/env";
import SayingContext from "@/app/context/saying-context";


export default function NewBotscript({
    onCreate
  }) {
  const [canCreate, setCanCreate] = useState(false);
  const [name, setName] = useState('');
  const [logic, setLogic] = useState('');
  const saying = useContext(SayingContext);

  useEffect(()=>{
    setCanCreate(name.trim().length > 0);
  }, [name]);

  const create = async () => {
    const url = `${API_BASE_URL}/botscripts`;
    debugger;
    const body = JSON.stringify({
      name, logic
    });
    const createResponse = await fetch(url, {
      method: 'POST',
      body: body
    });
    const created = await createResponse.json();
    onCreate(created);
  }
  return (
    <div className={"ml-2 p-2 border border-1 border-amber-600 mt-2 flex flex-col w-full h-max"}>
      <div className={"flex flex-row mt-2"}>
        <div className={"w-24"}>name</div>
        <div className={"w-36"}><input onChange={(e)=>setName(e.target.value)} type="text" className={"w-36 text-black pl-2"}/></div>
      </div>
      <div className={"flex flex-row mt-2"}>
        <div className={"w-24"}>logic</div>
        <div className={"w-max h-max"}>
          <textarea onChange={(e)=>setLogic(e.target.value)}
                    className={"w-5/6 text-black pl-2 font-mono h-max"}
                    style={{"margin-left": 0, height: 400, width: 500, resize: 'auto'}}
          />
        </div>
      </div>
      { canCreate &&
        <div className={"w-52 mt-2"}><button className={"bg-green-900 text-white pl-2 pr-2"} onClick={create}>create</button></div>
      }
    </div>
  );
}