"use client"
import {useEffect, useState} from "react";

export default function NewBot() {
  const [canCreate, setCanCreate] = useState(false);
  const [name, setName] = useState('');
  useEffect(()=>{
    console.log(`setting canCreate...`);
    setCanCreate(name.trim().length > 0);
  }, [name]);
  return (
    <div className={"ml-2 p-2 bg-amber-950 mt-2 h-full flex flex-col"}>
      <div className={"flex flex-row"}>
        <div className={"w-16"}>name</div>
        <div className={"w-36"}><input onChange={(e)=>setName(e.target.value)} type="text" className={"w-36 text-black pl-2"}/></div>
      </div>
      { canCreate &&
        <div className={"w-52 mt-2 w-24"}><button className={"bg-green-900 text-white pl-2 pr-2"}>create</button></div>
      }
    </div>
  );
}