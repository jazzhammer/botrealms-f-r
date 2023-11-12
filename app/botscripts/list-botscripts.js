export default function ListBotscripts({botscripts, onSelect}) {
  let rows = '';
  if (botscripts && botscripts.map) {
    rows = botscripts.map((botscript) => (
        <div className="flex flex-row cursor-pointer hover:underline" key={`botscript.botscript_id`} onClick={()=>onSelect(botscript)}>
          <div className="text-center border border-green-800" style={{width: '408px'}}>{`...${botscript.botscript_id.substring(botscript.botscript_id.lastIndexOf('-') + 1)}`}</div>
          <div className="text-center w-36 border border-green-800">{botscript.name}</div>
        </div>
      )
    )
  }
  return (
    <div className={"flex flex-col"}>
      {
        botscripts && botscripts.length > 0 && (
          <div className={"flex flex-row"}>
            <div className={"text-center font-bold border border-green-800"} style={{width: '408px'}}>id</div>
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