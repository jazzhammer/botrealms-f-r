export default function BotDetails({bot}) {
  return (
    <div className={"flex flex-col border border-1 pl-2 mt-2"}>
      <div className={"flex flex-row"}>
        <div className={"w-16"}>id</div>
        <div className={"w-108"}>{bot.bot_id}</div>
      </div>
      <div className={"flex flex-row"}>
        <div className={"w-16"}>name</div>
        <div className={"w-108"}>{bot.name}</div>
      </div>
    </div>
  );
}