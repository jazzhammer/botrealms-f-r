"use client"
import {useState} from "react";

export default function Bots() {
  const [mode, setMode] = useState('');
  return (
    <div className={"flex flex-row"}>
      <div className={"w-16 ml-2 mr-2 cursor-pointer hover:underline " + (mode === 'new' ? 'underline' : '')}>new</div>
      <div className={"w-16 ml-2 mr-2 cursor-pointer hover:underline " + (mode === 'search' ? 'underline' : '')}>search</div>
    </div>
  );
}