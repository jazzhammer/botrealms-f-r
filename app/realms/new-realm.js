"use client"
import {useContext, useEffect, useState} from "react";
import {API_BASE_URL} from "@/app/env/env";


export default function NewRealm({
    onCreate
  }) {
  const [canCreate, setCanCreate] = useState(false);
  const [name, setName] = useState('');

  useEffect(()=>{
    setCanCreate(name.trim().length > 0);
  }, [name]);

  const createRealm = async () => {
    const url = `${API_BASE_URL}/realms`;
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
      <div className={"flex flex-row"}>
        <div className={"w-16"}>name</div>
        <div className={"w-36"}><input onChange={(e)=>setName(e.target.value)} type="text" className={"w-36 text-black pl-2"}/></div>
      </div>
      { canCreate &&
        <div className={"w-52 mt-2 w-24"}><button className={"bg-green-900 text-white pl-2 pr-2"} onClick={createRealm}>create</button></div>
      }
    </div>
  );
}