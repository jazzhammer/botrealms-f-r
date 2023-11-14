import {useEffect, useState} from "react";
import ListBots from "@/app/bots/list-bots";

export default function AvailableBots({realm}) {
  const [bots, setBots] = useState();
  const [botToDeploy, setBotToDeploy] = useState();

  const selectBotToDeploy = (toDeploy) => {
    const result = fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/bot_deployment`,
      {
        method: 'POST',
        body: JSON.stringify({
          realm_id: realm.realm_id,
          bot_id: toDeploy.bot_id
        })
      }
    );
  }
  useEffect(() => {
    (async () => {
      const botsResult = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/bots/deployable?realm_id=${realm.realm_id}`,
        {
          method: 'GET'
        }
      );
      setBots(await botsResult.json());
    })();
  }, []);

  return (
    <div className={"flex flex-col"}>
      <div className={"mb-2"}></div>
      <ListBots bots={bots} onSelect={selectBotToDeploy}></ListBots>
    </div>
  );
}