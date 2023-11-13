import {useEffect, useState} from "react";

export default function AvailableBots({realm}) {
  const [bots, setBots] = useState();

  useEffect(() => {
    (async () => {
      const botsResult = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/bots/deployable?realm=${realm.realm_id}`,
        {
          method: 'GET'
        }
      );
      setBots(await botsResult.json());
    })();
  }, []);

  return (
    <div>available bots</div>
  );
}