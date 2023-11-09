export default function ListBots({bots, onSelect}) {
  let rows = '';
  if (bots && bots.map) {
    rows = bots.map((bot) => (
        <div className="flex flex-row cursor-pointer hover:underline" key={`bot.bot_id`} onClick={()=>onSelect(bot)}>
          <div className="text-center border border-green-800" style={{width: '308px'}}>{`...${bot.bot_id.substring(bot.bot_id.lastIndexOf('-') + 1)}`}</div>
          <div className="text-center w-36 border border-green-800">{bot.name}</div>
        </div>
      )
    )
  }
  return (
    <div className={"flex flex-col"}>
      {
        bots && bots.length > 0 && (
          <div className={"flex flex-row"}>
            <div className={"text-center font-bold border border-green-800"} style={{width: '308px'}}>id</div>
            <div className={"text-center font-bold w-36 border border-green-800"}>name</div>
          </div>
        )
      }
      {
        rows
      }
    </div>
  );
}