import {useEffect, useState} from "react";
import ListBots from "@/app/bots/list-bots";
import ListBotDeployments from "@/app/botdeployments/list-botdeployments";

export default function DeployedBots({realm}) {
  const [botDeployments, setBotDeployments] = useState();

  useEffect(() => {
    (async () => {
      const result = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/bot_deployment?realm_id=${realm.realm_id}`,
        {
          method: 'GET'
        });
      const json = await result.json();
      setBotDeployments(json);
    })();
    }, [realm.realm_id]
  );

  return (
    <div className={"flex flex-col"}>
      <ListBotDeployments showRealm={false} botdeployments={botDeployments}></ListBotDeployments>
    </div>
  );
}