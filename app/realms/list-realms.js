export default function ListRealms({realms, onSelect}) {
  let rows = '';
  if (realms && realms.map) {
    rows = realms.map((realm) => (
        <div className="flex flex-row cursor-pointer hover:underline" key={`realm.realm_id`} onClick={()=>onSelect(realm)}>
          <div className="text-center border border-green-800" style={{width: '308px'}}>{`...${realm.realm_id.substring(realm.realm_id.lastIndexOf('-') + 1)}`}</div>
          <div className="text-center w-36 border border-green-800">{realm.name}</div>
        </div>
      )
    )
  }
  return (
    <div className={"flex flex-col"}>
      {
        realms && realms.length > 0 && (
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