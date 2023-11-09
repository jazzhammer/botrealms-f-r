"use client"
import {useContext, useEffect, useState} from "react";
import {API_BASE_URL} from "@/app/env/env";
import SayingContext from "@/app/context/saying-context";


export default function NewBot({
    onCreate
  }) {
  const [canCreate, setCanCreate] = useState(false);
  const [name, setName] = useState('');
  const saying = useContext(SayingContext);

  useEffect(()=>{
    setCanCreate(name.trim().length > 0);
  }, [name]);

  const createBot = async () => {
    const url = `${API_BASE_URL}/bots`;
    const createResponse = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name
      })
    });
    const created = await createResponse.json();
    onCreate(created);
  }
  return (
    <div className={"ml-2 p-2 border border-1 border-amber-600 mt-2 h-full flex flex-col w-64"}>
      <div className={"text-white"}>{saying}</div>
      <div className={"flex flex-row"}>
        <div className={"w-16"}>name</div>
        <div className={"w-36"}><input onChange={(e)=>setName(e.target.value)} type="text" className={"w-36 text-black pl-2"}/></div>
      </div>
      { canCreate &&
        <div className={"w-52 mt-2 w-24"}><button className={"bg-green-900 text-white pl-2 pr-2"} onClick={createBot}>create</button></div>
      }
    </div>
  );
}