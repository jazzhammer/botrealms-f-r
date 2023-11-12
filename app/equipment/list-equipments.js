export default function ListEquipments({equipments, onSelect}) {
  let rows = '';
  if (equipments && equipments.map) {
    rows = equipments.map((equipment) => (
        <div className="flex flex-row cursor-pointer hover:underline"
             key={equipment.equipment_id} onClick={()=>onSelect(equipment)}>
          <div className="text-center border border-green-800" style={{width: '408px'}}>{`...${equipment.equipment_id.substring(equipment.equipment_id.lastIndexOf('-') + 1)}`}</div>
          <div className="text-center w-36 border border-green-800">{equipment.name}</div>
          <div className="text-center w-36 border border-green-800">{equipment.type}</div>
        </div>
      )
    )
  }
  return (
    <div className={"flex flex-col"}>
      {
        equipments && equipments.length > 0 && (
          <div className={"flex flex-row"}>
            <div className={"text-center font-bold border border-green-800"} style={{width: '408px'}}>id</div>
            <div className={"text-center font-bold w-36 border border-green-800"}>name</div>
            <div className={"text-center font-bold w-36 border border-green-800"}>type</div>
          </div>
        )
      }
      {
        rows
      }
    </div>
  );
}