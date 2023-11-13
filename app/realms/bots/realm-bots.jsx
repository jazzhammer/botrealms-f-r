import {useState} from "react";
import DeployedBots from "@/app/realms/bots/deployed-bots";
import AvailableBots from "@/app/realms/bots/available-bots";

export default function RealmBots({realm}) {
  const [mode, setMode] = useState('deployed');
  return (
    <div className={"flex flex-col"}>
      <div className={"flex flex-row w-full"}>
        <div className={"w-24 cursor-pointer hover:underline text-center" + (mode==='deployed' ? ' underline bg-blue-800': '')} onClick={() => setMode('deployed')}>deployed</div>
        <div className={"w-24 cursor-pointer hover:underline text-center" + (mode==='available' ? ' underline bg-blue-800': '')} onClick={() => setMode('available')}>available</div>
      </div>
      <div>
        {   mode === 'deployed' && <DeployedBots></DeployedBots> }
        {   mode === 'available' && <AvailableBots realm={realm}></AvailableBots> }
      </div>
    </div>
  );
}