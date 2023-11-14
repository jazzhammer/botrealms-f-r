export default function ListBotDeployments({botdeployments, onSelect, showRealm}) {
  let rows = '';
  if (botdeployments && botdeployments.map) {
    rows = botdeployments.map((botdeployment) => (
        <div className="flex flex-row cursor-pointer hover:underline" key={botdeployment.bot_id} onClick={()=>onSelect(bot)}>
          <div className="text-center border border-green-800" style={{width: '308px'}}>{`...${botdeployment.bot_id.substring(botdeployment.bot_id.lastIndexOf('-') + 1)}`}</div>
          <div className="text-center w-36 border border-green-800">{botdeployment.name}</div>
        </div>
      )
    )
  }
  return (
    <div className={"flex flex-col"}>
      {
        botdeployments && botdeployments.length > 0 && (
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